import {BrowserWindow, app} from "electron";
import {IpcMain} from "../communication/ipcMain";
import {ProgramState} from "../state/programState";
import {ExtendedObject} from "../utils/extendedObject";
import {ModuleViewData} from "../module/_types/moduleViewData";
import {ParameterizedModule} from "../module/module";
import {Serialize} from "../utils/serialize";
import {ModuleID} from "../module/moduleID";
import {ViewNotFound, ViewNotFoundType} from "../modules/viewNotFound.type";
import {Registry} from "../registry/registry";
import {AsyncSerializeableData} from "../utils/_types/serializeableData";
import {isMain} from "../utils/isMain";
import {ContextProvider, ContextProviderType} from "../modules/contextProvider.type";

export type windowOptions = Electron.BrowserWindowConstructorOptions & {
    preloadModules?: string[];
};

/**
 * A mapping of default window properties,
 * And methods to alter them after creation,
 *
 * if no method field is present, the property can't be changed
 * if the method field is empty, it doesn't have to be directly called
 */
const windowPropertyFunctionMap: {
    [property: string]: {
        method?: string | ((data: windowOptions) => string);
        args?: string[];
        default: any;
    };
} = {
    width: {
        method: data => (data.useContentSize ? "setContentSize" : "setSize"),
        args: ["width", "height"],
        default: 500,
    },
    height: {
        method: data => (data.useContentSize ? "setContentSize" : "setSize"),
        args: ["width", "height"],
        default: 500,
    },
    x: {method: "setPosition", args: ["x", "y"], default: undefined},
    y: {method: "setPosition", args: ["x", "y"], default: undefined},
    useContentSize: {method: "", args: [], default: true},
    center: {method: data => (data.center ? "center" : ""), args: [], default: true},
    minWidth: {method: "setMinimumSize", args: ["minWidth", "minHeight"], default: 200},
    minHeight: {method: "setMinimumSize", args: ["minWidth", "minHeight"], default: 30},
    maxWidth: {
        method: "setMaximumSize",
        args: ["maxWidth", "maxHeight"],
        default: Infinity,
    },
    maxHeight: {
        method: "setMaximumSize",
        args: ["maxWidth", "maxHeight"],
        default: Infinity,
    },
    resizable: {method: "setResizable", args: ["resizable"], default: true},
    movable: {method: "setMovable", args: ["movable"], default: true},
    minimizable: {method: "setMinimizable", args: ["minimizable"], default: true},
    maximizable: {method: "setMaximizable", args: ["maximizable"], default: true},
    closable: {method: "setClosable", args: ["closable"], default: true},
    focusable: {method: "setFocusable", args: ["focusable"], default: true},
    alwaysOnTop: {method: "setAlwaysOnTop", args: ["alwaysOnTop"], default: false},
    fullscreen: {method: "setFullscreen", args: ["fullscreen"], default: false},
    fullscreenable: {
        method: "setFullscreenable",
        args: ["fullscreenable"],
        default: false,
    },
    skipTaskbar: {method: "setSkipTaskbar", args: ["skipTaskbar"], default: false},
    title: {method: "setTitle", args: ["title"], default: ""},
    frame: {default: true},
    icon: {method: "setIcon", args: ["icon"], default: ""},
    opacity: {method: "setOpacity", args: ["opacity"], default: 1},
    transparent: {default: true},
    backgroundColor: {
        method: "setBackgroundColor",
        args: ["backgroundColor"],
        default: "#ffffff",
    },
    hasShadow: {method: "setHasShadow", args: ["hasShadow"], default: false},
};

/**
 * Keeps track of all windows and is able to create new ones
 * Also takes care of sending module updates to windows
 */
export class WindowManagerSingleton {
    // Stores all of the windows in the app
    protected readonly windows: {
        [windowID: string]: {
            window: Promise<BrowserWindow>;
            moduleCounts: {[moduleID: string]: number};
            openedAt: number; // A time stamp when the latest open request was made
        };
    } = {};

    // A module that is used to display a view for module that have no view of their own
    protected readonly viewNotFoundModule: ViewNotFound;

    // A module (with sub modules) used to provide contexts for all module views in the window
    protected readonly contextProvidersModule: ContextProvider;

    // A list of unclaimed window, used to improve opening times
    protected readonly windowsBuffer: {
        options: windowOptions;
        window: Promise<BrowserWindow>;
    }[] = [];

