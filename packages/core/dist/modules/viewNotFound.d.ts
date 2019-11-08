/// <reference types="react" />
import { ViewNotFound } from "./viewNotFound.type";
export declare const viewNotFoundConfig: {
    state: {};
    getPriority: () => number;
    settings: {};
    type: import("../registry/_types/contractID").ContractID<import("./viewNotFound.type").ViewNotFoundContract>;
};
declare const ViewNotFoundModule_base: import("../module/_types/extendedModule").ExtendedModuleClass<{
    state: {};
    getPriority: () => number;
    settings: {};
    type: import("../registry/_types/contractID").ContractID<import("./viewNotFound.type").ViewNotFoundContract>;
}, import("../utils/_types/standardTypes").ExtendsClass<typeof import("..").Module, import("..").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, import("../storage/settings/_types/settingsConfig").SettingsConfig<import("../utils/_types/standardTypes").Empty>, import("../module/_types/moduleContract").ModuleContract>>>;
/**
 * This module is automatically added by the window manager to ensure some ViewNotFound module exists
 */
export declare class ViewNotFoundModule extends ViewNotFoundModule_base implements ViewNotFound {
    /** @override */
    protected onInit(): Promise<void>;
}
export default ViewNotFoundModule;
declare const ViewNotFoundView_base: import("../module/_types/extendedModuleView").ExtendedModuleViewClass<typeof ViewNotFoundModule, {}, import("../utils/_types/standardTypes").ExtendsClass<typeof import("..").ModuleView, import("..").ModuleView<{}, {}, import("..").Module<import("../module/_types/moduleState").ModuleState, import("../storage/settings/_types/settingsConfig").SettingsConfig<any>, import("../module/_types/moduleContract").ModuleContract>, {}>>>;
/**
 * A reference to ViewNotFoundModule is hardcoded into moduleView's props,
 * such that `target` is only available to views of classes that extend ViewNotFoundModule.
 * So be sure to extend this class if you are implementing the ViewNotFound contract in order to get proper intellisense
 */
export declare class ViewNotFoundView extends ViewNotFoundView_base {
    protected renderView(): JSX.Element;
}
