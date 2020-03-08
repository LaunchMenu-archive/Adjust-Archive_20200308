import {
    ParameterizedSettingDefinition,
    NormalizedSettingDefinition,
} from "./settingDefinition";
import {ISettingAttributeEvaluator} from "./ISettingAttributeEvaluator";
import {ITraceableTransformer} from "../../../utils/serialization/_types/ITracableTransformer";
import {JSXchild} from "../../../utils/_types/standardTypes";

/**
 * The config data for a section of settings
 */
export type SettingsSectionConfig = {
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
 * The config for a set of settings
 */
export type SettingsConfigSet = {
    /** All the settings in the section */
    [Setting: string]:
        | SettingsConfigSet
        | ParameterizedSettingDefinition
        | SettingsSectionConfig;
    /** Default is used to check whether something is a setting value yet, so may not be present as a name of a  setting */
    default?: undefined;
    /** Any metadata about this section */
    sectionConfig?: SettingsSectionConfig;
};

/**
 * The config for a set of settings, with all settings properties being present
 */
export type NormalizedSettingsConfigSet<
    S extends SettingsConfigSet = SettingsConfigSet
> = {
    [P in keyof S]: S[P] extends ParameterizedSettingDefinition<infer V, infer T>
        ? NormalizedSettingDefinition<V, T>
        : S[P] extends SettingsConfigSet
        ? NormalizedSettingsConfigSet<S[P]>
        : S[P];
};
