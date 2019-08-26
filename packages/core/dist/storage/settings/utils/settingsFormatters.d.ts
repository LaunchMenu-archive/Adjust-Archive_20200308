import { ParameterizedSettingDefinition } from "../_types/settingDefinition";
/**
 * Maps set of values into the settings format, with the given type
 * @param values The default values
 * @param data The additional data that all settings should have
 * @returns The settings config set
 */
export declare function createSettings<V extends {
    [setting: string]: any;
}, T extends ((val: V[keyof V]) => ParameterizedSettingDefinition) | Omit<ParameterizedSettingDefinition, "default">>(values: V, data: T): {
    [P in keyof V]: (T extends ((...args: any[]) => infer S) ? S : T & {
        default: V[P];
    });
};
