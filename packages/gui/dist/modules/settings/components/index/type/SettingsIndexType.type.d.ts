import { ChildModule, ParentModule } from "@adjust/core/types";
import { ISettingsIndexType } from "../../../_types/ISettingsIndexType";
export declare type SettingsIndexType = ChildModule<{}>;
export declare type SettingsIndexTypeParent = ParentModule<{}>;
export declare type SettingsIndexTypeContract = {
    parent: SettingsIndexTypeParent;
    child: SettingsIndexType;
    data: ISettingsIndexType;
};
export declare const SettingsIndexTypeType: import("@adjust/core/types").ContractID<SettingsIndexTypeContract>;
