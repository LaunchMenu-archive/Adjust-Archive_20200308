import { ChildModule, ParentModule } from "@adjust/core/types";
import { ISettingsIndexPackage } from "../../../_types/ISettingsIndexPackage";
import { ISettingsIndexModuleTree } from "../../../_types/ISettingsIndexModuleTree";
import { ISettingsIndexTypeTree } from "../../../_types/ISettingsIndexTypeTree";
export declare type SettingsIndexPackage = ChildModule<{}>;
export declare type SettingsIndexPackageParent = ParentModule<{}>;
export declare type SettingsIndexPackageContract = {
    parent: SettingsIndexPackageParent;
    child: SettingsIndexPackage;
    data: ISettingsIndexPackage<ISettingsIndexModuleTree | ISettingsIndexTypeTree>;
};
export declare const SettingsIndexPackageType: import("@adjust/core/types").ContractID<SettingsIndexPackageContract>;
