Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../registry/registry");
const extendedObject_1 = require("../utils/extendedObject");
const moduleID_1 = require("../module/moduleID");
/**
 * Keeps references to all of the module instances that essentially make up the entire program
 */
class ProgramStateSingleton {
    constructor() {
        // The currently stored modules
        this.modules = {};
        // The maximum module id that has been created for a certain module type
        this.maxModuleIDs = {};
    }
    // Module tracking
    /**
     * Gets the next available ID for a module of the specified type
     * @param modulePath The path to the module for which to get a UID
     * @returns The created UID
     */
    getNextModuleID(modulePath) {
        // Normalize the module path
        if (typeof modulePath != "string")
            modulePath = modulePath.getPath();
        // Initialise the max ID if not done so already
        if (!this.maxModuleIDs[modulePath])
            this.maxModuleIDs[modulePath] = 0;
        // Claim the next non taken ID, and update it
        return new moduleID_1.ModuleID(modulePath, this.maxModuleIDs[modulePath]++);
    }
    /**
     * Adds the module to the program state
     * @param module The module that should be added
     * @returns The moduleID that was created for the passed module
     */
    addModule(module) {
        // Extract the module ID of the module
        const moduleID = module.getID();
        // Add the module to the list
        this.modules[moduleID.toString()] = module;
    }
    /**
     * Removes the node from the program state
     * @param node The node to remove
     */
    removeModule(module) {
        // Extract the module ID of the module
        const moduleID = module.getID();
        // Remove the module from the list
        delete this.modules[moduleID.toString()];
    }
    /**
     * Retrieves a module by its ID
     * @param moduleID The ID of the module
     * @returns The module instance if available
     */
    getModule(moduleID) {
        // Normalize the module ID
        moduleID = moduleID + "";
        // Get the specific module
        const module = this.modules[moduleID.toString()];
        // Return the result
        return module;
    }
    // Serilization
    /**
     * Serializes all modules into a single object
     * @returns The overall object containing all serialized modules
     */
    serialize() {
        // TODO: call stop on modules first
        return {
            maxModuleIDS: Object.assign({}, this.maxModuleIDs),
            modules: extendedObject_1.ExtendedObject.map(this.modules, module => module.serialize()),
        };
    }
    /**
     * Loads the passed data into the program state
     * @param modules The actual data to create the modules from
     */
    async deserialize(data) {
        // Make sure the programState is currently empty
        if (Object.keys(this.modules).length != 0)
            throw new Error("A previous state can only be loaded into an empty program state");
        // Load the current maximum IDs
        this.maxModuleIDs = Object.assign({}, data.maxModuleIDS);
        // Create the modules
        const instanciatePromises = Object.keys(data.modules).map(async (moduleID) => {
            const moduleData = data.modules[moduleID];
            // Get the class of the module
            const moduleClass = registry_1.Registry.getModuleClass(moduleData.$type);
            // TODO: add error handling if no moduleClass could be found
            // Create a new instance of this class, deserializing the setup related data
            const module = await moduleClass.recreateInstance(moduleData, new moduleID_1.ModuleID(moduleID));
            // Return the instance
            return { moduleID, module };
        });
        // Reconstruct the modules object from the key value pairs
        const modules = await Promise.all(instanciatePromises);
        this.modules = {};
        modules.forEach(({ moduleID, module }) => (this.modules[moduleID] = module));
        // Perform deserialization of the state
        const deserializePromises = [];
        extendedObject_1.ExtendedObject.forEach(data.modules, (key, moduleData) => {
            // Get the actual module
            const module = this.modules[key];
            // Deserialize the data
            deserializePromises.push(module.deserialize(moduleData.data));
        });
        await Promise.all(deserializePromises);
    }
}
exports.ProgramState = new ProgramStateSingleton();
//# sourceMappingURL=programState.js.map