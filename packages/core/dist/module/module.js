Object.defineProperty(exports, "__esModule", { value: true });
const remoteModuleProxy_1 = require("./remoteModuleProxy");
const programState_1 = require("../state/programState");
const settings_1 = require("../storage/settings/settings");
const stateData_1 = require("../state/stateData");
const requestPath_1 = require("./requestPath/requestPath");
const registry_1 = require("../registry/registry");
const moduleProxy_1 = require("./moduleProxy");
const extendedObject_1 = require("../utils/extendedObject");
const settingsManager_1 = require("../storage/settings/settingsManager");
exports.baseConfig = {
    settings: {},
    initialState: {
        isStopping: false,
        isStopped: false,
    },
    onInstall: () => { },
    abstract: true,
    type: null,
    viewClass: undefined,
    getPriority: () => 1,
};
/**
 * A class containing data for importing it (its actual file location),
 * a state that can be serialized and deserialized and
 * a settings object that stores settings for this type of component
 */
class Module {
    /**
     * The core building block for Adjust applications
     * @returns An unregistered instance of this module
     */
    constructor() { }
    /**
     * The core building block for Adjust applications
     * @param request The relevant data of the request that created this instance
     * @param moduleID The ID of this module
     * @param initialState The intial state that the module should have
     * @param parents The list of parents of the module
     * @returns An unregistered instance of this module
     */
    static async construct(request, moduleID, initialState, parents) {
        const module = new this();
        // Setup request related data
        // @ts-ignore
        module.requestData = request;
        // @ts-ignore
        module.ID = moduleID;
        // @ts-ignore
        module.parents = parents;
        module.parent = module.parents[0];
        // Settings initialization
        // @ts-ignore
        module.settingsObject = await settings_1.Settings.createInstance(module);
        // @ts-ignore
        module.settings = module.settingsObject.get;
        // State initialization
        // @ts-ignore
        module.stateObject = new stateData_1.StateData(initialState);
        // @ts-ignore
        module.state = module.stateObject.get;
        return module;
    }
    /**
     * Get the request path for this module based on its parent and the ID
     * @param moduleID The ID of this module
     * @param parent The parent of this module
     * @param data The json data that was send with this request
     * @returns The request path obtained
     */
    static createRequestPath(moduleID, parent, data) {
        if (parent) {
            // Extend the parent's path
            const parentRequestPath = parent.getRequestPath();
            return parentRequestPath.extend(moduleID, data);
        }
        else {
            // If the module is a root, create a path from scratch
            return new requestPath_1.RequestPath(moduleID, data);
        }
    }
    /**
     * Creates an instance of this module, given an ID for the instance and a request
     * @param request The request that started the creation of the module
     * @param moduleID The ID that the new instance should have
     * @returns A new instance of this class
     */
    static async createInstance(request, moduleID) {
        // Obtain the required data to instanciate the module
        const initialState = this.getConfig().initialState;
        request.requestPath = this.createRequestPath(moduleID, request.parent, request.data);
        const parents = request.parent ? [request.parent] : [];
        // Create the instance
        return this.construct(request, moduleID, initialState, parents);
    }
    // Initialisation
    /**
     * A method that gets called to perform initialisation,
     * should be called only once, after having been added to the program state
     * (will be called by external setup method, such as in classModuleProvider)
     * @param fromReload Whether or not this module is initialised with a state already present (reloading a previous state)
     */
    async init(fromReload) {
        this.onInit(fromReload);
    }
    /**
     * A method that gets called to perform any initialization,
     * will be called only once, after having been added to the state
     * @param fromReload Whether or not this module is initialised with a state already present (reloading a previous state)
     */
    async onInit(fromReload) { }
    // State related methods
    /**
     * Retrieves the entire state object of the module
     * @returns The entire state object on which listeners could be registered
     */
    getStateObject() {
        return this.stateObject;
    }
    /**
     * Changes the current state of the module
     * @param changedProps An object containing any fields of the state that have changed
     * @returns A promise that resolves once all listeners have resolved
     */
    async setState(changedProps) {
        return this.stateObject.changeData(changedProps);
    }
    // Settings related methods
    /**
     * Retrieves the entire settings object of the module
     * @returns The entire settings object on which listeners could be registered
     */
    getSettingsObject() {
        return this.settingsObject;
    }
    /**
     * Changes the settings of the module
     * @param changedProps An object containing any fields of the settings that have changed
     * @param condition The settings condition to store the data under
     * @returns A promise that resolves once all listeners have resolved
     */
    async setSettings(changedProps, condition) {
        return this.settingsObject.changeData(changedProps, condition);
    }
    // Serialization related methods
    /**
     * Serializes the entire module, based on the state
     * @returns An object containing all the module's relevant data
     */
    serialize() {
        const requestData = this.getRequest();
        return {
            $type: this.getClass().getPath(),
            data: {
                request: Object.assign({}, extendedObject_1.ExtendedObject.filter(requestData, (v, k) => ["use", "type"].indexOf(k) == -1), { requestPath: requestData.requestPath.toString(), parent: requestData.parent && requestData.parent.getID().toString() }),
                parents: this.parents.map(parent => parent.getID().toString()),
                state: this.stateObject.serialize(),
            },
        };
    }
    /**
     * Creates an instance of this module, given an ID for the instance and serialized data representing an instance
     * @param serializedData The serialized data, obtained by serializing a previous instance
     * @param moduleID The ID that the new instance should have
     * @returns A new instance of this class
     */
    static async recreateInstance(serializedData, moduleID) {
        // The data is a serialized module
        const data = serializedData.data;
        // Obtain the required data to instanciate the module
        const request = Object.assign({}, data.request, { requestPath: new requestPath_1.RequestPath(data.request.requestPath) });
        // Create the instance
        return await this.construct(request, moduleID, {}, []);
    }
    /**
     * Deserializes the data that defines the module's own state
     * @param data The data to be deserialized
     */
    async deserialize(data) {
        // Update the parents
        const parents = data.parents.map(parent => programState_1.ProgramState.getModule(parent).createProxy());
        this.parents.push.apply(this.parents, parents);
        this.parent = this.parents[0];
        // Deserialize the state
        this.stateObject.deserialize(data.state, this);
        // Finish by calling the init hook
        await this.init(true);
    }
    // Request related methods
    /**
     * Returns the ID of this module
     * @returns The ID
     */
    getID() {
        return this.ID;
    }
    /** @override */
    toString() {
        return this.ID.toString();
    }
    /**
     * Retrieves the request that instanciated this module
     * @returns The request
     */
    getRequest() {
        return this.requestData;
    }
    /**
     * Retrieves the request path for this module
     * @returns The request path
     */
    getRequestPath() {
        return this.requestData.requestPath;
    }
    /**
     * Retrieves the request data for this module
     * @returns The request data
     */
    getData() {
        return this.requestData.data;
    }
    /**
     * Retrieves the parent of this module
     * @returns The parent that made the request
     */
    getParent() {
        return this.parent;
    }
    /**
     * Retrievs the additional parents of this module of any
     * @returns An array of the additional parents
     */
    getParents() {
        return this.parents;
    }
    /**
     * Adds an additonal parent to the module (for when obtained with instance module provider)
     * @param parent The new parent to add
     */
    addParent(parent) {
        this.parents.push(parent);
    }
    /**
     * Removes an additional parent from the module (for when an additional parent closes the child)
     * @param parent The parent to remove
     * @returns Whether this was the last parent
     */
    removeParent(parent) {
        // Remove the parent
        const index = this.parents.indexOf(parent);
        if (index >= 0) {
            this.parents.splice(index, 1);
            // Notify about the parent disconnect
            this.onRemoveParent(parent);
            // Check if this is the main parent, and if so, replace it
            if (parent == this.parent) {
                this.parent = this.parents[0];
                // Check if there is a replacement
                if (this.parent)
                    this.onChangeParent(this.parent, parent);
                else
                    return true;
            }
        }
    }
    /**
     * Called when any parent is removed (Either the main or additional parent)
     * @param parent The parent that was removed
     */
    onRemoveParent(parent) { }
    /**
     * Called when the main parent is removed, but an additional parent may take over
     * @param newParent The additional parent that is taking over
     * @param oldParent The previously main parent that got removed
     */
    onChangeParent(newParent, oldParent) { }
    async request(request) {
        return registry_1.Registry.request(Object.assign({ parent: this }, request));
    }
    /**
     * Retrieves the context that this method was called from, should be called before any awaits
     * @returns The program node from which the method was called
     * @throws {IllegalStateException} If the method is not called from the start of a interface method
     */
    getCallContext() {
        if (this.callContext === undefined)
            throw Error("Method shouldn't be called after an async call");
        return this.callContext;
    }
    /**
     * Updates the call context, should only be invoked by the proxy
     * @param callContext The new context
     */
    setCallContext(callContext) {
        this.callContext = callContext;
    }
    // Closing related methods
    /**
     * Stop and close the module
     */
    async close() {
        // Get the caller of the method, and make sure it's a parent
        const context = this.getCallContext();
        if (context.isParentof(this)) {
            // Remove the parent, and only close the module if it was the last parent
            if (this.removeParent(context)) {
                // Stop and destroy thismodule
                await this.stop();
                await this.destroy();
            }
        }
        else
            throw Error("Module may only be closed by its parent");
    }
    /**
     * Stops the program node's tasks
     */
    async stop() {
        // Indicate we are now attempting to stop
        await this.setState({
            isStopping: true,
        });
        // Perform stopping methods
        await this.stopChildren();
        await this.onStop();
        // TODO: Close communication channel
        // Indicate the module has now stopped
        this.setState({
            isStopped: true,
        });
    }
    /**
     * A hook for tasks to execute when the node is stopped
     */
    async onStop() { }
    /**
     * Stops all of the children and awaits them
     */
    async stopChildren() {
        // TODO: make sure to check whether module is closed before removing it from state
        // Retrieve all the modules in the state
        const modules = [];
        extendedObject_1.ExtendedObject.forEach(this.state, (key, val) => (val instanceof moduleProxy_1.ModuleProxy ? modules.push(val) : null), true);
        // Close all of the modules and wait for them to finish
        await Promise.all(modules.map((module) => module.close()));
    }
    /**
     * Disposes all stored resources of the node and unlinks itself from the state
     */
    async destroy() {
        programState_1.ProgramState.removeModule(this);
        this.settingsObject.destroy();
    }
    /**
     * Gets a 'singleton' remote proxy class for this module class
     * @returns The remoteModuleProxy for this module class
     */
    static getRemoteProxyClass() {
        if (!this.remoteProxyClass)
            this.remoteProxyClass = remoteModuleProxy_1.RemoteModuleProxy.createClass(this);
        return this.remoteProxyClass;
    }
    /**
     * Gets a 'singleton' proxy class for this node
     * @returns The programNodeProxy for this programNode class
     */
    static getProxyClass() {
        if (!this.proxyClass)
            this.proxyClass = moduleProxy_1.ModuleProxy.createClass(this);
        return this.proxyClass;
    }
    /**
     * Creates a proxy for this program node
     * @returns The created proxy
     */
    createProxy() {
        // Get the proxy class for this program node
        const ProxyClass = this.getClass().getProxyClass();
        // Create and return a new instance of this proxy class
        return ProxyClass.createInstance(this);
    }
    /**
     * Retrieves the config of the module
     * @returns The module's config
     */
    static getConfig() {
        return this.config;
    }
    /**
     * Retrieves an instance of the settings file for this module
     * @returns The settings file instance
     */
    static async getSettingsFile() {
        return settingsManager_1.SettingsManager.getSettingsFile(this);
    }
    /**
     * Installs the module if there is no settings file present for it
     * @returns A promise that resolves when installation is complete, indicating whether installation happened
     */
    static async installIfRequired() {
        // Check if an install is required or whether the mdoule has been installed already
        if (!settingsManager_1.SettingsManager.fileExists(this.getPath())) {
            // Create the settings file once to call all listeners and save it
            const settingsFile = await this.getSettingsFile();
            settingsFile.setDirty(true);
            // Call the installation method
            await this.getConfig().onInstall();
            return true;
        }
        return false;
    }
    /**
     * Retrieves the config of the module
     * @returns The module's config
     */
    getConfig() {
        return this.getClass().config;
    }
    /**
     * Assigns a view class to the config of this module
     * @param viewClass The view class to relate to this module class
     */
    static setViewClass(viewClass) {
        this.getConfig().viewClass = viewClass;
    }
    // Importing related methods
    getClass() {
        // Get the class out of this object instance
        return this.__proto__.constructor;
    }
    /**
     * Returns the path to this file, relative to the modules folder
     * @returns The path to this file
     */
    static getPath() {
        return this.path;
    }
    /**
     * Returns the path to this module class
     * @returns The path to this module class
     * @public
     */
    static toString() {
        return this.getPath();
    }
}
// Config related methods
Module.config = exports.baseConfig; // The config of the module, will be replaced by createModule
Module.path = ""; // The path of the importable class TODO: refer to some 'missing' path
exports.Module = Module;
//# sourceMappingURL=module.js.map