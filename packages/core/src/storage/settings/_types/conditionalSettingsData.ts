import {Data} from "../../data";
import {SettingsConditions} from "../settingsConditions/abstractSettingsConditions";

/**
 * Settings that apply only when the given condition is met, where the data is stored in an actual Data object
 */
export type ConditionalSettingsData<D extends object> = {
    condition: SettingsConditions;
    ID: number;
    data: Data<D>;
};

/**
 * Settings that apply only when the given condition is met, where the data is stored in an actual Data object, with a default parameter provided
 */
export type ParameterizedConditionalSettingsData = ConditionalSettingsData<{}>;
