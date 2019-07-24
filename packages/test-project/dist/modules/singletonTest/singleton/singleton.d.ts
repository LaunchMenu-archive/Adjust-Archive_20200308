/// <reference types="react" />
import { Singleton } from "./singleton.type";
export declare const config: {
    initialState: {
        text: string;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./singleton.type").SingletonContract>;
};
declare const SingletonModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        text: string;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./singleton.type").SingletonContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").Module, import("@adjust/gui").Module>>;
export default class SingletonModule extends SingletonModule_base implements Singleton {
    /** @override */
    onInit(): Promise<void>;
    /** @override */
    onReloadInit(): Promise<void>;
    /** @override */
    onStop(): Promise<void>;
    /** @override */
    setText(text: string): Promise<void>;
}
declare const SingletonView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SingletonModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").ModuleView, import("@adjust/gui").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig, import("@adjust/core/types").ModuleInterface>, {}>>>;
export declare class SingletonView extends SingletonView_base {
    protected renderView(): JSX.Element;
}
export {};
