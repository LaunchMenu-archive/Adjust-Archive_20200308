import { SettingsTypeSettings } from "./SettingsTypeSettings.type";
declare const SettingsTypeSettingsModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsTypeSettings.type").SettingsTypeSettingsContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsTypeSettingsModule extends SettingsTypeSettingsModule_base implements SettingsTypeSettings {
}
export default SettingsTypeSettingsModule;
declare const SettingsTypeSettingsView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsTypeSettingsModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class SettingsTypeSettingsView extends SettingsTypeSettingsView_base {
}
