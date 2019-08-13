import { Json } from "../../../utils/_types/standardTypes";
import { ParameterizedContractID } from "../../../registry/_types/contractID";
import { ModuleID } from "../../moduleID";
/**
 * Identifies a module instance, and provides some extra data
 */
export declare type RequestPathNode = {
    moduleID: ModuleID;
    requestData: Json;
    getType: () => ParameterizedContractID;
};
