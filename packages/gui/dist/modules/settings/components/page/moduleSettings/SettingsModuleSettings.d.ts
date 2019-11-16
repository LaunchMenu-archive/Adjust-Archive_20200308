import { SettingsModuleSettings } from "./SettingsModuleSettings.type";
declare const SettingsModuleSettingsModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsModuleSettings.type").SettingsModuleSettingsContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsModuleSettingsModule extends SettingsModuleSettingsModule_base implements SettingsModuleSettings {
}
export default SettingsModuleSettingsModule;
declare const SettingsModuleSettingsView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsModuleSettingsModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class SettingsModuleSettingsView extends SettingsModuleSettingsView_base {
}
