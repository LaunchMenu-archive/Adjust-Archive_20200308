import { ChildModule, ParentModule } from "@adjust/core/types";
export declare type SettingsPage = ChildModule<{}>;
export declare type SettingsPageParent = ParentModule<{}>;
export declare type SettingsPageContract = {
    parent: SettingsPageParent;
    child: SettingsPage;
};
export declare const SettingsPageType: import("@adjust/core/types").ContractID<SettingsPageContract>;
