import { ConditionalSettings } from "./conditionalSettings";
import { SettingsConfigSetData } from "./settingsConfigSetData";
import { SettingsConfigSet } from "./settingsConfigSet";
/**
 * The function to migrate from an old settings format to a new format
 */
export declare type SettingsMigrator = (data: SettingsConfigSetData<any>) => SettingsConfigSetData<any>;
/**
 * A collection of settings migrators
 */
export declare type SettingsMigrators = (<S extends SettingsConfigSet>(version: string, data: ConditionalSettings<SettingsConfigSetData<any>>[], defaults: SettingsConfigSetData<S>) => ConditionalSettings<SettingsConfigSetData<S>>[]) | {
    [toVersion: string]: SettingsMigrator;
};
