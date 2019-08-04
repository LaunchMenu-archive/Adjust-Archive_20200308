Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ipcMain_1 = require("../../communication/ipcMain");
const programState_1 = require("../programState");
const extendedObject_1 = require("../../utils/extendedObject");
const serialize_1 = require("../../utils/serialize");
const viewNotFound_type_1 = require("../../modules/viewNotFound.type");
const registry_1 = require("../../registry/registry");
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
        ipcMain_1.IpcMain.on("WindowManager.getState", (moduleID, windowID) => {
            // Get the data (and make it forward any promises that get resolved)
            return this.getModuleData(moduleID, windowID);
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
    /**
     * Create the view not found module if not created already
     */
    async createViewNotFoundModule() {
        // Don't do anything of the module was already created
        if (this.viewNotFoundModule)
            return;
        // Create the module as a root otherwise
        // @ts-ignore
        this.viewNotFoundModule = await registry_1.Registry.createRoot({ type: viewNotFound_type_1.ViewNotFoundID });
    }
    /**
     * Opens the window with the given ID
     * @param windowID The ID of the window to open
     * @param moduleID The ID of the root view of the window
     * @param options The extra options to pass to the window
     * @returns The browser window that was created
     */
    async openWindow(windowID, moduleID, options = {}) {
        // Make sure the electron app is ready first
        await new Promise(res => (electron_1.app.isReady() ? res() : electron_1.app.once("ready", res)));
        // Make sure we have a view not found module
        await this.createViewNotFoundModule();
        // Make sure the window is present
        if (!this.windows[windowID]) {
            this.windows[windowID] = {
                moduleCounts: {},
                window: new Promise(async (resolve, reject) => {
                    // Create the browser window
                    const browserWindow = new electron_1.BrowserWindow(Object.assign({ width: 800, height: 600, show: false }, options, { webPreferences: Object.assign({ nodeIntegration: true }, options.webPreferences) }));
                    // Open the index page
                    browserWindow.loadURL(`file://${__dirname}/window.html`);
                    browserWindow.customID = windowID;
                    // While debugging, TODO: add debug check
                    browserWindow.webContents.openDevTools();
                    // Wait for the window to indicate it was loaded, and assign it its id
                    await ipcMain_1.IpcMain.once(`WindowManager.loaded:${windowID}`);
                    // Set the root view of the window and assign a viewNotFound view of the window
                    const promises = [
                        ipcMain_1.IpcMain.send(browserWindow, "WindowIndex.setViewNotFound", this.viewNotFoundModule.toString()),
                        ipcMain_1.IpcMain.send(browserWindow, "WindowIndex.setRoot", moduleID.toString()),
                    ];
                    await Promise.all(promises);
                    // Show the window
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
    /**
     * Adds listeners to the module to forward its data to a window's GuiManager
     * @param moduleID The moduleID of the module to forward to a window
     * @param windowID The id of the window to forward the data to
     */
    listenToModule(moduleID, windowID) {
        // Get the module by its request path
        const module = programState_1.ProgramState.getModule(moduleID);
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
            if (extendedObject_1.ExtendedObject.getField(module.state, path) !== promise)
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
exports.WindowManager = new WindowManagerSingleton();
//# sourceMappingURL=windowManager.js.map