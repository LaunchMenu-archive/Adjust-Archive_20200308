import {Data} from "../../data";
import {SettingsConditions} from "../settingsConditions";

/**
 * Settings that apply only when the given condition is met, where the data is stored in an actual Data object
 */
export type ConditionalSettingsData<D extends object> = {
    condition: SettingsConditions;
    data: Data<D>;
};

/**
 * Settings that apply only when the given condition is met, where the data is stored in an actual Data object, with a default parameter provided
 */
export type ParameterizedConditionalSettingsData = ConditionalSettingsData<{}>;
