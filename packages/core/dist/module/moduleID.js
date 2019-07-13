Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../registry/registry");
const programState_1 = require("../state/programState");
const separator = ":";
/**
 * A class that can be used to reference a module.
 * Can be used within an app to show a module's view without having a connection to that module.
 */
class ModuleReference {
    constructor(modulePath, id) {
        if (id !== undefined && typeof modulePath == "string") {
            // Set the path and id directly
            this.modulePath = modulePath;
            this.ID = id;
        }
        else {
            // Get the path and id if the passed data is an already existing module id
            const parts = modulePath.toString().split(separator);
            this.modulePath = parts[0];
            this.ID = Number(parts[1]);
        }
    }
    /**
     * Retrieves the path to the class of the module
     * @returns The path
     */
    getModulePath() {
        return this.modulePath;
    }
    /**
     * Retrieves the ID of the module
     * @returns the ID
     */
    getID() {
        return this.ID;
    }
    /**@override */
    toString() {
        return this.modulePath + separator + this.ID;
    }
    /**
     * Checks whether two module references are equivalent
     * @param ref The reference to compare this to
     * @returns Whether the references are quivalent
     */
    equals(ref) {
        return ref.ID == this.ID && ref.modulePath == this.modulePath;
    }
}
exports.ModuleReference = ModuleReference;
/**
 * The class used internally to identify modules,
 * provides some utility methods to obtain data from this identifier
 */
class ModuleID extends ModuleReference {
    /**
     * Retrieves the class of the module type this ID represents
     * @returns The module class
     */
    getModuleClass() {
        let moduleClass;
        // Assume getModuleClass to behave syncrhonously, since install should have already occured
        registry_1.Registry.getModuleClass(this.modulePath).then(mc => (moduleClass = mc));
        return moduleClass;
    }
    /**
     * Retrieves the request path that corresponds to this module ID
     * @returns The request path
     */
    getRequestPath() {
        return this.getModule().getRequestPath();
    }
    /**
     * Retrieves the module that this ID uniquely identifies
     * @returns The module that this ID identifies
     */
    getModule() {
        return programState_1.ProgramState.getModule(this);
    }
}
exports.ModuleID = ModuleID;
//# sourceMappingURL=moduleID.js.map