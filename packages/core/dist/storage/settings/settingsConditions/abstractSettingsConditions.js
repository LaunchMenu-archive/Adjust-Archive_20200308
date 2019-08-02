Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An abstract class to represent settings conditions
 */
class SettingsConditions {
    /**
     * Constructs an instance of these settings conditions
     * @param priority The priority of the settings set
     * @param disabled Whether or not the settings are disabled
     */
    constructor(priority, disabled = false) {
        // Whether or not the settings are disabled
        this.disabled = false;
        this.priority = priority;
        this.disabled = disabled;
    }
    // Serialization
    /**
     * Creates an instance of this class, given it's serialized data
     * @param data The data to deserialize
     * @param priority The priority of the setting
     */
    static deserialize(data, priority, disabled) {
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
    /**
     * Retrieves whether or not the settings are disabled
     * @returns Whether they are disabled
     */
    isDisabled() {
        return this.disabled;
    }
}
// The name to be used in serialization
SettingsConditions.typeName = "abstract";
exports.SettingsConditions = SettingsConditions;
//# sourceMappingURL=abstractSettingsConditions.js.map