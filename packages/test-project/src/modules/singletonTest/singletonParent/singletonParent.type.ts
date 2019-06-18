import {Registry} from "@adjust/gui";
import {PublicModuleMethods} from "@adjust/gui/types";

export type SingletonParent = {} & PublicModuleMethods;
export type SingletonParentParent = {};
export type SingletonParentContract = {
    parent: SingletonParentParent;
    child: SingletonParent;
    data: {
        count: number;
    };
};

// Export the interfaceID type
export const SingletonParentID = Registry.createInterfaceID<SingletonParentContract>(
    __filename
);
