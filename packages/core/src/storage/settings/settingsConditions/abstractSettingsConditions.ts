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

    // The name of the conditions
    protected name: string;

    /**
     * Constructs an instance of these settings conditions
     * @param priority The priority of the settings set
     * @param disabled Whether or not the settings are disabled
     * @param name The name of the conditions
     */
    constructor(priority: number, disabled: boolean = false, name: string = "") {
        this.priority = priority;
        this.disabled = disabled;
        this.name = name;
    }

    // Serialization
    /**
     * Creates an instance of this class, given it's serialized data
     * @param data The data to deserialize
     * @param priority The priority of the setting
     * @param name The name of the conditions
     */
    public static deserialize(
        data: Json,
        priority: number,
        disabled: boolean,
        name: string
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
     * Sets the name for this condition
     * @param name The name
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Retrieves the name of this condition
     * @returns The name of this condition
     */
    public getName(): string {
        return this.name;
    }

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
