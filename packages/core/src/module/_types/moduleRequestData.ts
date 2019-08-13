import {RequestPath} from "../requestPath/requestPath";
import {ModuleContract} from "./moduleContract";

/**
 * An interface that contains all required outside data for a Module
 */
export type ModuleRequestData<I extends ModuleContract> = {
    requestPath: RequestPath;
    data: I["data"];
    openView?: boolean;
};

/**
 * An interface that contains all required outside data for a Module, with a interface paramter provided
 */
export type ParameterizedModuleRequestData = ModuleRequestData<ModuleContract>;
