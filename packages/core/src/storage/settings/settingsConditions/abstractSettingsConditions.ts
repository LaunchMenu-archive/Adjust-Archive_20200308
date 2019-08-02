import {Json} from "../../../utils/_types/standardTypes";
import {ParameterizedModule} from "../../../module/module";

/**
 * An abstract class to represent settings conditions
 */
export abstract class SettingsConditions {
    // The name to be used in serialization
    public static typeName = "abstract";

    // The priority of the settings set
    protected priority: number;

    // Whether or not the settings are disabled
    protected disabled: boolean = false;

    /**
     * Constructs an instance of these settings conditions
     * @param priority The priority of the settings set
     * @param disabled Whether or not the settings are disabled
     */
    constructor(priority: number, disabled: boolean = false) {
        this.priority = priority;
        this.disabled = disabled;
    }

    // Serialization
    /**
     * Creates an instance of this class, given it's serialized data
     * @param data The data to deserialize
     * @param priority The priority of the setting
     */
    public static deserialize(
        data: Json,
        priority: number,
        disabled: boolean
    ): SettingsConditions {
        throw Error("This method hasn't been implemented yet by child class");
    }

    /**
     * Exports this object as serializable data such that it can be deserialized later
     * @returns The Json representation of this module's data, excluding priority
     */
    public abstract serialize(): Json;

    // Usage methods
    /**
     * Retrieves the prioerity of the condition
     * @returns The priority
     */
    public getPriority(): number {
        return this.priority;
    }

    /**
     * Retrieves whether or not the settings are disabled
     * @returns Whether they are disabled
     */
    public isDisabled(): boolean {
        return this.disabled;
    }

    /**
     * Checks whether these settings apply to the module
     * @param module The module to check
     */
    public abstract matches(module: ParameterizedModule): boolean;

    /**
     * Checks whether this condition is equal to another one
     * @param condition The settings condition to compare against
     */
    public abstract equals(condition: SettingsConditions): boolean;
}
