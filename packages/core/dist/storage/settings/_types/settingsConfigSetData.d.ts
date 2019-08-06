import { SettingDefinition, SettingDefinitionKeys } from "./settingDefinition";
import { SettingsConfigSet } from "./settingsConfigSet";
/**
 * Extracts the value types from a settings config
 */
export declare type SettingsConfigSetData<C extends SettingsConfigSet> = {
    [K in Exclude<keyof C, SettingDefinitionKeys>]: C[K] extends SettingDefinition<infer V> ? V : (C[K] extends SettingsConfigSet ? SettingsConfigSetData<C[K]> : undefined);
};
