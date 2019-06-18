import {ParameterizedModule} from "../../module/module";
import {Condition} from "./_types/condition";

/*
 TODO: finish class: 
    - Potential typescript support,
    - Genecic Target type (so its state can be used)
    - Different Condition signature to block direct access to the full target
    - Comments, 
 */
export class SettingsConditions {
    protected priority: number;
    protected condition: Condition;
    protected conditionString: string;

    constructor(condition: Condition | string, priority: number) {
        if (typeof condition == "string") {
            this.conditionString = condition;
            this.condition = eval("(" + this.conditionString + ")");
        } else {
            this.condition = condition;
            this.conditionString = condition && condition.toString();
        }
        this.priority = priority;
    }

    // TODO: replace dummy methods
    matches(object: ParameterizedModule) {
        return !this.condition || this.condition(object);
    }
    equals(condition: SettingsConditions) {
        return (
            (this.condition == undefined && condition == undefined) ||
            (condition &&
                condition.getData() == this.getData() &&
                condition.getPriority() == this.getPriority())
        );
    }

    getData() {
        return this.conditionString;
    }
    getPriority() {
        return this.priority;
    }
}
