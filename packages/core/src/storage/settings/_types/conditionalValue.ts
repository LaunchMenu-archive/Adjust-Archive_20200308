import {SettingsConditions} from "../settingsConditions/abstractSettingsConditions";

/**
 * The way a single value is stored together with its condition
 */
export type ConditionValue<C> = {condition: SettingsConditions; value: C};

/**
 * The way a single value is stored together with its condition, witha default parameter provided
 */
export type ParameterizedConditionValue<C = any> = ConditionValue<C>;
