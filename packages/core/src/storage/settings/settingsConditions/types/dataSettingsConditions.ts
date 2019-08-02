import {SettingsConditions} from "../abstractSettingsConditions";
import {Json} from "../../../../utils/_types/standardTypes";
import {ParameterizedModule} from "../../../../module/module";
import {ExtendedObject} from "../../../../utils/extendedObject";

export class DataSettingsConditions extends SettingsConditions {
    // The name to be used in serialization
    public static typeName = "data";

    // The data to check for
    protected data: {[key: string]: Json};

    // Keep the data in string form
    protected dataString: string;

    /**
     * Creates a new instance of these settings conditions
     * @param data The data to check for
     * @param priority The priority of the settings set
     * @param disabled Whether or not these settings are disabled
     */
    constructor(
        data: {[key: string]: Json} | string,
        priority: number,
        disabled: boolean = false
    ) {
        super(priority, disabled);

        this.data = typeof data == "string" ? JSON.parse(data) : data;

        // Always stringify the data, such that formatting plays no role when using 'equals'
        this.dataString = JSON.stringify(data);
    }

    // Serialization
    /** @override */
    public static deserialize(
        data: Json,
        priority: number,
        disabled: boolean
    ): SettingsConditions {
        return new DataSettingsConditions(
            (data as {[key: string]: Json}) || {},
            priority,
            disabled
        );
    }

    /** @override */
    public serialize(): Json {
        return this.data;
    }

    // Usage methods
    /** @override */
    public matches(module: ParameterizedModule): boolean {
        return !this.data || ExtendedObject.deepContains(module.getData(), this.data);
    }

    /** @override */
    public equals(condition: SettingsConditions): boolean {
        // Check if the passed condition is not present, and this doesn't contain a real condition either
        if (condition == undefined && this.getPriority() == 0)
            return this.data == undefined;

        // Make sure that the contion is of the same type
        if (!(condition instanceof DataSettingsConditions)) return false;

        // Or both have the same condition, priority and data
        return (
            condition.dataString == this.dataString &&
            condition.getPriority() == this.getPriority() &&
            condition.isDisabled() == this.isDisabled()
        );
    }
}
