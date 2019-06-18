import {Registry} from "@adjust/gui";
import {PublicModuleMethods} from "@adjust/gui/types";

export type Singleton = {
    setText(text: string): Promise<void>;
} & PublicModuleMethods;
export type SingletonParent = {};
export type SingletonContract = {
    parent: SingletonParent;
    child: Singleton;
    data: {
        text: string;
    };
};

// Export the interfaceID type
export const SingletonID = Registry.createInterfaceID<SingletonContract>(__filename);