    /**
     * Creates a window manager
     */
    constructor() {
        // Listen for updates of module counts
        IpcMain.on(
            "WindowManager.updateCount",
            (windowID: string, moduleID: string, count: number) => {
                // Get the window data to update
                const windowData = this.windows[windowID];
                if (windowData) {
                    const currentCount = windowData.moduleCounts[moduleID] || 0;

                    // Check if a listener should be registered
                    if (currentCount == 0 && count != 0)
                        this.listenToModule(moduleID, windowID);

                    // Check if a listener should be removed
                    if (currentCount != 0 && count == 0)
                        this.stopListeningToModule(moduleID, windowID);

                    // Update the count
                    windowData.moduleCounts[moduleID] = count;
                }
            }
        );

        // Listen for windows requesting states
        IpcMain.on("WindowManager.getState", (moduleID: string, windowID: string) => {
            // Get the data (and make it forward any promises that get resolved)
            return this.getModuleData(moduleID, windowID);
        });

        // Listen for module calls
        IpcMain.on(
            "WindowManager.moduleCall",
            (moduleID: string, methodName: string, args: any[]) => {
                // Get the module by its request path
                const module = ProgramState.getModule(moduleID);

                // Get the method to call on the module
                const method = module[methodName];

                // Call the method
                method.apply(module, args);
            }
        );
    }

    // Setup methods
    /**
     * Create the view not found module if not created already
     * @returns A view not found module
     */
    protected async getViewNotFoundModule(): Promise<ViewNotFound> {
        // Don't do anything of the module was already created
        if (this.viewNotFoundModule) return this.viewNotFoundModule;

        // Create the module as a root otherwise
        // @ts-ignore
        return (this.viewNotFoundModule = Registry.createRoot({type: ViewNotFoundType}));
    }

    /**
     * Create the context provider module if not created already
     * @returns A view not found module
     */
    protected async getContextProvidersModule(): Promise<ContextProvider> {
        // Don't do anything of the module was already created
        if (this.contextProvidersModule) return this.contextProvidersModule;

        // Create the module as a root otherwise
        // @ts-ignore
        return (this.contextProvidersModule = Registry.createRoot({
            type: ContextProviderType,
        }));
    }

    // Window buffer methods
    /**
     * Adds windows to the window buffer, with the indicated default options
     * @remarks Some options like 'frame' invalidate usage of some buffered windows for certain requests.
     * The preloadModules option indicates what modules will be required to load their dependenceis.
     * When requesting a data, the buffered window can only be used if all preloadModules it passes have been loaded in the buffered window.
     * @param options The intiail options to use for the window
     * @param count The number of windows to add to the buffer
     */
    public async createWindowBuffer(
        options: windowOptions,
        count: number = 1
    ): Promise<void> {
        if (!isMain) return;

        const promises = [];
        for (let i = 0; i < count; i++) {
            // Create the window, and add it to the buffer
            const window = this.createWindow(options, false);
            this.windowsBuffer.push({
                options,
                window,
            });
            promises.push(window);
        }

        // Await all windows being created
        await Promise.all(promises);
    }

    /**
     * Retrieves a buffered window with the given options, if availabke
     * @param options The options that the retrieved window should have
     * @returns A browser window with the options if available, or undefiend otherwise
     */
    protected async getBufferdWindow(options: windowOptions): Promise<BrowserWindow> {
        const bufferedWindowIndex = this.windowsBuffer.findIndex(
            ({options: windowOptions, window}) =>
                ExtendedObject.reduce(
                    windowOptions,
                    (result, optionValue, optionName) => {
                        if (!result) return false;

                        // Do a special check for preload modules, whether it contains them
                        if (optionName == "preloadModules") {
                            if (options.preloadModules) return true;
                            if (!optionValue) return false;
                            return options.preloadModules.reduce(
                                (result, moduleName) =>
                                    result &&
                                    windowOptions.preloadModules.indexOf(moduleName) !=
                                        -1,
                                true as boolean
                            );
                        }

                        // Check if the option is compatible, either value is the same, or there exists an applicable method
                        if (optionValue == options[optionName]) return true;
                        const data = windowPropertyFunctionMap[optionName];
                        if (!data) return false;
                        if (!(optionName in options) && optionValue == data.default)
                            return true;
                        if (data.method == undefined) return false;
                        return true;
                    },
                    true as boolean
                )
        );

        // If a window was found, use all the method to apply the options
        if (bufferedWindowIndex != -1) {
            // Remove the window from the buffers
            const bufferedWindow = this.windowsBuffer[bufferedWindowIndex];
            this.windowsBuffer.splice(bufferedWindowIndex, 1);

            // Make sure to to restock the buffer
            this.windowsBuffer.push({
                options: bufferedWindow.options,
                window: this.createWindow(bufferedWindow.options, false),
            });

            // Apply the settings to the window
            const window = await bufferedWindow.window;

            // Store what properties have been used
            const used = {preloadModules: true};
            ExtendedObject.forEach(options as any, (optionName, optionValue) => {
                if (used[optionName]) return; // Use each field only once
                used[optionName] = true;
                if (optionValue == bufferedWindow.options[optionName]) return;
                if (optionValue == windowPropertyFunctionMap[optionName].default) return;

                // Get the data for this option
                const optionData = windowPropertyFunctionMap[optionName];
                const methodName =
                    optionData.method instanceof Function
                        ? optionData.method(options)
                        : optionData.method;
                const method = window[methodName] || (() => {});

                // Get the arguments
                const args = (optionData.args || []).map(argName => {
                    used[argName] = true;
                    return options[argName] || windowPropertyFunctionMap[argName].default;
                });

                // // Apply the method
                method.apply(window, args);
            });

            // Return the result
            return window;
        }
    }

