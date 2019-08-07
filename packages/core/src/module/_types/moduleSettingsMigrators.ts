import {SettingsConfigSet} from "../../storage/settings/_types/settingsConfigSet";
import {ConditionalSettings} from "../../storage/settings/_types/conditionalSettings";
import {SettingsConfigSetData} from "../../storage/settings/_types/settingsConfigSetData";
import {SettingsMigratorFunction} from "../../storage/settings/_types/settingsMigrator";

/**
 * The migrator for exactly 1 format to the next, allowing for a parent version number
 */
export type ModuleSettingsMigrator =
    | (SettingsMigratorFunction)
    | {main: SettingsMigratorFunction; super: ModuleSettingsMigrator | string};

/**
 * A collection of settings migrators, allowing for a parent version number
 */
export type ModuleSettingsMigrators =
    // Leave migration completely up to the developer
    | (<S extends SettingsConfigSet>(
          version: string,
          data: ConditionalSettings<SettingsConfigSetData<any>>[],
          defaults: SettingsConfigSetData<S>
      ) => ConditionalSettings<SettingsConfigSetData<S>>[])
    // Use a simple version to version approach
    | {
          [toVersion: string]: ModuleSettingsMigrator;
      };
