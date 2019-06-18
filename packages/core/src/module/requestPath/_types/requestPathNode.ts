import {Json} from "../../../utils/_types/standardTypes";
import {ParameterizedInterfaceID} from "../../../registry/_types/interfaceID";
import {ModuleID} from "../../moduleID";

/**
 * Identifies a module instance, and provides some extra data
 */
export type RequestPathNode = {
    moduleID: ModuleID; // The ID of the module of the request
    requestData: Json; // The data passed by the request
    getType: () => ParameterizedInterfaceID; // A getter to obtain the type of the module
};
