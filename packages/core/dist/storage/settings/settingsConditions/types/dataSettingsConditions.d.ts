import { SettingsConditions } from "../abstractSettingsConditions";
import { Json } from "../../../../utils/_types/standardTypes";
import { ParameterizedModule } from "../../../../module/module";
export declare class DataSettingsConditions extends SettingsConditions {
    static typeName: string;
    protected data: {
        [key: string]: Json;
    };
    protected dataString: string;
    /**
     * Creates a new instance of these settings conditions
     * @param data The data to check for
     * @param priority The priority of the settings set
     */
    constructor(data: {
        [key: string]: Json;
    } | string, priority: number);
    /** @override */
    static deserialize(data: Json, priority: number): SettingsConditions;
    /** @override */
    serialize(): Json;
    /** @override */
    matches(module: ParameterizedModule): boolean;
    /** @override */
    equals(condition: SettingsConditions): boolean;
}
