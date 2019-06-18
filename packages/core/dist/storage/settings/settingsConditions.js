Object.defineProperty(exports, "__esModule", { value: true });
/*
 TODO: finish class:
    - Potential typescript support,
    - Genecic Target type (so its state can be used)
    - Different Condition signature to block direct access to the full target
    - Comments,
 */
class SettingsConditions {
    constructor(condition, priority) {
        if (typeof condition == "string") {
            this.conditionString = condition;
            this.condition = eval("(" + this.conditionString + ")");
        }
        else {
            this.condition = condition;
            this.conditionString = condition && condition.toString();
        }
        this.priority = priority;
    }
    // TODO: replace dummy methods
    matches(object) {
        return !this.condition || this.condition(object);
    }
    equals(condition) {
        return ((this.condition == undefined && condition == undefined) ||
            (condition &&
                condition.getData() == this.getData() &&
                condition.getPriority() == this.getPriority()));
    }
    getData() {
        return this.conditionString;
    }
    getPriority() {
        return this.priority;
    }
}
exports.SettingsConditions = SettingsConditions;
//# sourceMappingURL=settingsConditions.js.map