import { ChildModule, ParentModule } from "../module/_types/moduleContract";
/**
 * A module that will be instanciated by the windowManager once
 * and is used to provide a context for any module views down the line.
 */
export declare type ContextProvider = ChildModule<{}>;
export declare type ContextProviderParent = ParentModule<{}>;
export declare type ContextProviderContract = {
    parent: ContextProviderParent;
    child: ContextProvider;
};
export declare const ContextProviderType: import("../registry/_types/contractID").ContractID<ContextProviderContract>;
