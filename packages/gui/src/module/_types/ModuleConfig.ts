import {
    ModuleConfig as AdjustModuleConfig,
    ModuleState,
    SettingsConfigSet,
    ModuleContract,
} from "@adjust/core/types";
import {ModuleLocation} from "./ModuleLocation";
import {Module} from "../module";

/**
 * The config type for all Adjust GUI modules
 */
export type ModuleConfig<
    S extends ModuleState,
    C extends SettingsConfigSet,
    I extends ModuleContract
> = AdjustModuleConfig<S, C, I> & {
    // Allows new locations to be defined upon install
    defineLocation?: ModuleLocation;
    // Define the location it should take in a cleaner way than through settings
    location?: string | string[];
};

/**
 * Default parameterized version of ModuleConfig
 */
export type ParameterizedModuleConfig = ModuleConfig<
    ModuleState,
    SettingsConfigSet,
    ModuleContract
>;

/**
 * An interface that contains all config data for the module
 */
export type NormalizedModuleConfig<
    S extends ModuleState,
    C extends SettingsConfigSet,
    I extends ModuleContract
> = {[P in keyof ModuleConfig<S, C, I>]-?: ModuleConfig<S, C, I>[P]};

/**
 * Default parameterized version of ModuleConfig
 */
export type ParameterizedNormalizedModuleConfig = NormalizedModuleConfig<
    ModuleState,
    SettingsConfigSet,
    ModuleContract
>;