    // Window management methods
    /**
     * Creates an electron window, without assigning it any data, or showing it
     * @remarks Makes use of any potential window buffer to speed up creation.     *
     * @param options The options of the window to create
     * @param useBuffer Whether or not to obtain a iwndow from the buffer
     * @returns A browser window
     */
    protected async createWindow(
        options: windowOptions,
        useBuffer: boolean = true
    ): Promise<BrowserWindow> {
        // Make sure the electron app is ready first
        await new Promise(res => (app.isReady() ? res() : app.once("ready", res)));

        // Look for an already loaded compatible window
        if (useBuffer) {
            const bufferedWindow = await this.getBufferdWindow(options);
            if (bufferedWindow) return bufferedWindow;
        }

        // Create the browser window
        const normalizedOptions = {
            ...ExtendedObject.map(windowPropertyFunctionMap, value => value.default),
            ...options,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                ...options.webPreferences,
            },
        };
        const browserWindow = new BrowserWindow(normalizedOptions);

        // Open the index page
        browserWindow.loadURL(`file://${__dirname}/window.html`);

        // While debugging, TODO: add debug check
        browserWindow.webContents.openDevTools();

        // Wait for the window to indicate it was loaded, and assign it its id
        await IpcMain.once(`WindowManager.loaded:${browserWindow.id}`);

        // Assign a viewNotFound view of the window and set the cotnext providers
        await Promise.all([
            IpcMain.send(
                browserWindow,
                "WindowIndex.setViewNotFound",
                (await this.getViewNotFoundModule()).toString()
            ),
            IpcMain.send(
                browserWindow,
                "WindowIndex.setContextProvider",
                (await this.getContextProvidersModule()).toString()
            ),
        ]);

        // If a preload module was passed, use it
        if (options.preloadModules)
            options.preloadModules.forEach(moduleName =>
                IpcMain.send(browserWindow, "WindowIndex.preloadModule", moduleName)
            );

