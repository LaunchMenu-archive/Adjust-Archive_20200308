import {Registry} from "@adjust/gui";
import {ChildModule, ParentModule} from "@adjust/gui/types";

export type SingletonParent = ChildModule<{}>;
export type SingletonParentParent = ParentModule<{}>;
export type SingletonParentContract = {
    parent: SingletonParentParent;
    child: SingletonParent;
    data: {
        count: number;
    };
};

// Export the type
export const SingletonParentType = Registry.createContractID<SingletonParentContract>(
    __filename
);
