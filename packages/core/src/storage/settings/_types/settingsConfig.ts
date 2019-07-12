import {ParameterizedSettingDefinition} from "./settingDefinition";

/**
 *  The format of a config of settings
 */
export type SettingsConfig =
    | ParameterizedSettingDefinition
    | {
          default?: undefined;
          type?: undefined;
          validation?: undefined;
          onChange?: undefined;
          [key: string]: SettingsConfig;
      };

// Manually set options keys from SettingDefinitionKeys, since I can't figure out how to do it dynamically
