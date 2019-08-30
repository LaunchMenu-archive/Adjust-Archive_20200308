import { ChildModule, ParentModule } from "@adjust/core/types";
export declare type SettingsModuleSettingsCategory = ChildModule<{}>;
export declare type SettingsModuleSettingsCategoryParent = ParentModule<{}>;
export declare type SettingsModuleSettingsCategoryContract = {
    parent: SettingsModuleSettingsCategoryParent;
    child: SettingsModuleSettingsCategory;
};
export declare const SettingsModuleSettingsCategoryType: import("@adjust/core/types").ContractID<SettingsModuleSettingsCategoryContract>;
