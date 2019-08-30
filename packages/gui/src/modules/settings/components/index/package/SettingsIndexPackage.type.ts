import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";
import {ISettingsIndexPackage} from "../../../_types/ISettingsIndexPackage";
import {ISettingsIndexModuleTree} from "../../../_types/ISettingsIndexModuleTree";
import {ISettingsIndexTypeTree} from "../../../_types/ISettingsIndexTypeTree";

export type SettingsIndexPackage = ChildModule<{}>;
export type SettingsIndexPackageParent = ParentModule<{}>;
export type SettingsIndexPackageContract = {
    parent: SettingsIndexPackageParent;
    child: SettingsIndexPackage;
    data: ISettingsIndexPackage<ISettingsIndexModuleTree | ISettingsIndexTypeTree>;
};

export const SettingsIndexPackageType = Registry.createContractID<
    SettingsIndexPackageContract
>(__filename);