        return browserWindow;
    }

    /**
     * Opens the window with the given ID
     * @param windowID The ID of the window to open
     * @param moduleID The ID of the root view of the window
     * @param options The extra options to pass to the window
     * @returns The browser window that was created
     */
    public async openWindow(
        windowID: string,
        moduleID: ModuleID | string,
        options: windowOptions = {}
    ): Promise<BrowserWindow> {
        // Make sure the window is present
        if (!this.windows[windowID]) {
            this.windows[windowID] = {
                moduleCounts: {},
                window: new Promise(async (resolve, reject) => {
                    const browserWindow = await this.createWindow(options);

                    // Assign the window its ID
                    (browserWindow as any).customID = windowID;
                    await IpcMain.send(
                        browserWindow,
                        "WindowIndex.setWindowID",
                        windowID
                    );

                    // Assign the root module
                    await IpcMain.send(
                        browserWindow,
                        "WindowIndex.setRoot",
                        moduleID.toString()
                    );

                    // Show the window
                    if (options.show != false) browserWindow.show();

                    // Return the browserWindow
                    resolve(browserWindow);
                }),
                openedAt: Date.now(),
            };
        } else {
            // Update the opened at timestamp
            this.windows[windowID].openedAt = Date.now();
        }

        // Return the window
        return this.windows[windowID].window;
    }

    /**
     * Retrieves a window if it has been opened already
     * @param windowID The ID of the window
     * @returns The window that was found
     */
    public async getWindow(windowID: string): Promise<BrowserWindow> {
        let windowData = this.windows[windowID];
        while (windowData) {
            const windowPromise = windowData.window;

            // Obtain the window
            const window = await windowPromise;

            // Check if the window data hasn't changed, otherwise get the new window
            windowData = this.windows[windowID];
            if (windowData && windowData.window == windowPromise) return window;
        }

        // Otherwise no window could be found
        return undefined;
    }

    /**
     * Closes the window with the given ID
     * @param windowID The ID of the window to close
     * @returns Whether or not the window has been closed on request (might not be the case if it got opened again before resolving)
     */
    public async closeWindow(windowID: string): Promise<boolean> {
        // Request time
        const closedAt = Date.now();

        // Retrieve the window to close
        const window = await this.getWindow(windowID);
        if (!window) return false;

        // Make sure there hasn't been another open attempt after this close was requested
        if (!this.windows[windowID] || this.windows[windowID].openedAt > closedAt)
            return false;

        // Close the window
        window.close();

        // Get rid of window data
        delete this.windows[windowID];
        return true;
    }

    // Module data transfer related methods
    /**
     * Adds listeners to the module to forward its data to a window's GuiManager
     * @param moduleID The moduleID of the module to forward to a window
     * @param windowID The id of the window to forward the data to
     */
    protected listenToModule(moduleID: ModuleID | string, windowID: string): void {
        // Get the module by its request path
        const module = ProgramState.getModule(moduleID);
        if (!module) return;

        // Add a listener to the state
        module.getStateObject().on(
            "change",
            (data: AsyncSerializeableData) => {
                this.sendStateData(module, windowID, data);
            },
            `windowManager.${windowID}`
        );

        // Add a listener to the settings
        module.getSettingsObject().on(
            "change",
            (prop, value) => {
                // Don't pass a promise that the module has to wait for
                (async () => {
                    // Make sure the window isn't closed
                    const window = await this.getWindow(windowID);
                    if (!window) return;

                    // Send the data
                    IpcMain.send(
                        window,
                        "ViewManager.sendUpdate",
                        moduleID.toString(),
                        Serialize.serialize(ExtendedObject.translatePathToObject(
                            `~settings.${prop}`,
                            value
                        ) as any)
                    );
                })();
            },
            `windowManager.${windowID}`
        );
    }

    /**
     * Sends the state data to a given window for a given module
     * @param module The module to which this data belongs
     * @param windowID The ID of the window that the module is located in
     * @param data The data to be send
     */
    protected async sendStateData(
        module: ParameterizedModule,
        windowID: string,
        data: AsyncSerializeableData
    ): Promise<void> {
        // Make sure the window isn't closed
        const window = await this.getWindow(windowID);
        if (!window) return;

        // Send the data
        IpcMain.send(
            window,
            "ViewManager.sendUpdate",
            module.getID().toString(),
            Serialize.serialize(data, (path, value, promise) => {
                // Make sure the latest value is still the promise that just resolved
                if (ExtendedObject.getField(module.state, path) !== promise) return;

                // IF a promise resolves, translate the path of the value into an object again
                // And also send this data
                this.sendStateData(module, windowID, ExtendedObject.translatePathToObject(
                    path,
                    value
                ) as any);
            })
        );
    }

    /**
     * Removes the listeners from the module to stop forwarding its data to a window's GuiManager
     * @param moduleID The moduleID of the module that is forwarding to a window
     * @param windowID The id of the window the module is forwarding the data to
     */
    protected stopListeningToModule(moduleID: ModuleID | string, windowID: string): void {
        // Get the module by its ID
        const module = ProgramState.getModule(moduleID);

        // Check if the module exists, since the module might have already fully been destroyed by this point
        if (module) {
            // Remove the programState's listener of the state
            module.getStateObject().off("change", `windowManager.${windowID}`);

            // Remove the programState's listener of the settings
            module.getSettingsObject().off("change", `windowManager.${windowID}`);
        }
    }

    /**
     * Obtains the current data of the module
     * @param moduleID The moduleID of the module to get the data for
     * @param window The window that the module is located in
     * @param windowID The ID of the window that the module is located in
     * @returns The data of the module data
     */
    protected getModuleData(
        moduleID: ModuleID | string,
        windowID: string
    ): ModuleViewData {
        // Get the module instance
        const module = ProgramState.getModule(moduleID) as ParameterizedModule;
        if (!module) return;

        // Get the state of the module
        const state = module
            .getStateObject()
            .serialize((path, value) =>
                this.sendStateData(module, windowID, ExtendedObject.translatePathToObject(
                    path,
                    value
                ) as any)
            );

        // Get the settings of the module
        const settings = module
            .getSettingsObject()
            .getSettings()
            .serialize();

        // Add the settings to the state data
        state["~settings"] = settings;

        // Get the data to the state
        state["~data"] = module.getData();

        return state as any;
    }

    // Window related utility methods
    /**
     * Retrieves the size of the main display
     * @returns The display's size
     */
    public async getScreenSize(): Promise<{width: number; height: number}> {
        // Make sure the electron app is ready first
        await new Promise(res => (app.isReady() ? res() : app.once("ready", res)));

        return require("electron").screen.getPrimaryDisplay().workAreaSize;
    }
}
export const WindowManager = new WindowManagerSingleton();
