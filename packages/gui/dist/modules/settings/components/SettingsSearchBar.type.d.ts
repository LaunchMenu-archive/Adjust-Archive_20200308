import { ChildModule, ParentModule } from "@adjust/core/types";
export declare type SettingsSearchBar = ChildModule<{}>;
export declare type SettingsSearchBarParent = ParentModule<{}>;
export declare type SettingsSearchBarContract = {
    parent: SettingsSearchBarParent;
    child: SettingsSearchBar;
};
export declare const SettingsSearchBarType: import("@adjust/core/types").ContractID<SettingsSearchBarContract>;
