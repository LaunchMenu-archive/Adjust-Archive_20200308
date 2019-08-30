import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";

export type SettingsSearchBar = ChildModule<{}>;
export type SettingsSearchBarParent = ParentModule<{}>;
export type SettingsSearchBarContract = {
    parent: SettingsSearchBarParent;
    child: SettingsSearchBar;
};

export const SettingsSearchBarType = Registry.createContractID<SettingsSearchBarContract>(
    __filename
);
