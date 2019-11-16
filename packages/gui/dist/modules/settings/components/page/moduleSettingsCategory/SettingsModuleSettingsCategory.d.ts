import { SettingsModuleSettingsCategory } from "./SettingsModuleSettingsCategory.type";
declare const SettingsModuleSettingsCategoryModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsModuleSettingsCategory.type").SettingsModuleSettingsCategoryContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsModuleSettingsCategoryModule extends SettingsModuleSettingsCategoryModule_base implements SettingsModuleSettingsCategory {
}
export default SettingsModuleSettingsCategoryModule;
declare const SettingsModuleSettingsCategoryView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsModuleSettingsCategoryModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class SettingsModuleSettingsCategoryView extends SettingsModuleSettingsCategoryView_base {
}
