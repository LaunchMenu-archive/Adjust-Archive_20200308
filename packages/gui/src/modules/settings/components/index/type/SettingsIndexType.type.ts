import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";
import {ISettingsIndexType} from "../../../_types/ISettingsIndexType";

export type SettingsIndexType = ChildModule<{}>;
export type SettingsIndexTypeParent = ParentModule<{}>;
export type SettingsIndexTypeContract = {
    parent: SettingsIndexTypeParent;
    child: SettingsIndexType;
    data: ISettingsIndexType;
};

export const SettingsIndexTypeType = Registry.createContractID<SettingsIndexTypeContract>(
    __filename
);
