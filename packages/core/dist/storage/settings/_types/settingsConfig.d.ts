import { SettingsMigrators } from "./settingsMigrator";
import { SettingsConfigSet } from "./settingsConfigSet";
/**
 *  The format of a config of settings
 */
export declare type SettingsConfig<C extends SettingsConfigSet = SettingsConfigSet> = {
    version: string;
    settings: C;
    migrators: SettingsMigrators;
};
