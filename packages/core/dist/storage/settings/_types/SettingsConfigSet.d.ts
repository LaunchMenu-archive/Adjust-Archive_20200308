/// <reference types="react" />
import { ParameterizedSettingDefinition } from "./settingDefinition";
import { ISettingAttributeEvaluator } from "./ISettingAttributeEvaluator";
declare type SettingsConfigSetMetaData = {
    /** The name of the setting section to display to the user */
    name?: ISettingAttributeEvaluator<string>;
    /** A short description of setting section */
    description?: ISettingAttributeEvaluator<JSX.Element>;
    /** A more extensive description if necessary */
    help?: ISettingAttributeEvaluator<JSX.Element>;
    /** A link to external help resources */
    helpLink?: ISettingAttributeEvaluator<string>;
};
/**
 * The config for a set of settings
 */
export declare type SettingsConfigSet = {
    /** All the settings in the section */
    [Setting: string]: SettingsConfigSet | ParameterizedSettingDefinition | SettingsConfigSetMetaData;
    /** Default is used to check whether something is a setting value yet, so may not be present as a name of a  setting */
    default?: undefined;
    /** Any metadata about this section */
    sectionConfig?: SettingsConfigSetMetaData;
};
export {};
