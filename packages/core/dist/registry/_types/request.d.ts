import { InterfaceID } from "./interfaceID";
import { IfRequired } from "../../utils/_types/standardTypes";
import { ModuleInterface } from "../../module/_types/moduleInterface";
import { ParameterizedModule } from "../../module/module";
import { RequestFilter } from "./requestFilter";
/**
 * A version of the request where the parent doesn't have to be provided, because it will be provided by someone else
 */
export declare type ParentlessRequest<M extends ModuleInterface> = {
    type: InterfaceID<M>;
    use?: "all" | "one" | RequestFilter<M>;
    data?: M["data"];
    openView?: boolean;
} & (IfRequired<"data", M, M["data"]>);
/**
 * The format for requesting a module
 */
export declare type Request<M extends ModuleInterface> = {
    parent: M["parent"];
} & ParentlessRequest<M>;
export declare type ParameterizedRequest = Request<ModuleInterface>;
/**
 * The normalized version of the request
 */
export declare type NormalizedRequest<M extends ModuleInterface> = Required<Request<M>> & {
    parent: ParameterizedModule;
};
