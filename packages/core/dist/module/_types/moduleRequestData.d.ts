import { RequestPath } from "../requestPath/requestPath";
import { ModuleInterface } from "./moduleInterface";
/**
 * An interface that contains all required outside data for a Module
 */
export declare type ModuleRequestData<I extends ModuleInterface> = {
    requestPath: RequestPath;
    data: I["data"];
    openView?: boolean;
};
/**
 * An interface that contains all required outside data for a Module, with a interface paramter provided
 */
export declare type ParameterizedModuleRequestData = ModuleRequestData<ModuleInterface>;
