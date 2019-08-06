import {ParameterizedSettingDefinition} from "./settingDefinition";

/**
 * The config for a set of settings
 */
export type SettingsConfigSet = {
    default?: undefined; // Default is used to check whether something is a setting value yet, so may not be present as a name
    [setting: string]: SettingsConfigSet | ParameterizedSettingDefinition;
};
