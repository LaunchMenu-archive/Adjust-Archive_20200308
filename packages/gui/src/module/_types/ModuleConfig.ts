import {
    ModuleConfig as AdjustModuleConfig,
    ModuleInterface,
    SettingsConfig,
    ModuleState,
} from "@adjust/core/types";

/**
 * The config type for all Adjust GUI modules
 */
export type ModuleConfig<
    S extends ModuleState,
    C extends SettingsConfig,
    I extends ModuleInterface
> = AdjustModuleConfig<S, C, I> & {
    // Allows new locations to be defined upon install
    defineLocation?: {
        name: string;
        hints: object;
    };
};

/**
 * Default parameterized version of ModuleConfig
 */
export type ParameterizedModuleConfig = ModuleConfig<
    ModuleState,
    SettingsConfig,
    ModuleInterface
>;

/**
 * An interface that contains all config data for the module
 */
export type NormalizedModuleConfig<
    S extends ModuleState,
    C extends SettingsConfig,
    I extends ModuleInterface
> = {[P in keyof ModuleConfig<S, C, I>]-?: ModuleConfig<S, C, I>[P]};

/**
 * Default parameterized version of ModuleConfig
 */
export type ParameterizedNormalizedModuleConfig = NormalizedModuleConfig<
    ModuleState,
    SettingsConfig,
    ModuleInterface
>;
