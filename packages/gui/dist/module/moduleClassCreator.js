Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const module_1 = require("./module");
// Specify that the default module to be used is our extend module
class ModuleClassCreator extends core_1.ModuleClassCreator {
    /** @override */
    static createModule(config, moduleClass) {
        // Set the module class to the default module if not specified
        if (!moduleClass)
            moduleClass = module_1.Module;
        // If a module location is provided, assign it to the settings
        if (config.location)
            config.settings.location = {
                default: config.location,
            };
        // Call the method as per usual
        return super.createModule(config, moduleClass);
    }
}
exports.ModuleClassCreator = ModuleClassCreator;
/**
 * A shortcut for the module creation method
 */
exports.createModule = ModuleClassCreator.createModule.bind(ModuleClassCreator);
//# sourceMappingURL=moduleClassCreator.js.map