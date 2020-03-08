import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";

export type SettingsModuleSettings = ChildModule<{}>;
export type SettingsModuleSettingsParent = ParentModule<{}>;
export type SettingsModuleSettingsContract = {
    parent: SettingsModuleSettingsParent;
    child: SettingsModuleSettings;
    data: {
        // The file path of the module
        path: string;
    };
};

export const SettingsModuleSettingsType = Registry.createContractID<
    SettingsModuleSettingsContract
>(__filename);
