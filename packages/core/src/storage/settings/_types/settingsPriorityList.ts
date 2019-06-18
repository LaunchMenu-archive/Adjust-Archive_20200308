import {SettingPriorityList} from "./settingPriorityList";
import {SettingsConfig} from "./settingsConfig";
import {ParameterizedSettingDefinition} from "./settingDefinition";
import {SettingsData} from "./settingsData";

/**
 * Extracts the value types from a settings config and maps them to a settingPriorityList,
 * which is a list of setting values and conditions, orederd by the conditions' priorities.
 */
export type SettingsPriorityList<C extends SettingsConfig> = {
    [k in keyof C]: C[k] extends ParameterizedSettingDefinition
        ? SettingPriorityList<C[k]["default"]>
        : (C[k] extends SettingsConfig ? SettingsData<C[k]> : undefined)
};

/**
 * SettingsPriorityList, but with a default parameter
 */
export type ParameterizedSettingsPriorityList = SettingsPriorityList<SettingsConfig>;
