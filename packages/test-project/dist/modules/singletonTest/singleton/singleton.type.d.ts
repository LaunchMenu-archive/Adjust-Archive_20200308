import { PublicModuleMethods } from "@adjust/gui/types";
export declare type Singleton = {
    setText(text: string): Promise<void>;
} & PublicModuleMethods;
export declare type SingletonParent = {};
export declare type SingletonContract = {
    parent: SingletonParent;
    child: Singleton;
    data: {
        text: string;
    };
};
export declare const SingletonID: import("@adjust/gui/types").InterfaceID<SingletonContract>;
