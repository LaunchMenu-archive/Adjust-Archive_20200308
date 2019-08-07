import { ParameterizedModuleConfig } from "./_types/moduleConfig";
import { ModuleSettingsMigrators } from "./_types/moduleSettingsMigrators";
import { Constructor, ExtendsClass, Empty } from "../utils/_types/standardTypes";
import { ExtendedModuleClass } from "./_types/extendedModule";
import { SettingsConfig } from "../storage/settings/_types/settingsConfig";
import { ModuleInterface } from "./_types/moduleInterface";
import { Module } from "./module";
export declare class ModuleClassCreator {
    /**
     * Creates a new class extending the passed class, with a dynamic name
     * @param name The name for the class
     * @param cls The class to extend
     * @returns The newly created class
     */
    protected static createNamedClass<K extends Constructor<any>>(name: string, cls: K): K;
    /**
     * Merges the two migrators
     * @param migrators The migrators to be used
     * @param superMigrators The migrators to merge into the others
     * @returns The resulting migrators
     */
    protected static mergeMigrators(migrators: ModuleSettingsMigrators, superMigrators: ModuleSettingsMigrators): ModuleSettingsMigrators;
    /**
     * A function to create a new module class
     * @param config The module config
     * @param module The module to extend
     * @returns The class created from the config data
     */
    static createModule<MC extends ParameterizedModuleConfig, X extends ExtendsClass<typeof Module, {}> = ExtendsClass<typeof Module, Module<typeof Module.config.initialState, SettingsConfig<Empty>, ModuleInterface>>>(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X>;
}
/**
 * A shortcut for the module creation method
 */
export declare const createModule: (typeof ModuleClassCreator)["createModule"];
