import { ChildModule, ParentModule } from "@adjust/gui/types";
export declare type Singleton = ChildModule<{
    setText(text: string): Promise<void>;
}>;
export declare type SingletonParent = ParentModule<{}>;
export declare type SingletonContract = {
    parent: SingletonParent;
    child: Singleton;
    data: {
        text: string;
    };
};
export declare const SingletonType: import("@adjust/gui/types").ContractID<SingletonContract>;
