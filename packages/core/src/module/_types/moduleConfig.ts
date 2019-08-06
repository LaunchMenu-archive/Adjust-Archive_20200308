import {ModuleState} from "./moduleState";
import {ModuleView} from "../moduleView";
import {ExtendsClass} from "../../utils/_types/standardTypes";
import {ModuleRequestData} from "./moduleRequestData";
import {ModuleInterface} from "./moduleInterface";
import {InterfaceID} from "../../registry/_types/interfaceID";
import {SettingsMigrators} from "../../storage/settings/_types/settingsMigrator";
import {SettingsConfigSet} from "../../storage/settings/_types/settingsConfigSet";

/**
 * An interface that contains all config data for the module
 */
export type ModuleConfig<
    S extends ModuleState,
    C extends SettingsConfigSet,
    I extends ModuleInterface
> = {
    version?: string;
    settings: C;
    settingsMigrators?: SettingsMigrators;
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
export type ParameterizedModuleConfig = ModuleConfig<
    ModuleState,
    SettingsConfigSet,
    ModuleInterface
>;

/**
 * An interface that contains all config data for the module
 */
export type NormalizedModuleConfig<
    S extends ModuleState,
    C extends SettingsConfigSet,
    I extends ModuleInterface
> = {[P in keyof ModuleConfig<S, C, I>]-?: ModuleConfig<S, C, I>[P]};

/**
 * Default parameterized version of ModuleConfig
 */
export type ParameterizedNormalizedModuleConfig = NormalizedModuleConfig<
    ModuleState,
    SettingsConfigSet,
    ModuleInterface
>;
