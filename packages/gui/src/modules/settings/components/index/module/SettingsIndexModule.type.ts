import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";
import {ISettingsIndexModule} from "../../../_types/ISettingsIndexModule";

export type SettingsIndexModule = ChildModule<{}>;
export type SettingsIndexModuleParent = ParentModule<{}>;
export type SettingsIndexModuleContract = {
    parent: SettingsIndexModuleParent;
    child: SettingsIndexModule;
    data: ISettingsIndexModule;
};

export const SettingsIndexModuleType = Registry.createContractID<
    SettingsIndexModuleContract
>(__filename);
