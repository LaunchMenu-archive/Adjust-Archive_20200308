import { SettingsModuleSetting } from "./SettingsModuleSetting.type";
declare const SettingsModuleSettingModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsModuleSetting.type").SettingsModuleSettingContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsModuleSettingModule extends SettingsModuleSettingModule_base implements SettingsModuleSetting {
}
export default SettingsModuleSettingModule;
declare const SettingsModuleSettingView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsModuleSettingModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class SettingsModuleSettingView extends SettingsModuleSettingView_base {
}
