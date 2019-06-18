import {SettingsConditions} from "../settingsConditions";

/**
 * Extacts the value objects and maps them to setters functions, that require a condition to be specified
 */
export type ConditionalSetters<C extends object> = {
    [k in keyof C]: C[k] extends object
        ? ConditionalSetters<C[k]> &
              ((val: C[k], condition?: SettingsConditions) => Promise<void>)
        : ((val: C[k], condition?: SettingsConditions) => Promise<void>)
};
