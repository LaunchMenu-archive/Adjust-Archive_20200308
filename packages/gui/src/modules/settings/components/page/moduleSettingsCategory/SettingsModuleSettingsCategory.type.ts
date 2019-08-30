import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";

export type SettingsModuleSettingsCategory = ChildModule<{}>;
export type SettingsModuleSettingsCategoryParent = ParentModule<{}>;
export type SettingsModuleSettingsCategoryContract = {
    parent: SettingsModuleSettingsCategoryParent;
    child: SettingsModuleSettingsCategory;
};

export const SettingsModuleSettingsCategoryType = Registry.createContractID<
    SettingsModuleSettingsCategoryContract
>(__filename);
