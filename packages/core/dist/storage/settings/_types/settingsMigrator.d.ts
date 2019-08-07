import { ConditionalSettings } from "./conditionalSettings";
import { SettingsConfigSetData } from "./settingsConfigSetData";
import { SettingsConfigSet } from "./settingsConfigSet";
/**
 * The function to migrate from an old settings format to a new format
 */
export declare type SettingsMigratorFunction = (data: SettingsConfigSetData<any>, superData?: SettingsConfigSetData<any>) => SettingsConfigSetData<any>;
/**
 * The migrator for exactly 1 format to the next
 */
export declare type SettingsMigrator = (SettingsMigratorFunction) | {
    main: SettingsMigratorFunction;
    super: SettingsMigrators;
};
/**
 * A collection of settings migrators
 */
export declare type SettingsMigrators = (<S extends SettingsConfigSet>(version: string, data: ConditionalSettings<SettingsConfigSetData<any>>[], defaults: SettingsConfigSetData<S>) => ConditionalSettings<SettingsConfigSetData<S>>[]) | {
    [toVersion: string]: SettingsMigrator;
};
