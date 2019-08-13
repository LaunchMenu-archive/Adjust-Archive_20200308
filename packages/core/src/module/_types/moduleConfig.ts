import {ModuleState} from "./moduleState";
import {ModuleView} from "../moduleView";
import {ExtendsClass} from "../../utils/_types/standardTypes";
import {ModuleRequestData} from "./moduleRequestData";
import {ModuleContract} from "./moduleContract";
import {ContractID} from "../../registry/_types/contractID";
import {SettingsConfigSet} from "../../storage/settings/_types/settingsConfigSet";
import {ModuleSettingsMigrators} from "./moduleSettingsMigrators";

/**
 * An interface that contains all config data for the module
 */
export type ModuleConfig<
    S extends ModuleState,
    C extends SettingsConfigSet,
    I extends ModuleContract
> = {
    version?: string;
    settings: C;
    settingsMigrators?: ModuleSettingsMigrators;
    initialState: S;
    type: ContractID<I>;
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
