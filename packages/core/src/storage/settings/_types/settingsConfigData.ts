import {SettingsConfig} from "./settingsConfig";
import {SettingsConfigSetData} from "./settingsConfigSetData";

/**
 * Extracts the value types from a settings config
 */
export type SettingsConfigData<C extends SettingsConfig> = SettingsConfigSetData<
    C["settings"]
>;
