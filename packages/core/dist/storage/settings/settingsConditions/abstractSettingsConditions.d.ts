import { Json } from "../../../utils/_types/standardTypes";
import { ParameterizedModule } from "../../../module/module";
/**
 * An abstract class to represent settings conditions
 */
export declare abstract class SettingsConditions {
    static typeName: string;
    protected priority: number;
    /**
     * Constructs an instance of these settings conditions
     * @param priority The priority of the settings set
     */
    constructor(priority: number);
    /**
     * Creates an instance of this class, given it's serialized data
     * @param data The data to deserialize
     * @param priority The priority of the setting
     */
    static deserialize(data: Json, priority: number): SettingsConditions;
    /**
     * Exports this object as serializable data such that it can be deserialized later
     * @returns The Json representation of this module's data, excluding priority
     */
    abstract serialize(): Json;
    /**
     * Retrieves the prioerity of the condition
     * @returns The priority
     */
    getPriority(): number;
    /**
     * Checks whether these settings apply to the module
     * @param module The module to check
     */
    abstract matches(module: ParameterizedModule): boolean;
    /**
     * Checks whether this condition is equal to another one
     * @param condition The settings condition to compare against
     */
    abstract equals(condition: SettingsConditions): boolean;
}
