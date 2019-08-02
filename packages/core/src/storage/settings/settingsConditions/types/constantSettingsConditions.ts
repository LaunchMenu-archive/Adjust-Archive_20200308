import {SettingsConditions} from "../abstractSettingsConditions";
import {Json} from "../../../../utils/_types/standardTypes";
import {ParameterizedModule} from "../../../../module/module";
import {ExtendedObject} from "../../../../utils/extendedObject";

export class ConstantSettingsConditions extends SettingsConditions {
    // The name to be used in serialization
    public static typeName = "constant";

    /**
     * Creates a new instance of these settings conditions
     * @param priority The priority of the settings set
     * @param disabled Whether or not these settings are disabled
     */
    constructor(priority: number, disabled: boolean = false) {
        super(priority, disabled);
    }

    // Serialization
    /** @override */
    public static deserialize(
        data: Json,
        priority: number,
        disabled: boolean
    ): SettingsConditions {
        return new ConstantSettingsConditions(priority, disabled);
    }

    /** @override */
    public serialize(): Json {
        return undefined;
    }

    // Usage methods
    /** @override */
    public matches(module: ParameterizedModule): boolean {
        return true;
    }

    /** @override */
    public equals(condition: SettingsConditions): boolean {
        // Check if the passed condition is not present, and this doesn't contain a real condition either
        if (condition == undefined && this.getPriority() == 0) return true;

        // Make sure that the contion is of the same type
        if (!(condition instanceof ConstantSettingsConditions)) return false;

        // Or both have the same condition, priority and data
        return (
            condition.getPriority() == this.getPriority() &&
            condition.isDisabled() == this.isDisabled()
        );
    }
}
