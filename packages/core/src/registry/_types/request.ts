import {ContractID, ParameterizedContractID} from "./contractID";
import {IfRequired, Omit} from "../../utils/_types/standardTypes";
import {AbstractModuleProvider} from "../moduleProviders/abstractModuleProvider";
import {ModuleContract} from "../../module/_types/moduleContract";
import {ParameterizedModule} from "../../module/module";
import {RequestFilter} from "./requestFilter";

/**
 * A version of the request where the parent doesn't have to be provided, because it will be provided by someone else
 */
// prettier-ignore
export type ParentlessRequest<M extends ModuleContract> = 
{
    type: ContractID<M>; // The type of the module that we are requesting
    use?: "all" | "one" | RequestFilter<M>; // What modules to use to answer the request
    data?: M["data"];  // The data the interface specific data
    openView?: boolean;
} & (IfRequired<"data", M, M["data"]>);

/**
 * The format for requesting a module
 */

export type Request<M extends ModuleContract> = {
    parent: M["parent"]; // The parent that will receive responses
} & ParentlessRequest<M>;
export type ParameterizedRequest = Request<ModuleContract>;

/**
 * The normalized version of the request
 */
export type NormalizedRequest<M extends ModuleContract> = Required<Request<M>> & {
    parent: ParameterizedModule;
};
