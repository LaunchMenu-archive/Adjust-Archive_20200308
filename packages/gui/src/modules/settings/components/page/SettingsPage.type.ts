import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";

export type SettingsPage = ChildModule<{}>;
export type SettingsPageParent = ParentModule<{}>;
export type SettingsPageContract = {
    parent: SettingsPageParent;
    child: SettingsPage;
};

export const SettingsPageType = Registry.createContractID<SettingsPageContract>(
    __filename
);
