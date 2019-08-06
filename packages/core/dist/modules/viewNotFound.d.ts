/// <reference types="react" />
import { ViewNotFound } from "./viewNotFound.type";
export declare const config: {
    initialState: {};
    getPriority: () => number;
    settings: {};
    type: import("../registry/_types/interfaceID").InterfaceID<import("./viewNotFound.type").ViewNotFoundContract>;
};
declare const ViewNotFoundModule_base: import("../module/_types/extendedModule").ExtendedModuleClass<{
    initialState: {};
    getPriority: () => number;
    settings: {};
    type: import("../registry/_types/interfaceID").InterfaceID<import("./viewNotFound.type").ViewNotFoundContract>;
}, import("../utils/_types/standardTypes").ExtendsClass<typeof import("..").Module, import("..").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, import("../storage/settings/_types/settingsConfig").SettingsConfig<{}>, import("../module/_types/moduleInterface").ModuleInterface>>>;
/**
 * This module is automatically added by the window manager to ensure some ViewNotFound module exists
 */
export default class ViewNotFoundModule extends ViewNotFoundModule_base implements ViewNotFound {
    /** @override */
    protected onInit(): Promise<void>;
    /** @override */
    protected onReloadInit(): Promise<void>;
}
declare const ViewNotFoundView_base: import("../module/_types/extendedModuleView").ExtendedModuleViewClass<typeof ViewNotFoundModule, {}, import("../utils/_types/standardTypes").ExtendsClass<typeof import("..").ModuleView, import("..").ModuleView<{}, {}, import("..").Module<import("../module/_types/moduleState").ModuleState, import("../storage/settings/_types/settingsConfig").SettingsConfig<{}>, import("../module/_types/moduleInterface").ModuleInterface>, {}>>>;
/**
 * A reference to ViewNotFoundModule is hardcoded into moduleView's props,
 * such that `target` is only available to views of classes that extend ViewNotFoundModule.
 * So be sure to extend this class if you are implementing the ViewNotFound contract in order to get proper intellisense
 */
export declare class ViewNotFoundView extends ViewNotFoundView_base {
    protected renderView(): JSX.Element;
}
export {};
