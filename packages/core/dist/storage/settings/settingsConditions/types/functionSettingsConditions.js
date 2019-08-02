Object.defineProperty(exports, "__esModule", { value: true });
const abstractSettingsConditions_1 = require("../abstractSettingsConditions");
/*
 TODO: finish class:
    - Typescript support,
    - Allow listening to target's state and update whether applicable based on that (complex)
 */
class FunctionSettingsConditions extends abstractSettingsConditions_1.SettingsConditions {
    /**
     * Creates a new instance of these settings conditions
     * @param condition The condition function to use (may not use ANY scope variables)
     * @param priority The priority of the settings set
     * @param data Any data to forward to the condition function as a third argument
     * @param disabled Whether or not these settings are disabled
     */
    constructor(condition, priority, data = [], disabled = false) {
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
    static deserialize(data, priority, disabled) {
        const fData = data || { condition: undefined, data: undefined };
        return new FunctionSettingsConditions(fData.condition, priority, fData.data, disabled);
    }
    /** @override */
    serialize() {
        return { condition: this.conditionString, data: this.data };
    }
    // Usage methods
    /** @override */
    matches(module) {
        return (!this.condition ||
            this.condition(module.getRequest(), module.getClass(), this.data));
    }
    /** @override */
    equals(condition) {
        // Check if the passed condition is not present, and this doesn't contain a condition either
        if (condition == undefined)
            return this.condition == undefined;
        // Make sure that the contion is of the same type
        if (!(condition instanceof FunctionSettingsConditions))
            return false;
        // Or both have the same condition, priority and data
        return (condition.conditionString == this.conditionString &&
            condition.dataString == this.dataString &&
            condition.getPriority() == this.getPriority() &&
            condition.isDisabled() == this.isDisabled());
    }
}
// The name to be used in serialization
FunctionSettingsConditions.typeName = "function";
exports.FunctionSettingsConditions = FunctionSettingsConditions;
//# sourceMappingURL=functionSettingsConditions.js.map