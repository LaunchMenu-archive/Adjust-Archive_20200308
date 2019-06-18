import { SettingsConfig } from "./settingsConfig";
import { SettingDefinition } from "./settingDefinition";
/**
 * Extracts the value types from a settings config
 */
export declare type SettingsData<C extends SettingsConfig> = {
    [K in Exclude<keyof C, "default" | "type" | "validation">]: C[K] extends SettingDefinition<infer V> ? V : (C[K] extends SettingsConfig ? SettingsData<C[K]> : undefined);
};
