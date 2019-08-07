import {ParameterizedSettingDefinition} from "./settingDefinition";
import {SettingsMigrators} from "./settingsMigrator";
import {SettingsConfigSet} from "./settingsConfigSet";
import {Empty} from "../../../utils/_types/standardTypes";

/**
 *  The format of a config of settings
 */
export type SettingsConfig<C extends SettingsConfigSet = any> = {
    version: string;
    settings: C;
    migrators: SettingsMigrators;
};
