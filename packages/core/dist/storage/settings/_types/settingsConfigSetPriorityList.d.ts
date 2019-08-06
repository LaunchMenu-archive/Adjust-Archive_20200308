import { SettingPriorityList } from "./settingPriorityList";
import { ParameterizedSettingDefinition } from "./settingDefinition";
import { SettingsConfigSetData } from "./settingsConfigSetData";
import { SettingsConfigSet } from "./settingsConfigSet";
/**
 * Extracts the value types from a settings config and maps them to a settingPriorityList,
 * which is a list of setting values and conditions, orederd by the conditions' priorities.
 */
export declare type SettingsConfigSetPriorityList<C extends SettingsConfigSet> = {
    [k in keyof C]: C[k] extends ParameterizedSettingDefinition ? SettingPriorityList<C[k]["default"]> : (C[k] extends SettingsConfigSet ? SettingsConfigSetData<C[k]> : undefined);
};
/**
 * SettingsConfigSetPriorityList, but with a default parameter
 */
export declare type ParameterizedSettingsConfigSetPriorityList = SettingsConfigSetPriorityList<SettingsConfigSet>;
