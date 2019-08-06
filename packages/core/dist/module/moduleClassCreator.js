Object.defineProperty(exports, "__esModule", { value: true });
const extendedObject_1 = require("../utils/extendedObject");
const module_1 = require("./module");
class ModuleClassCreator {
    /**
     * Creates a new class extending the passed class, with a dynamic name
     * @param name The name for the class
     * @param cls The class to extend
     */
    static createNamedClass(name, cls) {
        return new Function("cls", `return class ${name} extends cls {}`)(cls);
    }
    /**
     * A function to create a new module class
     * @param config The module config
     * @param module The module to extend
     */
    static createModule(config, moduleClass) {
        // Set the module class to the default module if not specified
        if (!moduleClass)
            moduleClass = module_1.Module;
        // Create the class
        const cls = this.createNamedClass(moduleClass.name, moduleClass);
        // Get the super config
        const superConfig = moduleClass.getConfig();
        // Combine the settings of both configs, giving priority to the new config
        const settings = extendedObject_1.ExtendedObject.copyData(superConfig.settings, {});
        extendedObject_1.ExtendedObject.copyData(config.settings, settings);
        // Combine the settings migrators of botth configs
        let settingsMigrators = config.settingsMigrators || superConfig.settingsMigrators || {};
        if (config.settingsMigrators && superConfig.settingsMigrators) {
            if (extendedObject_1.ExtendedObject.isPlainObject(config.settingsMigrators)) {
                // TODO: warn about complex migrator joining
            }
            else if (!extendedObject_1.ExtendedObject.isPlainObject(superConfig.settingsMigrators))
                throw Error("Super module uses custom migrator, automatic migrator merging can not be used, use an advanced migration method instead");
            // TODO: Handle combining the migrators
        }
        // Combine the initial states of both configs, giving priority to the new config
        const initialState = extendedObject_1.ExtendedObject.copyData(superConfig.initialState, {});
        extendedObject_1.ExtendedObject.copyData(config.initialState, initialState);
        // Create the normalized and extended config
        const normalizedConfig = {
            version: config.version,
            settings,
            settingsMigrators,
            initialState,
            abstract: config.abstract,
            onInstall: config.onInstall || (() => { }),
            type: config.type || superConfig.type,
            viewClass: config.viewClass || superConfig.viewClass,
            getPriority: config.getPriority || superConfig.getPriority || (() => 1),
        };
        // Assign the config to the class
        cls.config = normalizedConfig;
        // Return the created class
        return cls;
    }
}
exports.ModuleClassCreator = ModuleClassCreator;
/**
 * A shortcut for the module creation method
 */
exports.createModule = ModuleClassCreator.createModule.bind(ModuleClassCreator);
//# sourceMappingURL=moduleClassCreator.js.map