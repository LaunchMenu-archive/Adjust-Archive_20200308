import {SettingsConfig} from "./settingsConfig";
import {SettingDefinition, SettingDefinitionKeys} from "./settingDefinition";

/**
 * Extracts the value types from a settings config
 */
export type SettingsData<C extends SettingsConfig> = {
    [K in Exclude<keyof C, SettingDefinitionKeys>]: C[K] extends SettingDefinition<
        infer V
    >
        ? V
        : (C[K] extends SettingsConfig ? SettingsData<C[K]> : undefined)
};
