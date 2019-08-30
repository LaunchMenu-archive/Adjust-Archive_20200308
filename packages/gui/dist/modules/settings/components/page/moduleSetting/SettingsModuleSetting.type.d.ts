import { ChildModule, ParentModule } from "@adjust/core/types";
export declare type SettingsModuleSetting = ChildModule<{}>;
export declare type SettingsModuleSettingParent = ParentModule<{}>;
export declare type SettingsModuleSettingContract = {
    parent: SettingsModuleSettingParent;
    child: SettingsModuleSetting;
};
export declare const SettingsModuleSettingType: import("@adjust/core/types").ContractID<SettingsModuleSettingContract>;
