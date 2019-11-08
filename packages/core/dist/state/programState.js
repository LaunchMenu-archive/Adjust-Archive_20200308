Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.ProgramState = new ProgramStateSingleton();
//# sourceMappingURL=programState.js.map