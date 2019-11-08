import { SettingsSearchBar } from "./SettingsSearchBar.type";
declare const SettingsSearchBarModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsSearchBar.type").SettingsSearchBarContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../..").Module, import("../../..").Module>>;
export declare class SettingsSearchBarModule extends SettingsSearchBarModule_base implements SettingsSearchBar {
}
export default SettingsSearchBarModule;
declare const SettingsSearchBarView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsSearchBarModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../..").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig<any>, import("@adjust/core/types").ModuleContract>, {}>>>;
export declare class SettingsSearchBarView extends SettingsSearchBarView_base {
}
