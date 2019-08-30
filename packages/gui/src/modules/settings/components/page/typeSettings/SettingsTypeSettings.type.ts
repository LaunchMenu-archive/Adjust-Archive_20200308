import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";

export type SettingsTypeSettings = ChildModule<{}>;
export type SettingsTypeSettingsParent = ParentModule<{}>;
export type SettingsTypeSettingsContract = {
    parent: SettingsTypeSettingsParent;
    child: SettingsTypeSettings;
};

export const SettingsTypeSettingsType = Registry.createContractID<
    SettingsTypeSettingsContract
>(__filename);
