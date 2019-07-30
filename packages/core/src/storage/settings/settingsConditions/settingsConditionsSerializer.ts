import {ExtendsClass} from "../../../utils/_types/standardTypes";
import {SettingsConditions} from "./abstractSettingsConditions";
import {SerializedSettingsConditions} from "./_types/serializedSettingsConditions";
import {FunctionSettingsConditions} from "./functionSettingsConditions";

/**
 * A class to keep track of all possible types of settings conditions
 * and allow to serialize and deserialize them
 */
class SettingsConditionSerializerSingleton {
    // The types of settings conditions that are available
    protected types: {
        [name: string]: ExtendsClass<SettingsConditions>;
    } = {};

    /**
     * Adds a new settings condition type such that it can be deserialized
     * @param type The class of the settings condition
     */
    public registerSettingsConditionType(type: ExtendsClass<SettingsConditions>): void {
        this.types[type.typeName] = type;
    }

    /**
     * Serializes the settings conditions, no matter what type
     * @param settingsConditions The settings conditions to serialize
     * @returns The json representation of the conditions
     */
    public serialize(
        settingsConditions: SettingsConditions
    ): SerializedSettingsConditions {
        const cls = (settingsConditions as any).__proto__.constructor;
        return {
            type: cls.typeName,
            data: settingsConditions.serialize(),
            priority: settingsConditions.getPriority(),
        };
    }

    /**
     * Deserializes the settings conditions, no matter what type
     * @param data The serialized representation of the settings conditions
     * @returns The settings conditions in instance form
     */
    public deserialize(data: SerializedSettingsConditions): SettingsConditions {
        // Set default data if absent
        if (!data)
            data = {
                type: "function",
                data: undefined,
                priority: 0,
            };

        // Obtain the class
        const cls = this.types[data.type];

        // Throw an error if the class is absent
        if (!cls)
            throw Error(`No conditions type by the name '${data.type}' could be found`);

        // Deserialize the data as this type
        return cls.deserialize(data.data, data.priority);
    }
}

export const SettingsConditionSerializer = new SettingsConditionSerializerSingleton();

// Add all types
[FunctionSettingsConditions].forEach(type =>
    SettingsConditionSerializer.registerSettingsConditionType(type)
);
