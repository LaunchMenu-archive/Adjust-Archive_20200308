Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ipcMain_1 = require("../communication/ipcMain");
const programState_1 = require("../state/programState");
const extendedObject_1 = require("../utils/extendedObject");
const serialize_1 = require("../utils/serialization/serialize");
const viewNotFound_type_1 = require("../modules/viewNotFound.type");
const registry_1 = require("../registry/registry");
const isMain_1 = require("../utils/isMain");
const contextProvider_type_1 = require("../modules/contextProvider.type");
/**
 * A mapping of default window properties,
 * And methods to alter them after creation,
 *
 * if no method field is present, the property can't be changed
 * if the method field is empty, it doesn't have to be directly called
 */
const windowPropertyFunctionMap = {
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
    x: { method: "setPosition", args: ["x", "y"], default: undefined },
    y: { method: "setPosition", args: ["x", "y"], default: undefined },
    useContentSize: { method: "", args: [], default: true },
    center: { method: data => (data.center ? "center" : ""), args: [], default: true },
    minWidth: { method: "setMinimumSize", args: ["minWidth", "minHeight"], default: 200 },
    minHeight: { method: "setMinimumSize", args: ["minWidth", "minHeight"], default: 30 },
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
    resizable: { method: "setResizable", args: ["resizable"], default: true },
    movable: { method: "setMovable", args: ["movable"], default: true },
    minimizable: { method: "setMinimizable", args: ["minimizable"], default: true },
    maximizable: { method: "setMaximizable", args: ["maximizable"], default: true },
    closable: { method: "setClosable", args: ["closable"], default: true },
    focusable: { method: "setFocusable", args: ["focusable"], default: true },
    alwaysOnTop: { method: "setAlwaysOnTop", args: ["alwaysOnTop"], default: false },
    fullscreen: { method: "setFullscreen", args: ["fullscreen"], default: false },
    fullscreenable: {
        method: "setFullscreenable",
        args: ["fullscreenable"],
        default: false,
    },
    skipTaskbar: { method: "setSkipTaskbar", args: ["skipTaskbar"], default: false },
    title: { method: "setTitle", args: ["title"], default: "" },
    frame: { default: true },
    icon: { method: "setIcon", args: ["icon"], default: "" },
    opacity: { method: "setOpacity", args: ["opacity"], default: 1 },
    transparent: { default: true },
    backgroundColor: {
        method: "setBackgroundColor",
        args: ["backgroundColor"],
        default: "#ffffff",
    },
    hasShadow: { method: "setHasShadow", args: ["hasShadow"], default: false },
};
/**
 * Keeps track of all windows and is able to create new ones
 * Also takes care of sending module updates to windows
 */
