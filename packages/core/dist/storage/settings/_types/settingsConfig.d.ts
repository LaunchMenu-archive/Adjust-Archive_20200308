import { ParameterizedSettingDefinition } from "./settingDefinition";
/**
 *  The format of a config of settings
 */
export declare type SettingsConfig = ParameterizedSettingDefinition | {
    default?: undefined;
    type?: undefined;
    validation?: undefined;
    [key: string]: SettingsConfig;
};
