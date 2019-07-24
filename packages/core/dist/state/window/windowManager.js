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
        // Stores the windows that are being opened
        this.openingWindows = {};
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
            // Get the window from the windows
            const windowData = this.windows[windowID];
            const window = windowData && windowData.window;
            // Get the data (and make it forward any promises that get resolved)
            return this.getModuleData(moduleID, window);
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
        // Check if the window isn't currently being opened
        const windowPromise = this.openingWindows[windowID];
        if (windowPromise)
            return windowPromise;
        // Check if the window isn't open already
        const windowData = this.windows[windowID];
        if (windowData)
            return windowData.window;
        // Create a promise that resolves when the window is loaded
        return (this.openingWindows[windowID] = new Promise(async (resolve, reject) => {
            // Create the browser window
            const browserWindow = new electron_1.BrowserWindow(Object.assign({ width: 800, height: 600 }, options, { webPreferences: Object.assign({ nodeIntegration: true }, options.webPreferences) }));
            // Open the index page
            browserWindow.loadURL(`file://${__dirname}/window.html`);
            browserWindow.customID = windowID;
            // While debugging, TODO: add debug check
            browserWindow.webContents.openDevTools();
            // Wait for the window to indicate it was loaded, and assign it its id
            await ipcMain_1.IpcMain.once(`WindowManager.loaded:${windowID}`);
            // Store the window
            this.windows[windowID] = {
                window: browserWindow,
                moduleCounts: {},
            };
            // Set the root view of the window and assign a viewNotFound view of the window
            const promises = [
                ipcMain_1.IpcMain.send(browserWindow, "WindowIndex.setRoot", moduleID.toString()),
                ipcMain_1.IpcMain.send(browserWindow, "WindowIndex.setViewNotFound", this.viewNotFoundModule.toString()),
            ];
            await Promise.all(promises);
            // Remove the promise
            delete this.openingWindows[windowID];
            // Return the browserWindow
            resolve(browserWindow);
        }));
    }
    /**
     * Closes the window with the given ID
     * @param windowID The ID of the window to close
     */
    async closeWindow(windowID) {
        // Wait for the window to fully open if it isn't yet
        const windowPromise = this.openingWindows[windowID];
        if (windowPromise)
            await windowPromise;
        // Check if the window is open at all
        const windowData = this.windows[windowID];
        if (!windowData)
            return;
        // Close the window
        windowData.window.close();
        // Get rid of window data
        delete this.windows[windowID];
    }
    /**
     * Adds listeners to the module to forward its data to a window's GuiManager
     * @param moduleID The moduleID of the module to forward to a window
     * @param windowID The id of the window to forward the data to
     */
    listenToModule(moduleID, windowID) {
        // Get the window from the windows
        const windowData = this.windows[windowID];
        if (!windowData)
            return;
        const window = windowData.window;
        // Get the module by its request path
        const module = programState_1.ProgramState.getModule(moduleID);
        // Add a listener to the state
        module
            .getStateObject()
            .on("change", this.sendStateData.bind(this, moduleID, window), `windowManager.${windowID}`);
        // Add a listener to the settings
        module.getSettingsObject().on("change", (prop, value) => {
            ipcMain_1.IpcMain.send(window, "ViewManager.sendUpdate", moduleID.toString(), serialize_1.Serialize.serialize(extendedObject_1.ExtendedObject.translatePathToObject(`~settings.${prop}`, value)));
        }, `windowManager.${windowID}`);
    }
    /**
     * Sends the state data to a given window for a given module
     * @param moduleID The ID of the module to which this data belongs
     * @param window The window that the module is located in
     * @param data The data to be send
     */
    sendStateData(moduleID, window, data) {
        ipcMain_1.IpcMain.send(window, "ViewManager.sendUpdate", moduleID.toString(), serialize_1.Serialize.serialize(data, (path, value) => {
            // IF a promise resolves, translate the path of the value into an object again
            // And also send this data
            this.sendStateData(moduleID, window, extendedObject_1.ExtendedObject.translatePathToObject(path, value));
        }));
    }
    /**
     * Removes the listeners from the module to stop forwarding its data to a window's GuiManager
     * @param moduleID The moduleID of the module that is forwarding to a window
     * @param windowID The id of the window the module is forwarding the data to
     */
    stopListeningToModule(moduleID, windowID) {
        // Get the window from the windows
        const windowData = this.windows[windowID];
        if (!windowData)
            return;
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
     * @returns The data of the module data
     */
    getModuleData(moduleID, window) {
        // Get the module instance
        const module = programState_1.ProgramState.getModule(moduleID);
        if (!module)
            return;
        // Get the state of the module
        const state = module
            .getStateObject()
            .serialize((path, value) => window &&
            this.sendStateData(moduleID, window, extendedObject_1.ExtendedObject.translatePathToObject(path, value)));
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
}
exports.WindowManager = new WindowManagerSingleton();
//# sourceMappingURL=windowManager.js.map