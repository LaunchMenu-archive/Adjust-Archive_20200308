var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ipcRenderer_1 = require("../communication/ipcRenderer");
const serialize_1 = require("../utils/serialize");
const moduleID_1 = require("../module/moduleID");
/**
 * Keeps track of all of the views in the window and makes sure they are updated
 */
class ViewManagerSingleton {
    /**
     * Creates a view manager
     */
    constructor() {
        // Stores all of the views in this window
        this.views = {};
        // Store views that are currently being loaded
        this.loadingViews = {};
        // Listen for the main thread sending updates
        ipcRenderer_1.IpcRenderer.on("ViewManager.sendUpdate", (moduleID, data) => {
            const stateChange = this.deserializeData(data);
            return this.updateModuleData(moduleID, stateChange);
        });
    }
    /**
     * Sets the ID of the module to use for displaying the view not found message
     * @param ID The ID of the module
     */
    setViewNotFoundID(ID) {
        this.viewNotFoundID = ID;
    }
    // View tracking methods
    /**
     * Obtains the list of module views
     * @param moduleID The moduleID to get the views for
     * @param create Whether or not to create the list if absent
     * @returns The list of module views, or undefined if there is no such list
     */
    getViews(moduleID, create = false) {
        // Normalize  the request path
        if (typeof moduleID == "string")
            moduleID = new moduleID_1.ModuleReference(moduleID);
        // Retrieve the module path
        const modulePath = moduleID.getModulePath();
        // Get the paths for this module
        let paths = this.views[modulePath];
        if (!paths) {
            if (create)
                paths = this.views[modulePath] = {};
            else
                return;
        }
        // Get the list of module views for this specific request path
        let moduleViews = paths[moduleID.toString()];
        if (!moduleViews) {
            if (create)
                moduleViews = paths[moduleID.toString()] = [];
            else
                return;
        }
        // Return the views
        return moduleViews;
    }
    /**
     * Registers a view such that it will receive updates
     * @param view The view to register
     * @param moduleID The moduleID of the module that the view represents
     * @returns The initial data for the module
     */
    registerView(view, moduleID) {
        // Get the list of module views for this specific request path
        const moduleViews = this.getViews(moduleID, true);
        // Store the new promise that will resolve in a view
        let promise = new Promise(async (resolve, reject) => {
            // Get the initial state of the view
            let initialState;
            if (moduleViews.length) {
                // Get the state from an existing module
                try {
                    const existingView = await moduleViews[0];
                    initialState = existingView.state;
                }
                catch (e) { }
            }
            // If either now such view existed, or it was removed before resolving
            if (!initialState) {
                // Get the initial state from the window manager
                const stateData = (await ipcRenderer_1.IpcRenderer.send("WindowManager.getState", moduleID.toString(), windowID))[0] || { isStopped: true };
                initialState = this.deserializeData(stateData);
            }
            // Make sure the module hasn't updated its path by now (became a view for another module)
            // and hasn't been completed unmounted yet
            if (moduleID.equals(view.props.moduleID) && !view.unmounted) {
                // Update the state
                view.loadInitialState(initialState);
                // Resolve in to this view
                resolve(view);
            }
            else {
                // Otherwise, don't even resolve the promise,
                // and make sure it is removed (should already be the case because of unmount)
                reject("Module removed");
                this.deregisterView(promise, moduleID);
            }
        });
        moduleViews.push(promise);
        // Update the module count
        this.updateWindowModuleCount(moduleID);
        // Return the promise
        return promise;
    }
    /**
     * Deregisters a view such that it no longer receives updates
     * @param view The view to deregister
     * @param moduleID The moduleID of the module that the view represents
     */
    deregisterView(view, moduleID) {
        // Get the list of module views for this specific request path
        const moduleViews = this.getViews(moduleID);
        if (!moduleViews)
            return;
        // Remove the module if present
        let index = moduleViews.indexOf(view);
        if (index == -1)
            return;
        moduleViews.splice(index, 1);
        // Update the module count
        this.updateWindowModuleCount(moduleID);
    }
    /**
     * Updates the module count in the WindowManager for a given module instance
     * @param moduleID The module to update the count for
     */
    async updateWindowModuleCount(moduleID) {
        // Get the list of module views for this specific request path
        const moduleViews = this.getViews(moduleID);
        //  Check how many instances there are
        let count = moduleViews ? moduleViews.length : 0;
        // Send the new count
        await ipcRenderer_1.IpcRenderer.send("WindowManager.updateCount", windowID, moduleID.toString(), count);
    }
    // View creation methods
    /**
     * Retrieves an instance of the GUI of the given request path
     * @param moduleID The ID which to retieve a view for
     * @returns A new view for the given moduleID
     */
    createModuleView(moduleID) {
        // Normalize the moduleID
        if (typeof moduleID == "string")
            moduleID = new moduleID_1.ModuleID(moduleID);
        // Retrieve the module path
        const ModuleClass = moduleID.getModuleClass();
        // Extract the view and remote proxy classes
        const ModuleViewClass = ModuleClass.getConfig()
            .viewClass;
        if (!ModuleViewClass)
            return this.getViewNotFoundView(moduleID);
        const RemoteProxyClass = ModuleClass.getRemoteProxyClass();
        // Create an instance of this remote proxy
        const moduleProxy = RemoteProxyClass.createInstance(moduleID);
        // Return a jsx element of the view
        return (react_1.default.createElement(ModuleViewClass, { key: moduleID.toString(), moduleID: moduleID, module: moduleProxy }));
    }
    /**
     * Obtains a view for a module that has no view, by using the 'viewNotFound' module type
     * @param moduleID The module for which to create a view
     * @returns A new view not found view for the given moduleID
     */
    getViewNotFoundView(moduleID) {
        // Normalize the moduleID
        if (typeof moduleID == "string")
            moduleID = new moduleID_1.ModuleID(moduleID);
        // Get the module classes from the ID
        const ViewNotFoundModuleClass = this.viewNotFoundID.getModuleClass();
        const ModuleClass = moduleID.getModuleClass();
        // Extract the view and remote proxy classes for the viewNotFound module
        const ViewNotFoundModuleViewClass = ViewNotFoundModuleClass.getConfig()
            .viewClass;
        const RemoteProxyClass = ViewNotFoundModuleClass.getRemoteProxyClass();
        // Create an instance of this remote proxy
        const moduleProxy = RemoteProxyClass.createInstance(this.viewNotFoundID);
        // Return a jsx element of the view, and pass relevant data of what module it is displaying
        return (react_1.default.createElement(ViewNotFoundModuleViewClass, { moduleID: this.viewNotFoundID, key: moduleID.toString(), module: moduleProxy, target: { cls: ModuleClass, id: moduleID } }));
    }
    // View maintenance methods
    /**
     * Updates the states of all views for the given module ID
     * @param moduleID The moduleID of the module that updated
     * @param updatedData The data of the module that updated
     */
    updateModuleData(moduleID, updatedData) {
        // Get the list of module views for this specific request path
        const moduleViews = this.getViews(moduleID);
        if (!moduleViews)
            return;
        // Update the state
        moduleViews.forEach(async (moduleView) => (await moduleView).updateState(updatedData));
    }
    /**
     * Deserializes json data (Adding jsx elements)
     * @param data The data to deserialize
     * @returns The deserialized data
     */
    deserializeData(data) {
        return serialize_1.Serialize.deserialize(data, requestPath => this.createModuleView(requestPath));
    }
}
exports.ViewManager = new ViewManagerSingleton();
//# sourceMappingURL=viewManager.js.map