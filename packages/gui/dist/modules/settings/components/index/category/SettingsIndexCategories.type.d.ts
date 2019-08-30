import { ChildModule, ParentModule } from "@adjust/core/types";
import { ISettingsIndexTypeTree } from "../../../_types/ISettingsIndexTypeTree";
import { ISettingsIndexModuleTree } from "../../../_types/ISettingsIndexModuleTree";
export declare type SettingsIndexCategories = ChildModule<{}>;
export declare type SettingsIndexCategoriesParent = ParentModule<{}>;
export declare type SettingsIndexCategoriesContract = {
    parent: SettingsIndexCategoriesParent;
    child: SettingsIndexCategories;
    data: ISettingsIndexTypeTree | ISettingsIndexModuleTree;
};
export declare const SettingsIndexCategoriesType: import("@adjust/core/types").ContractID<SettingsIndexCategoriesContract>;
