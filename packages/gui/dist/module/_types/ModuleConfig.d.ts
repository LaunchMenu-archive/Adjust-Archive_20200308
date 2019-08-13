import { ModuleConfig as AdjustModuleConfig, ModuleState, SettingsConfigSet, ModuleContract } from "@adjust/core/types";
import { ModuleLocation } from "./ModuleLocation";
/**
 * The config type for all Adjust GUI modules
 */
export declare type ModuleConfig<S extends ModuleState, C extends SettingsConfigSet, I extends ModuleContract> = AdjustModuleConfig<S, C, I> & {
    defineLocation?: ModuleLocation;
    location?: string | string[];
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
