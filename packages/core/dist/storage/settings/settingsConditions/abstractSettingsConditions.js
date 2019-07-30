Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An abstract class to represent settings conditions
 */
class SettingsConditions {
    /**
     * Constructs an instance of these settings conditions
     * @param priority The priority of the settings set
     */
    constructor(priority) {
        this.priority = priority;
    }
    // Serialization
    /**
     * Creates an instance of this class, given it's serialized data
     * @param data The data to deserialize
     * @param priority The priority of the setting
     */
    static deserialize(data, priority) {
        throw Error("This method hasn't been implemented yet by child class");
    }
    // Usage methods
    /**
     * Retrieves the prioerity of the condition
     * @returns The priority
     */
    getPriority() {
        return this.priority;
    }
}
// The name to be used in serialization
SettingsConditions.typeName = "abstract";
exports.SettingsConditions = SettingsConditions;
//# sourceMappingURL=abstractSettingsConditions.js.map