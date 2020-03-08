import { ParameterizedModuleConfig } from "./_types/moduleConfig";
import { ModuleSettingsMigrators } from "./_types/moduleSettingsMigrators";
import { Constructor, ExtendsClass, Empty } from "../utils/_types/standardTypes";
import { ExtendedModuleClass } from "./_types/extendedModule";
import { SettingsConfig } from "../storage/settings/_types/settingsConfig";
import { ModuleContract } from "./_types/moduleContract";
import { Module } from "./module";
import { SettingDefinition } from "../storage/settings/_types/settingDefinition";
import { SettingInputContract } from "../storage/settings/settingInputTypes/_types/SettingInput";
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
    static createModule<MC extends ParameterizedModuleConfig, X extends ExtendsClass<typeof Module, {}> = ExtendsClass<typeof Module, Module<typeof Module.config.state, SettingsConfig<Empty>, ModuleContract>>>(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X>;
    /**
     * Method may be used to perform typechecking on a config
     * @param config The config to type check
     * @returns A copy of the config
     */
    static createConfig<T extends ParameterizedModuleConfig>(config: T): T;
    /**
     * Method may be used to perform typechecking on a setting
     * @param setting The setting to type check
     * @returns A copy of the setting
     */
    static createSetting<V, T extends SettingInputContract<V, any>>(setting: SettingDefinition<V, T>): SettingDefinition<V, T>;
}
/**
 * A shortcut for the module creation method
 */
export declare const createModule: (typeof ModuleClassCreator)["createModule"];
/**
 * A shortcut for the config creation method
 */
export declare const createConfig: (typeof ModuleClassCreator)["createConfig"];
/**
 * A shortcut for the setting creation method
 */
export declare const createSetting: (typeof ModuleClassCreator)["createSetting"];
