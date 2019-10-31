import {ParameterizedSettingsFile} from "../settingsFile";
import {SettingsConditions} from "../settingsConditions/abstractSettingsConditions";
import {ISettingAttributeEvaluator} from "./ISettingAttributeEvaluator";
import {SettingInputContract} from "../settingInputTypes/_types/SettingInput";
import {ContractID} from "../../../registry/_types/contractID";
import {SettingProperty} from "../settingsMetaData/settingProperty";
import {ReactNode} from "react";
import {JSXchild} from "../../../utils/_types/standardTypes";

/**
 * Extracts the constraints type from the setting input type
 */
export type GetSettingInputConstraints<
    T extends SettingInputContract<any, any>
> = T extends SettingInputContract<any, infer C> ? C : undefined;

/**
 * The data of a single Setting in the config
 */
export type SettingDefinition<V, T extends SettingInputContract<V, any>> = {
    /** The default value of your setting*/
    default: V;
    /** The module type used to represent your setting (input) */
    type: ContractID<T> & ContractID<SettingInputContract<unknown, unknown>>;
    /** The constraints passed tot he module to dictate whether it is valid */
    constraints?: ISettingAttributeEvaluator<GetSettingInputConstraints<T>>;
    /** A hook detecting any changes to values */
    onChange?: (
        /** The new value of the setting */
        value: V,
        /** The condition for which the value changed*/
        condition: SettingsConditions,
        /** The old value of this setting under the given condition */
        oldValue: V,
        /** The settings file that this setting belongs to */
        settings: ParameterizedSettingsFile,
        /** Whether the call was made because of the initial settings load */
        fromLoad: boolean
    ) => void | Promise<void>;

    // Meta data for displaying

    /** The name of the setting to display to the user */
    name?: ISettingAttributeEvaluator<JSXchild>;
    /** A short description of setting */
    description?: ISettingAttributeEvaluator<JSXchild>;
    /** A more extensive description if necessary */
    help?: ISettingAttributeEvaluator<JSXchild>;
    /** A link to external help resources */
    helpLink?: ISettingAttributeEvaluator<string>;
    /** Whether or not this setting is completely hidden in the GUI */
    hidden?: ISettingAttributeEvaluator<boolean>;
    /** Whether this is an advanced setting and shouldn't be visible for standard userss */
    advanced?: ISettingAttributeEvaluator<boolean>;
    /** Whether or not the setting is enabled and may be changed */
    enabled?: ISettingAttributeEvaluator<boolean>;
    /** Whether or not the current search filter should exclude this setting */
    searchExcluded?: ISettingAttributeEvaluator<boolean>;
    /** The tags to use in the search excluded function */
    tags?: ISettingAttributeEvaluator<(string | RegExp)[]>;
};

/**
 * The data of a single Setting in the config, with default params
 */
export type ParameterizedSettingDefinition<
    V extends any = any,
    T extends SettingInputContract<V, any> = any
> = SettingDefinition<V, T>;

/**
 * The data of a single Setting in the config, with all properties guaranteed being present
 */
export type NormalizedSettingDefinition<V, T extends SettingInputContract<V, any>> = {
    [P in keyof SettingDefinition<V, T>]-?: SettingDefinition<V, T>[P];
};

/**
 * The data of a single Setting in the config, with all properties guaranteed being present and with default params
 */
export type ParameterizedNormalizedSettingDefinition<
    V extends any = any,
    T extends SettingInputContract<V, any> = any
> = {
    [P in keyof SettingDefinition<V, T>]-?: SettingDefinition<V, T>[P];
};

/**
 * The data of a single Setting in the config, with all properties in the form of `SettingProperty` instances
 */
export type PropertySettingDefinition<V, T extends SettingInputContract<V, any>> = {
    [P in keyof SettingDefinition<V, T>]-?: SettingDefinition<
        V,
        T
    >[P] extends ISettingAttributeEvaluator<infer V>
        ? (createNew?: boolean) => SettingProperty<V>
        : SettingDefinition<V, T>[P];
};

/**
 * The data of a single Setting in the config,  with all properties in the form of `SettingProperty` instances and with default params
 */
export type ParameterizedPropertySettingDefinition<
    V extends any = any,
    T extends SettingInputContract<V, any> = any
> = {
    [P in keyof SettingDefinition<V, T>]-?: SettingDefinition<
        V,
        T
    >[P] extends ISettingAttributeEvaluator<infer V>
        ? (createNew?: boolean) => SettingProperty<V>
        : SettingDefinition<V, T>[P];
};
