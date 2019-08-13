import {Json} from "../../../utils/_types/standardTypes";
import {ParameterizedContractID} from "../../../registry/_types/contractID";
import {ModuleID} from "../../moduleID";

/**
 * Identifies a module instance, and provides some extra data
 */
export type RequestPathNode = {
    moduleID: ModuleID; // The ID of the module of the request
    requestData: Json; // The data passed by the request
    getType: () => ParameterizedContractID; // A getter to obtain the type of the module
};
