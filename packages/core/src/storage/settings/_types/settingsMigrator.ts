import {ConditionalSettings} from "./conditionalSettings";
import {SettingsConfigSetData} from "./settingsConfigSetData";
import {SettingsConfigSet} from "./settingsConfigSet";

/**
 * The function to migrate from an old settings format to a new format
 */
export type SettingsMigrator = (
    data: SettingsConfigSetData<any>
) => SettingsConfigSetData<any>;

/**
 * A collection of settings migrators
 */
export type SettingsMigrators =
    // Leave migration completely up to the developer
    | (<S extends SettingsConfigSet>(
          version: string,
          data: ConditionalSettings<SettingsConfigSetData<any>>[],
          defaults: SettingsConfigSetData<S>
      ) => ConditionalSettings<SettingsConfigSetData<S>>[])
    // Use a simple version to version approach
    | {
          [toVersion: string]: SettingsMigrator;
      };
