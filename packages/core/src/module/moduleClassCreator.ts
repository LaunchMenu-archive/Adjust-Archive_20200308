import {
    ParameterizedModuleConfig,
    ParameterizedNormalizedModuleConfig,
} from "./_types/moduleConfig";
import {SettingsConfig} from "../storage/settings/_types/settingsConfig";
import {ExtendedObject} from "../utils/extendedObject";
import {ExtendedModuleClass} from "./_types/extendedModule";
import {Constructor, ExtendsClass, Json} from "../utils/_types/standardTypes";
import {Module} from "./module";
import {ModuleInterface} from "./_types/moduleInterface";

export class ModuleClassCreator {
    /**
     * Creates a new class extending the passed class, with a dynamic name
     * @param name The name for the class
     * @param cls The class to extend
     */
    protected static createNamedClass<K extends Constructor<any>>(
        name: string,
        cls: K
    ): K {
        return new Function("cls", `return class ${name} extends cls {}`)(cls);
    }

    /**
     * A function to create a new module class
     * @param config The module config
     * @param module The module to extend
     */
    public static createModule<
        MC extends ParameterizedModuleConfig,
        // Can't use Module<{}, {}, any> instead of {}, due to it expecting private members
        X extends ExtendsClass<typeof Module, {}> = ExtendsClass<
            typeof Module,
            Module<typeof Module.config.initialState, {}, ModuleInterface>
        >
    >(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X> {
        // Set the module class to the default module if not specified
        if (!moduleClass) moduleClass = Module as any;

        // Create the class
        const cls = this.createNamedClass((moduleClass as any).name, moduleClass);

        // Get the super config
        const superConfig = (moduleClass as any).getConfig() as ParameterizedModuleConfig;

        // Combine the settings of both configs, giving priority to the new config
        const settings: SettingsConfig = ExtendedObject.copyData(
            superConfig.settings,
            {}
        ) as any;
        ExtendedObject.copyData(config.settings, settings);

        // Combine the initial states of both configs, giving priority to the new config
        const initialState = ExtendedObject.copyData(superConfig.initialState, {});
        ExtendedObject.copyData(config.initialState, initialState);

        // Create the normalized and extended config
        const normalizedConfig: ParameterizedNormalizedModuleConfig = {
            settings,
            initialState,
            abstract: config.abstract,
            onInstall: config.onInstall || (() => {}),
            type: config.type || superConfig.type,
            viewClass: config.viewClass || superConfig.viewClass,
            getPriority: config.getPriority || superConfig.getPriority || (() => 1),
        };

        // Assign the config to the class
        cls.config = normalizedConfig as any;

        // Return the created class
        return cls as any;
    }
}

/**
 * A shortcut for the module creation method
 */
export const createModule: (typeof ModuleClassCreator)["createModule"] = ModuleClassCreator.createModule.bind(
    ModuleClassCreator
);
