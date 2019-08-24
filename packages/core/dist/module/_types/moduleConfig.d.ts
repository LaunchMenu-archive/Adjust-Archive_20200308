import { ModuleState } from "./moduleState";
import { ModuleView } from "../moduleView";
import { ExtendsClass } from "../../utils/_types/standardTypes";
import { ModuleRequestData } from "./moduleRequestData";
import { ModuleContract } from "./moduleContract";
import { ContractID } from "../../registry/_types/contractID";
import { SettingsConfigSet } from "../../storage/settings/_types/settingsConfigSet";
import { ModuleSettingsMigrators } from "./moduleSettingsMigrators";
import { Module } from "../module";
/**
 * An interface that contains all config data for the module
 */
export declare type ModuleConfig<S extends ModuleState, C extends SettingsConfigSet, I extends ModuleContract> = {
    version?: string;
    settings: C;
    settingsMigrators?: ModuleSettingsMigrators;
    state: S;
    type: ContractID<I>;
    onInstall?: (moduleClass: typeof Module) => Promise<void> | void;
    onLoad?: (moduleClass: typeof Module) => Promise<void> | void;
    abstract?: boolean;
    viewClass?: ExtendsClass<typeof ModuleView, any>;
    getPriority?: (request: ModuleRequestData<I>) => number;
};
/**
 * Default parameterized version of ModuleConfig
 */
export declare type ParameterizedModuleConfig = ModuleConfig<ModuleState, SettingsConfigSet, ModuleContract>;
/**
 * An interface that contains all config data for the module
 */
export declare type NormalizedModuleConfig<S extends ModuleState, C extends SettingsConfigSet, I extends ModuleContract> = {
    [P in keyof ModuleConfig<S, C, I>]-?: ModuleConfig<S, C, I>[P];
};
/**
 * Default parameterized version of ModuleConfig
 */
export declare type ParameterizedNormalizedModuleConfig = NormalizedModuleConfig<ModuleState, SettingsConfigSet, ModuleContract>;
