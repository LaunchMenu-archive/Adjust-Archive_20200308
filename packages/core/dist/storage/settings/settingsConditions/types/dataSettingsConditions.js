Object.defineProperty(exports, "__esModule", { value: true });
const abstractSettingsConditions_1 = require("../abstractSettingsConditions");
const extendedObject_1 = require("../../../../utils/extendedObject");
class DataSettingsConditions extends abstractSettingsConditions_1.SettingsConditions {
    /**
     * Creates a new instance of these settings conditions
     * @param data The data to check for
     * @param priority The priority of the settings set
     */
    constructor(data, priority) {
        super(priority);
        this.data = typeof data == "string" ? JSON.parse(data) : data;
        // Always stringify the data, such that formatting plays no role when using 'equals'
        this.dataString = JSON.stringify(data);
    }
    // Serialization
    /** @override */
    static deserialize(data, priority) {
        return new DataSettingsConditions(data || {}, priority);
    }
    /** @override */
    serialize() {
        return this.data;
    }
    // Usage methods
    /** @override */
    matches(module) {
        return !this.data || extendedObject_1.ExtendedObject.deepContains(module.getData(), this.data);
    }
    /** @override */
    equals(condition) {
        // Check if the passed condition is not present, and this doesn't contain a real condition either
        if (condition == undefined)
            return this.data == undefined;
        // Make sure that the contion is of the same type
        if (!(condition instanceof DataSettingsConditions))
            return false;
        // Or both have the same condition, priority and data
        return (condition.dataString == this.dataString &&
            condition.getPriority() == this.getPriority());
    }
}
// The name to be used in serialization
DataSettingsConditions.typeName = "data";
exports.DataSettingsConditions = DataSettingsConditions;
//# sourceMappingURL=dataSettingsConditions.js.map