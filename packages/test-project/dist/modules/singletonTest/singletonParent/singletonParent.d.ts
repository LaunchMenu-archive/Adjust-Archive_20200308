/// <reference types="react" />
import { Singleton } from "../singleton/singleton.type";
import { SingletonParent } from "./singletonParent.type";
export declare const config: {
    initialState: {
        singleton: Singleton;
        child: import("@adjust/core/types").PublicModuleMethods;
        text: string;
    };
    settings: {};
    location: string;
    defineLocation: {
        ID: string;
        hints: {
            window: {
                ID: string;
            };
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./singletonParent.type").SingletonParentContract>;
};
declare const SingletonParentModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        singleton: Singleton;
        child: import("@adjust/core/types").PublicModuleMethods;
        text: string;
    };
    settings: {};
    location: string;
    defineLocation: {
        ID: string;
        hints: {
            window: {
                ID: string;
            };
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./singletonParent.type").SingletonParentContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").Module, import("@adjust/gui").Module>>;
export default class SingletonParentModule extends SingletonParentModule_base implements SingletonParent {
    onInit(): Promise<void>;
    createChild(): Promise<void>;
    changeText(): void;
    closeSingleton(): Promise<void>;
}
declare const SingletonParentView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SingletonParentModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").ModuleView, import("@adjust/gui").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig, import("@adjust/core/types").ModuleInterface>, {}>>>;
export declare class SingletonParentView extends SingletonParentView_base {
    protected renderView(): JSX.Element;
}
export {};
