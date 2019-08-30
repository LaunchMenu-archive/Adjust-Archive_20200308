import { SettingsSearchBar } from "./SettingsSearchBar.type";
declare const SettingsSearchBarModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsSearchBar.type").SettingsSearchBarContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../..").Module, import("../../..").Module>>;
export declare class SettingsSearchBarModule extends SettingsSearchBarModule_base implements SettingsSearchBar {
}
export default SettingsSearchBarModule;
declare const SettingsSearchBarView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsSearchBarModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../..").ModuleView, import("../../..").ModuleView<{}, {}, import("../../..").Module, {}>>>;
export declare class SettingsSearchBarView extends SettingsSearchBarView_base {
}
