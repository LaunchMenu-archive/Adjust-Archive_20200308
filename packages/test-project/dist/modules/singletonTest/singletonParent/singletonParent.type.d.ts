import { PublicModuleMethods } from "@adjust/gui/types";
export declare type SingletonParent = {} & PublicModuleMethods;
export declare type SingletonParentParent = {};
export declare type SingletonParentContract = {
    parent: SingletonParentParent;
    child: SingletonParent;
    data: {
        count: number;
    };
};
export declare const SingletonParentID: import("@adjust/gui/types").InterfaceID<SingletonParentContract>;
