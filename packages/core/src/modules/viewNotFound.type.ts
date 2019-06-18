import {PublicModuleMethods} from "../module/_types/publicModuleMethods";
import {Registry} from "../registry/registry";

/**
 * A module that will be instanciated by the windowManager once
 * and is used as a view for any module that has no view of its own.
 *
 */
export type ViewNotFound = {} & PublicModuleMethods;
export type ViewNotFoundParent = {};
export type ViewNotFoundContract = {
    parent: ViewNotFoundParent;
    child: ViewNotFound;
};

// Export the interfaceID type
export const ViewNotFoundID = Registry.createInterfaceID<ViewNotFoundContract>(
    __filename
);
