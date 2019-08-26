import {ExtendedObject} from "../../../utils/extendedObject";
import {ParameterizedSettingDefinition} from "../_types/settingDefinition";

/**
 * Maps set of values into the settings format, with the given type
 * @param values The default values
 * @param data The additional data that all settings should have
 * @returns The settings config set
 */
export function createSettings<
    V extends {[setting: string]: any},
    T extends
        | ((val: V[keyof V]) => ParameterizedSettingDefinition)
        | Omit<ParameterizedSettingDefinition, "default">
>(
    values: V,
    data: T
): {
    [P in keyof V]: (T extends ((...args) => infer S) ? S : T & {default: V[P]});
} {
    if (data instanceof Function) return ExtendedObject.map(values, data as any) as any;
    return ExtendedObject.map(values, v => ({...data, default: v})) as any;
}
