import {SettingsConditions} from "../settingsConditions";

/**
 * Settings that apply only when the given condition is met
 */
export type ConditionalSettings<D extends object> = {
    condition: SettingsConditions;
    data: D;
};
