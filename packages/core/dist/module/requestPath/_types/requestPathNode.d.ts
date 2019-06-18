import { Json } from "../../../utils/_types/standardTypes";
import { ParameterizedInterfaceID } from "../../../registry/_types/interfaceID";
import { ModuleID } from "../../moduleID";
/**
 * Identifies a module instance, and provides some extra data
 */
export declare type RequestPathNode = {
    moduleID: ModuleID;
    requestData: Json;
    getType: () => ParameterizedInterfaceID;
};
