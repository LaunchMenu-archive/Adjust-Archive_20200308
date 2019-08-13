import {Registry} from "../registry/registry";
import {ChildModule, ParentModule} from "../module/_types/moduleContract";

/**
 * A module that will be instanciated by the windowManager once
 * and is used to provide a context for any module views down the line.
 */
export type ContextProvider = ChildModule<{}>;
export type ContextProviderParent = ParentModule<{}>;
export type ContextProviderContract = {
    parent: ContextProviderParent;
    child: ContextProvider;
};

// Export the interfaceID type
export const ContextProviderType = Registry.createContractID<ContextProviderContract>(
    __filename
);
