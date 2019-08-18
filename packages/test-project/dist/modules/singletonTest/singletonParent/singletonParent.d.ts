/// <reference types="react" />
import { SingletonParent } from "./singletonParent.type";
export declare const config: {
    initialState: {
        singleton: import("@adjust/core/types").ChildModule<{
            setText(text: string): Promise<void>;
        }>;
        child: {
            close(): Promise<void>;
        };
        text: string;
    };
    settings: {};
    location: string;
    defineLocation: {
        ID: string;
        hints: {
            window: {
                sameAs: string;
            };
            tab: {
                after: string;
                ID: string;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./singletonParent.type").SingletonParentContract>;
};
declare const SingletonParentModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        singleton: import("@adjust/core/types").ChildModule<{
            setText(text: string): Promise<void>;
        }>;
        child: {
            close(): Promise<void>;
        };
        text: string;
    };
    settings: {};
    location: string;
    defineLocation: {
        ID: string;
        hints: {
            window: {
                sameAs: string;
            };
            tab: {
                after: string;
                ID: string;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./singletonParent.type").SingletonParentContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").Module, import("@adjust/gui").Module>>;
export default class SingletonParentModule extends SingletonParentModule_base implements SingletonParent {
    onInit(): Promise<void>;
    createChild(): Promise<void>;
    changeText(): void;
    closeSingleton(): Promise<void>;
}
declare const SingletonParentView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SingletonParentModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").ModuleView, import("@adjust/gui").ModuleView<{}, {}, import("@adjust/gui").Module, {}>>>;
export declare class SingletonParentView extends SingletonParentView_base {
    protected renderView(): JSX.Element;
}
export {};
