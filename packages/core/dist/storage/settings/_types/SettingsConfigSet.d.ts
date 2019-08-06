import { ParameterizedSettingDefinition } from "./settingDefinition";
/**
 * The config for a set of settings
 */
export declare type SettingsConfigSet = {
    default?: undefined;
    [setting: string]: SettingsConfigSet | ParameterizedSettingDefinition;
};
