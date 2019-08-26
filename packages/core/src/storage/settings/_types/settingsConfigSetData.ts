import {SettingDefinition, ParameterizedSettingDefinition} from "./settingDefinition";
import {SettingsConfigSet} from "./settingsConfigSet";
import {SettingInputContract} from "../settingInputTypes/_types/SettingInput";

/**
 * Extracts all keys of the set, for which the value is either a setting, or a setting set itself
 */
type ValidKeysOf<C extends SettingsConfigSet> = ({
    [P in keyof C]: C[P] extends ParameterizedSettingDefinition
        ? P
        : C[P] extends SettingsConfigSet
        ? P
        : undefined;
})[keyof C];

/**
 * Extracts the value types from a settings config
 */
export type SettingsConfigSetData<C extends SettingsConfigSet> = {
    [K in ValidKeysOf<C>]: C[K] extends SettingDefinition<infer V, any>
        ? V
        : C[K] extends SettingsConfigSet
        ? SettingsConfigSetData<C[K]>
        : never;
};
