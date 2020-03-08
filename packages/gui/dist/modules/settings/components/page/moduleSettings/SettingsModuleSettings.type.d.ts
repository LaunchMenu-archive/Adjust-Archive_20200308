import { ChildModule, ParentModule } from "@adjust/core/types";
export declare type SettingsModuleSettings = ChildModule<{}>;
export declare type SettingsModuleSettingsParent = ParentModule<{}>;
export declare type SettingsModuleSettingsContract = {
    parent: SettingsModuleSettingsParent;
    child: SettingsModuleSettings;
    data: {
        path: string;
    };
};
export declare const SettingsModuleSettingsType: import("@adjust/core/types").ContractID<SettingsModuleSettingsContract>;
