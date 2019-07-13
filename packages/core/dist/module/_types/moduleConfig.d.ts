import { ModuleState } from "./moduleState";
import { ModuleView } from "../moduleView";
import { ExtendsClass } from "../../utils/_types/standardTypes";
import { ModuleRequestData } from "./moduleRequestData";
import { SettingsConfig } from "../../storage/settings/_types/settingsConfig";
import { ModuleInterface } from "./moduleInterface";
import { InterfaceID } from "../../registry/_types/interfaceID";
/**
 * An interface that contains all config data for the module
 */
export declare type ModuleConfig<S extends ModuleState, C extends SettingsConfig, I extends ModuleInterface> = {
    settings: C;
    initialState: S;
    type: InterfaceID<I>;
    onInstall?: () => Promise<void> | void;
    abstract?: boolean;
    viewClass?: ExtendsClass<typeof ModuleView, any>;
    getPriority?: (request: ModuleRequestData<I>) => number;
};
/**
 * Default parameterized version of ModuleConfig
 */
export declare type ParameterizedModuleConfig = ModuleConfig<ModuleState, SettingsConfig, ModuleInterface>;
/**
 * An interface that contains all config data for the module
 */
export declare type NormalizedModuleConfig<S extends ModuleState, C extends SettingsConfig, I extends ModuleInterface> = {
    [P in keyof ModuleConfig<S, C, I>]-?: ModuleConfig<S, C, I>[P];
};
/**
 * Default parameterized version of ModuleConfig
 */
export declare type ParameterizedNormalizedModuleConfig = NormalizedModuleConfig<ModuleState, SettingsConfig, ModuleInterface>;
