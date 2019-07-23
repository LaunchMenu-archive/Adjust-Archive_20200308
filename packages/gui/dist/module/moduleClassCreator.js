Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const module_1 = require("./module");
const registry_1 = require("../registry/registry");
const locationManager_type_1 = require("../modules/location/locationManager.type");
// Specify that the default module to be used is our extend module
class ModuleClassCreator extends core_1.ModuleClassCreator {
    /** @override */
    static createModule(config, moduleClass) {
        // Set the module class to the default module if not specified
        if (!moduleClass)
            moduleClass = module_1.Module;
        // Add location definition to the install method if present
        if (config.defineLocation) {
            const install = config.onInstall;
            config.onInstall = async () => {
                // Obtain the location manager instance
                const locationManager = await registry_1.Registry.createRoot({
                    type: locationManager_type_1.LocationManagerID,
                });
                await locationManager.updateLocation(config.defineLocation);
                // Call the original install function
                if (install)
                    return install();
            };
            if (!config.location)
                config.location = config.defineLocation.ID;
        }
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