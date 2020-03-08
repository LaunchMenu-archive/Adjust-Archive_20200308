import { ChildModule, ParentModule } from "@adjust/gui/types";
export declare type SingletonParent = ChildModule<{}>;
export declare type SingletonParentParent = ParentModule<{}>;
export declare type SingletonParentContract = {
    parent: SingletonParentParent;
    child: SingletonParent;
    data: {
        count: number;
    };
};
export declare const SingletonParentType: import("@adjust/gui/types").ContractID<SingletonParentContract>;
