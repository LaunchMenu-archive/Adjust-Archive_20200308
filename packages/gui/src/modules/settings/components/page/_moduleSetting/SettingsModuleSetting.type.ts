import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";

export type SettingsModuleSetting = ChildModule<{}>;
export type SettingsModuleSettingParent = ParentModule<{}>;
export type SettingsModuleSettingContract = {
    parent: SettingsModuleSettingParent;
    child: SettingsModuleSetting;
};

export const SettingsModuleSettingType = Registry.createContractID<
    SettingsModuleSettingContract
>(__filename);
