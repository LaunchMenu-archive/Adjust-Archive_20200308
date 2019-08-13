import {Registry} from "@adjust/gui";
import {ChildModule, ParentModule} from "@adjust/gui/types";

export type Singleton = ChildModule<{
    setText(text: string): Promise<void>;
}>;
export type SingletonParent = ParentModule<{}>;
export type SingletonContract = {
    parent: SingletonParent;
    child: Singleton;
    data: {
        text: string;
    };
};

// Export the interfaceID type
export const SingletonType = Registry.createContractID<SingletonContract>(__filename);
