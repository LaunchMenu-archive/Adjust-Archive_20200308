import { ContractID } from "./contractID";
import { IfRequired } from "../../utils/_types/standardTypes";
import { ModuleContract } from "../../module/_types/moduleContract";
import { ParameterizedModule } from "../../module/module";
import { RequestFilter } from "./requestFilter";
/**
 * A version of the request where the parent doesn't have to be provided, because it will be provided by someone else
 */
export declare type ParentlessRequest<M extends ModuleContract> = {
    type: ContractID<M>;
    use?: "all" | "one" | RequestFilter<M>;
    data?: M["data"];
    openView?: boolean;
} & (IfRequired<"data", M, M["data"]>);
/**
 * The format for requesting a module
 */
export declare type Request<M extends ModuleContract> = {
    parent: M["parent"];
} & ParentlessRequest<M>;
export declare type ParameterizedRequest = Request<ModuleContract>;
/**
 * The normalized version of the request
 */
export declare type NormalizedRequest<M extends ModuleContract> = Required<Request<M>> & {
    parent: ParameterizedModule;
};
