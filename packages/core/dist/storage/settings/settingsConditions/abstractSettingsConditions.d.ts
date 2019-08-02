import { Json } from "../../../utils/_types/standardTypes";
import { ParameterizedModule } from "../../../module/module";
/**
 * An abstract class to represent settings conditions
 */
export declare abstract class SettingsConditions {
    static typeName: string;
    protected priority: number;
    protected disabled: boolean;
    /**
     * Constructs an instance of these settings conditions
     * @param priority The priority of the settings set
     * @param disabled Whether or not the settings are disabled
     */
    constructor(priority: number, disabled?: boolean);
    /**
     * Creates an instance of this class, given it's serialized data
     * @param data The data to deserialize
     * @param priority The priority of the setting
     */
    static deserialize(data: Json, priority: number, disabled: boolean): SettingsConditions;
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
     * Retrieves whether or not the settings are disabled
     * @returns Whether they are disabled
     */
    isDisabled(): boolean;
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
