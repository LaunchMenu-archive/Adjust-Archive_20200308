import { ExtendsClass } from "../../../utils/_types/standardTypes";
import { SettingsConditions } from "./abstractSettingsConditions";
import { SerializedSettingsConditions } from "./_types/serializedSettingsConditions";
/**
 * A class to keep track of all possible types of settings conditions
 * and allow to serialize and deserialize them
 */
declare class SettingsConditionSerializerSingleton {
    protected types: {
        [name: string]: ExtendsClass<SettingsConditions>;
    };
    /**
     * Adds a new settings condition type such that it can be deserialized
     * @param type The class of the settings condition
     */
    registerSettingsConditionType(type: ExtendsClass<SettingsConditions>): void;
    /**
     * Serializes the settings conditions, no matter what type
     * @param settingsConditions The settings conditions to serialize
     * @returns The json representation of the conditions
     */
    serialize(settingsConditions: SettingsConditions): SerializedSettingsConditions;
    /**
     * Deserializes the settings conditions, no matter what type
     * @param data The serialized representation of the settings conditions
     * @returns The settings conditions in instance form
     */
    deserialize(data: SerializedSettingsConditions): SettingsConditions;
}
export declare const SettingsConditionSerializer: SettingsConditionSerializerSingleton;
export {};
