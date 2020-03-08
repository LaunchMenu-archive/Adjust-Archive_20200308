import { ChildModule, ParentModule } from "@adjust/core/types";
export declare type SettingsTypeSettings = ChildModule<{}>;
export declare type SettingsTypeSettingsParent = ParentModule<{}>;
export declare type SettingsTypeSettingsContract = {
    parent: SettingsTypeSettingsParent;
    child: SettingsTypeSettings;
};
export declare const SettingsTypeSettingsType: import("@adjust/core/types").ContractID<SettingsTypeSettingsContract>;
