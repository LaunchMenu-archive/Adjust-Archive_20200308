Object.defineProperty(exports, "__esModule", { value: true });
const abstractSettingsConditions_1 = require("../abstractSettingsConditions");
class ConstantSettingsConditions extends abstractSettingsConditions_1.SettingsConditions {
    /**
     * Creates a new instance of these settings conditions
     * @param priority The priority of the settings set
     * @param disabled Whether or not these settings are disabled
     * @param name The name of the conditions
     */
    constructor(priority, disabled = false, name = "") {
        super(priority, disabled, name);
    }
    // Serialization
    /** @override */
    static deserialize(data, priority, disabled, name) {
        return new ConstantSettingsConditions(priority, disabled, name);
    }
    /** @override */
    serialize() {
        return undefined;
    }
    // Usage methods
    /** @override */
    matches(module) {
        return true;
    }
    /** @override */
    equals(condition) {
        // Check if the passed condition is not present, and this doesn't contain a real condition either
        if (condition == undefined && this.getPriority() == 0)
            return true;
        // Make sure that the contion is of the same type
        if (!(condition instanceof ConstantSettingsConditions))
            return false;
        // Or both have the same condition, priority and data
        return (condition.getPriority() == this.getPriority() &&
            condition.isDisabled() == this.isDisabled());
    }
}
// The name to be used in serialization
ConstantSettingsConditions.typeName = "constant";
exports.ConstantSettingsConditions = ConstantSettingsConditions;
//# sourceMappingURL=constantSettingsConditions.js.map