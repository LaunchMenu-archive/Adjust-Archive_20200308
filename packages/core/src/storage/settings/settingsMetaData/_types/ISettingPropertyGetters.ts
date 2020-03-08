import {SettingInputContract} from "../../settingInputTypes/_types/SettingInput";
import {SettingDefinition} from "../../_types/settingDefinition";
import {ISettingAttributeEvaluator} from "../../_types/ISettingAttributeEvaluator";
import {SettingProperty} from "../settingProperty";

/**
 * The data of a single setting in the config, with all properties in the form of `SettingProperty` instance getters
 */
export type ISettingPropertyGetters<V, T extends SettingInputContract<V, any>> = {
    [P in keyof SettingDefinition<V, T>]-?: P extends
        | "default"
        | "type"
        | "constraints"
        | "onChange"
        ? SettingDefinition<V, T>[P]
        : SettingDefinition<V, T>[P] extends ISettingAttributeEvaluator<infer V>
        ? (createNew?: boolean) => SettingProperty<V>
        : SettingDefinition<V, T>[P];
};

/**
 * The data of a single setting in the config,  with all properties in the form of `SettingProperty` instance getters and with default params
 */
export type IParameterizedSettingPropertyGetters<
    V extends any = any,
    T extends SettingInputContract<V, any> = any
> = ISettingPropertyGetters<V, T>;
