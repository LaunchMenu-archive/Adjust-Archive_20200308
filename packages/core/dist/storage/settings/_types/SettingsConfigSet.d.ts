import { ParameterizedSettingDefinition, NormalizedSettingDefinition, PropertySettingDefinition } from "./settingDefinition";
import { ISettingAttributeEvaluator } from "./ISettingAttributeEvaluator";
import { ITraceableTransformer } from "../../../utils/serialization/_types/ITracableTransformer";
import { JSXchild } from "../../../utils/_types/standardTypes";
import { SettingProperty } from "../settingsMetaData/settingProperty";
/**
 * The config data for a section of settings
 */
export declare type SettingsSectionConfig = {
    /** The name of the setting section to display to the user */
    name?: ISettingAttributeEvaluator<ITraceableTransformer<JSXchild> | string>;
    /** A short description of setting section */
    description?: ISettingAttributeEvaluator<ITraceableTransformer<JSXchild> | string>;
    /** A more extensive description if necessary */
    help?: ISettingAttributeEvaluator<ITraceableTransformer<JSXchild> | string>;
    /** A link to external help resources */
    helpLink?: ISettingAttributeEvaluator<string>;
};
/**
 * The config data for a section expressed in property getters
 */
export declare type PropertySettingsSectionConfig = {
    [M in keyof SettingsSectionConfig]: SettingsSectionConfig[M] extends ISettingAttributeEvaluator<infer V> ? (createNew?: boolean) => SettingProperty<V> : SettingsSectionConfig[M];
};
/**
 * The config for a set of settings
 */
export declare type SettingsConfigSet = {
    /** All the settings in the section */
    [Setting: string]: SettingsConfigSet | ParameterizedSettingDefinition | SettingsSectionConfig;
    /** Default is used to check whether something is a setting value yet, so may not be present as a name of a  setting */
    default?: undefined;
    /** Any metadata about this section */
    sectionConfig?: SettingsSectionConfig;
};
/**
 * The config for a set of settings, with all settings properties being present
 */
export declare type NormalizedSettingsConfigSet<S extends SettingsConfigSet = SettingsConfigSet> = {
    [P in keyof S]: S[P] extends ParameterizedSettingDefinition<infer V, infer T> ? NormalizedSettingDefinition<V, T> : S[P] extends SettingsConfigSet ? NormalizedSettingsConfigSet<S[P]> : S[P];
};
/**
 * The config for a set of settings, with all settings properties being present in the form of `SettingProperty` instances
 */
export declare type PropertySettingsConfigSet<S extends SettingsConfigSet = SettingsConfigSet> = {
    [P in keyof S]: P extends "sectionConfig" ? PropertySettingsSectionConfig : S[P] extends ParameterizedSettingDefinition<infer V, infer T> ? PropertySettingDefinition<V, T> : S[P] extends SettingsConfigSet ? PropertySettingsConfigSet<S[P]> : S[P];
};
