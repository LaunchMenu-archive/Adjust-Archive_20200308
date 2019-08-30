import { SettingsPage } from "./SettingsPage.type";
declare const SettingsPageModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsPage.type").SettingsPageContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../..").Module, import("../../../..").Module>>;
export declare class SettingsPageModule extends SettingsPageModule_base implements SettingsPage {
}
export default SettingsPageModule;
declare const SettingsPageView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsPageModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../..").ModuleView, import("../../../..").ModuleView<{}, {}, import("../../../..").Module, {}>>>;
export declare class SettingsPageView extends SettingsPageView_base {
}
