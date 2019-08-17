import { ParameterizedSettingsFile } from "../settingsFile";
import { SettingsConditions } from "../settingsConditions/abstractSettingsConditions";
import { SettingsConfigType } from "./settingsCoonfigType";
/**
 * The data of a single Setting in the config
 */
export declare type SettingDefinition<V> = {
    default: V;
    type: SettingsConfigType;
    validation?: (value: any) => Error | void;
    onChange?: (value: any, condition: SettingsConditions, oldValue: any, settings: ParameterizedSettingsFile, fromLoad: boolean) => void | Promise<void>;
};
/**
 * The keys that are part of a settings definition
 */
export declare type SettingDefinitionKeys = "default" | "type" | "validation" | "onChange";
/**
 * The data of a single Setting in the config, with default params
 */
export declare type ParameterizedSettingDefinition<V = any> = SettingDefinition<V>;