class WindowManagerSingleton {
    /**
     * Creates a window manager
     */
    constructor() {
        // Stores all of the windows in the app
        this.windows = {};
        // A list of unclaimed window, used to improve opening times
        this.windowsBuffer = [];
        // Listen for updates of module counts
        ipcMain_1.IpcMain.on("WindowManager.updateCount", (windowID, moduleID, count) => {
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
        });
        // Listen for windows requesting states
        ipcMain_1.IpcMain.on("WindowManager.getState", (moduleIDs, windowID) => {
            // Get the data (and make it forward any promises that get resolved)
            return moduleIDs.map(moduleID => this.getModuleData(moduleID, windowID));
        });
        // Listen for module calls
        ipcMain_1.IpcMain.on("WindowManager.moduleCall", (moduleID, methodName, args) => {
            // Get the module by its request path
            const module = programState_1.ProgramState.getModule(moduleID);
            // Get the method to call on the module
            const method = module[methodName];
            // Call the method
            method.apply(module, args);
        });
    }
    // Setup methods
    /**
     * Create the view not found module if not created already
     * @returns A view not found module
     */
    async getViewNotFoundModule() {
        // Don't do anything of the module was already created
        if (this.viewNotFoundModule)
            return this.viewNotFoundModule;
        // Create the module as a root otherwise
        // @ts-ignore
        return (this.viewNotFoundModule = registry_1.Registry.createRoot({ type: viewNotFound_type_1.ViewNotFoundType }));
    }
    /**
     * Create the context provider module if not created already
     * @returns A view not found module
     */
    async getContextProvidersModule() {
        // Don't do anything of the module was already created
        if (this.contextProvidersModule)
            return this.contextProvidersModule;
        // Create the module as a root otherwise
        // @ts-ignore
        return (this.contextProvidersModule = registry_1.Registry.createRoot({
            type: contextProvider_type_1.ContextProviderType,
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
    async createWindowBuffer(options, count = 1) {
        if (!isMain_1.isMain)
            return;
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
    async getBufferdWindow(options) {
        const bufferedWindowIndex = this.windowsBuffer.findIndex(({ options: windowOptions, window }) => extendedObject_1.ExtendedObject.reduce(windowOptions, (result, optionValue, optionName) => {
            if (!result)
                return false;
            // Do a special check for preload modules, whether it contains them
            if (optionName == "preloadModules") {
                if (options.preloadModules)
                    return true;
                if (!optionValue)
                    return false;
                return options.preloadModules.reduce((result, moduleName) => result &&
                    windowOptions.preloadModules.indexOf(moduleName) !=
                        -1, true);
            }
            // Check if the option is compatible, either value is the same, or there exists an applicable method
            if (optionValue == options[optionName])
                return true;
            const data = windowPropertyFunctionMap[optionName];
            if (!data)
                return false;
            if (!(optionName in options) && optionValue == data.default)
                return true;
            if (data.method == undefined)
                return false;
            return true;
        }, true));
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
            const used = { preloadModules: true };
            extendedObject_1.ExtendedObject.forEach(options, (optionName, optionValue) => {
                if (used[optionName])
                    return; // Use each field only once
                used[optionName] = true;
                if (optionValue == bufferedWindow.options[optionName])
                    return;
                if (optionValue == windowPropertyFunctionMap[optionName].default)
                    return;
                // Get the data for this option
                const optionData = windowPropertyFunctionMap[optionName];
                const methodName = optionData.method instanceof Function
                    ? optionData.method(options)
                    : optionData.method;
                const method = window[methodName] || (() => { });
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
    async createWindow(options, useBuffer = true) {
        // Make sure the electron app is ready first
        await new Promise(res => (electron_1.app.isReady() ? res() : electron_1.app.once("ready", res)));
        // Look for an already loaded compatible window
        if (useBuffer) {
            const bufferedWindow = await this.getBufferdWindow(options);
            if (bufferedWindow)
                return bufferedWindow;
        }
        // Create the browser window
        const normalizedOptions = Object.assign({}, extendedObject_1.ExtendedObject.map(windowPropertyFunctionMap, value => value.default), options, { show: false, webPreferences: Object.assign({ nodeIntegration: true }, options.webPreferences) });
        const browserWindow = new electron_1.BrowserWindow(normalizedOptions);
        // Open the index page
        browserWindow.loadURL(`file://${__dirname}/window.html`);
        // While debugging, TODO: add debug check
        browserWindow.webContents.openDevTools();
        // Wait for the window to indicate it was loaded, and assign it its id
        await ipcMain_1.IpcMain.once(`WindowManager.loaded:${browserWindow.id}`);
        // Assign a viewNotFound view of the window and set the cotnext providers
        await Promise.all([
            ipcMain_1.IpcMain.send(browserWindow, "WindowIndex.setViewNotFound", (await this.getViewNotFoundModule()).toString()),
            ipcMain_1.IpcMain.send(browserWindow, "WindowIndex.setContextProvider", (await this.getContextProvidersModule()).toString()),
        ]);
        // If a preload module was passed, use it
        if (options.preloadModules)
            options.preloadModules.forEach(moduleName => ipcMain_1.IpcMain.send(browserWindow, "WindowIndex.preloadModule", moduleName));
        return browserWindow;
    }
    /**
     * Opens the window with the given ID
     * @param windowID The ID of the window to open
     * @param moduleID The ID of the root view of the window
     * @param options The extra options to pass to the window
     * @returns The browser window that was created
     */
    async openWindow(windowID, moduleID, options = {}) {
        // Make sure the window is present
        if (!this.windows[windowID]) {
            this.windows[windowID] = {
                moduleCounts: {},
                window: new Promise(async (resolve, reject) => {
                    const browserWindow = await this.createWindow(options);
                    // Assign the window its ID
                    browserWindow.customID = windowID;
                    await ipcMain_1.IpcMain.send(browserWindow, "WindowIndex.setWindowID", windowID);
                    // Assign the root module
                    await ipcMain_1.IpcMain.send(browserWindow, "WindowIndex.setRoot", moduleID.toString());
                    // Show the window
                    if (options.show != false)
                        browserWindow.show();
                    // Return the browserWindow
                    resolve(browserWindow);
                }),
                openedAt: Date.now(),
            };
        }
        else {
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
    async getWindow(windowID) {
        let windowData = this.windows[windowID];
        while (windowData) {
            const windowPromise = windowData.window;
            // Obtain the window
            const window = await windowPromise;
            // Check if the window data hasn't changed, otherwise get the new window
            windowData = this.windows[windowID];
            if (windowData && windowData.window == windowPromise)
                return window;
        }
        // Otherwise no window could be found
        return undefined;
    }
    /**
     * Closes the window with the given ID
     * @param windowID The ID of the window to close
     * @returns Whether or not the window has been closed on request (might not be the case if it got opened again before resolving)
     */
    async closeWindow(windowID) {
        // Request time
        const closedAt = Date.now();
        // Retrieve the window to close
        const window = await this.getWindow(windowID);
        if (!window)
            return false;
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
    listenToModule(moduleID, windowID) {
        // Get the module by its request path
        const module = programState_1.ProgramState.getModule(moduleID);
        if (!module)
            return;
        // Add a listener to the state
        module.getStateObject().on("change", (data) => {
            this.sendStateData(module, windowID, data);
        }, `windowManager.${windowID}`);
        // Add a listener to the settings
        module.getSettingsObject().on("change", (prop, value) => {
            // Don't pass a promise that the module has to wait for
            (async () => {
                // Make sure the window isn't closed
                const window = await this.getWindow(windowID);
                if (!window)
                    return;
                // Send the data
                ipcMain_1.IpcMain.send(window, "ViewManager.sendUpdate", moduleID.toString(), serialize_1.Serialize.serialize(extendedObject_1.ExtendedObject.translatePathToObject(`~settings.${prop}`, value)));
            })();
        }, `windowManager.${windowID}`);
    }
    /**
     * Sends the state data to a given window for a given module
     * @param module The module to which this data belongs
     * @param windowID The ID of the window that the module is located in
     * @param data The data to be send
     */
    async sendStateData(module, windowID, data) {
        // Make sure the window isn't closed
        const window = await this.getWindow(windowID);
        if (!window)
            return;
        // Send the data
        ipcMain_1.IpcMain.send(window, "ViewManager.sendUpdate", module.getID().toString(), serialize_1.Serialize.serialize(data, (path, value, promise) => {
            // Make sure the latest value is still the promise that just resolved
            if (extendedObject_1.ExtendedObject.getField(module.getStateObject().get, path) !== promise)
                return;
            // IF a promise resolves, translate the path of the value into an object again
            // And also send this data
            this.sendStateData(module, windowID, extendedObject_1.ExtendedObject.translatePathToObject(path, value));
        }));
    }
    /**
     * Removes the listeners from the module to stop forwarding its data to a window's GuiManager
     * @param moduleID The moduleID of the module that is forwarding to a window
     * @param windowID The id of the window the module is forwarding the data to
     */
    stopListeningToModule(moduleID, windowID) {
        // Get the module by its ID
        const module = programState_1.ProgramState.getModule(moduleID);
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
    getModuleData(moduleID, windowID) {
        // Get the module instance
        const module = programState_1.ProgramState.getModule(moduleID);
        if (!module)
            return;
        // Get the state of the module
        const state = module
            .getStateObject()
            .serialize((path, value) => this.sendStateData(module, windowID, extendedObject_1.ExtendedObject.translatePathToObject(path, value)));
        // Get the settings of the module
        const settings = module
            .getSettingsObject()
            .getSettings()
            .serialize();
        // Add the settings to the state data
        state["~settings"] = settings;
        // Get the data to the state
        state["~data"] = module.getData();
        return state;
    }
    // Window related utility methods
    /**
     * Retrieves the size of the main display
     * @returns The display's size
     */
    async getScreenSize() {
        // Make sure the electron app is ready first
        await new Promise(res => (electron_1.app.isReady() ? res() : electron_1.app.once("ready", res)));
        return require("electron").screen.getPrimaryDisplay().workAreaSize;
    }
}
exports.WindowManagerSingleton = WindowManagerSingleton;
exports.WindowManager = new WindowManagerSingleton();
//# sourceMappingURL=windowManager.js.map