import { ParameterizedModule } from "../../module/module";
import { Condition } from "./_types/condition";
export declare class SettingsConditions {
    protected priority: number;
    protected condition: Condition;
    protected conditionString: string;
    constructor(condition: Condition | string, priority: number);
    matches(object: ParameterizedModule): boolean;
    equals(condition: SettingsConditions): boolean;
    getData(): string;
    getPriority(): number;
}
