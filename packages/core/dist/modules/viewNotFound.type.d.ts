import { PublicModuleMethods } from "../module/_types/publicModuleMethods";
/**
 * A module that will be instanciated by the windowManager once
 * and is used as a view for any module that has no view of its own.
 *
 */
export declare type ViewNotFound = {} & PublicModuleMethods;
export declare type ViewNotFoundParent = {};
export declare type ViewNotFoundContract = {
    parent: ViewNotFoundParent;
    child: ViewNotFound;
};
export declare const ViewNotFoundID: import("../registry/_types/interfaceID").InterfaceID<ViewNotFoundContract>;
