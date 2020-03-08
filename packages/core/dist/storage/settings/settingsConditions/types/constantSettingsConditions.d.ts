import { SettingsConditions } from "../abstractSettingsConditions";
import { Json } from "../../../../utils/_types/standardTypes";
import { ParameterizedModule } from "../../../../module/module";
export declare class ConstantSettingsConditions extends SettingsConditions {
    static typeName: string;
    /**
     * Creates a new instance of these settings conditions
     * @param priority The priority of the settings set
     * @param disabled Whether or not these settings are disabled
     * @param name The name of the conditions
     */
    constructor(priority: number, disabled?: boolean, name?: string);
    /** @override */
    static deserialize(data: Json, priority: number, disabled: boolean, name: string): SettingsConditions;
    /** @override */
    serialize(): Json;
    /** @override */
    matches(module: ParameterizedModule): boolean;
    /** @override */
    equals(condition: SettingsConditions): boolean;
}
