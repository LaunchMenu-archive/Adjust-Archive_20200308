import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";
import {ISettingsIndexTypeTree} from "../../../_types/ISettingsIndexTypeTree";
import {ISettingsIndexModuleTree} from "../../../_types/ISettingsIndexModuleTree";

export type SettingsIndexCategories = ChildModule<{}>;
export type SettingsIndexCategoriesParent = ParentModule<{}>;
export type SettingsIndexCategoriesContract = {
    parent: SettingsIndexCategoriesParent;
    child: SettingsIndexCategories;
    data: ISettingsIndexTypeTree | ISettingsIndexModuleTree;
};

export const SettingsIndexCategoriesType = Registry.createContractID<
    SettingsIndexCategoriesContract
>(__filename);
