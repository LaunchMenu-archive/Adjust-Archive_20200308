import {Registry} from "../registry/registry";
import {ChildModule, ParentModule} from "../module/_types/moduleContract";

/**
 * A module that will be instanciated by the windowManager once
 * and is used as a view for any module that has no view of its own.
 *
 */
export type ViewNotFound = ChildModule<{}>;
export type ViewNotFoundParent = ParentModule<{}>;
export type ViewNotFoundContract = {
    parent: ViewNotFoundParent;
    child: ViewNotFound;
};

// Export the interfaceID type
export const ViewNotFoundID = Registry.createContractID<ViewNotFoundContract>(__filename);
