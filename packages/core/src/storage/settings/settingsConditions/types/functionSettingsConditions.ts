import {ParameterizedModule} from "../../../../module/module";
import {Condition} from "../_types/condition";
import {SettingsConditions} from "../abstractSettingsConditions";
import {Json} from "../../../../utils/_types/standardTypes";

/*
 TODO: finish class: 
    - Typescript support,
    - Allow listening to target's state and update whether applicable based on that (complex)
 */
export class FunctionSettingsConditions extends SettingsConditions {
    // The name to be used in serialization
    public static typeName = "function";

    // The condition function
    protected condition: Condition;

    // Keep the condition in string form
    protected conditionString: string;

    // The extra condition arguments
    protected data: Json[];

    // Keep the data in strinf gorm
    protected dataString: string;

    /**
     * Creates a new instance of these settings conditions
     * @param condition The condition function to use (may not use ANY scope variables)
     * @param priority The priority of the settings set
     * @param data Any data to forward to the condition function as a third argument
     * @param disabled Whether or not these settings are disabled
     */
    constructor(
        condition: Condition | string,
        priority: number,
        data: Json[] = [],
        disabled: boolean = false
    ) {
        super(priority, disabled);

        // Get the string format of the conditon
        this.conditionString =
            condition &&
            (typeof condition == "string" ? condition : condition.toString());

        // Make sure to remove any and all scopes
        this.condition = condition && eval("(" + this.conditionString + ")");

        // Store the data
        this.data = data;
        this.dataString = JSON.stringify(data);
    }

    // Serialization
    /** @override */
    public static deserialize(
        data: Json,
        priority: number,
        disabled: boolean
    ): SettingsConditions {
        const fData: any = data || {condition: undefined, data: undefined};
        return new FunctionSettingsConditions(
            fData.condition,
            priority,
            fData.data,
            disabled
        );
    }

    /** @override */
    public serialize(): Json {
        return {condition: this.conditionString, data: this.data};
    }

    // Usage methods

    /** @override */
    public matches(module: ParameterizedModule): boolean {
        return (
            !this.condition ||
            this.condition(module.getRequest(), module.getClass(), this.data)
        );
    }

    /** @override */
    public equals(condition: SettingsConditions): boolean {
        // Check if the passed condition is not present, and this doesn't contain a condition either
        if (condition == undefined) return this.condition == undefined;

        // Make sure that the contion is of the same type
        if (!(condition instanceof FunctionSettingsConditions)) return false;

        // Or both have the same condition, priority and data
        return (
            condition.conditionString == this.conditionString &&
            condition.dataString == this.dataString &&
            condition.getPriority() == this.getPriority() &&
            condition.isDisabled() == this.isDisabled()
        );
    }
}
