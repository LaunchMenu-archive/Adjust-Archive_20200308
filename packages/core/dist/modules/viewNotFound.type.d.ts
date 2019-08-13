import { ChildModule, ParentModule } from "../module/_types/moduleContract";
/**
 * A module that will be instanciated by the windowManager once
 * and is used as a view for any module that has no view of its own.
 *
 */
export declare type ViewNotFound = ChildModule<{}>;
export declare type ViewNotFoundParent = ParentModule<{}>;
export declare type ViewNotFoundContract = {
    parent: ViewNotFoundParent;
    child: ViewNotFound;
};
export declare const ViewNotFoundType: import("../registry/_types/contractID").ContractID<ViewNotFoundContract>;
