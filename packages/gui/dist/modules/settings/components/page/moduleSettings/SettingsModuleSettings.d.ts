import { SettingsModuleSettings } from "./SettingsModuleSettings.type";
declare const SettingsModuleSettingsModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsModuleSettings.type").SettingsModuleSettingsContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsModuleSettingsModule extends SettingsModuleSettingsModule_base implements SettingsModuleSettings {
}
export default SettingsModuleSettingsModule;
declare const SettingsModuleSettingsView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsModuleSettingsModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig<any>, import("@adjust/core/types").ModuleContract>, {}>>>;
export declare class SettingsModuleSettingsView extends SettingsModuleSettingsView_base {
}
