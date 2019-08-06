import { SettingsConfigSetPriorityList } from "./settingsConfigSetPriorityList";
import { SettingsConfig } from "./settingsConfig";
/**
 * Extracts the value types from a settings config and maps them to a settingPriorityList,
 * which is a list of setting values and conditions, orederd by the conditions' priorities.
 */
export declare type SettingsConfigPriorityList<C extends SettingsConfig> = SettingsConfigSetPriorityList<C["settings"]>;
/**
 * SettingsPriorityList, but with a default parameter
 */
export declare type ParameterizedSettingsConfigPriorityList = SettingsConfigPriorityList<SettingsConfig>;
