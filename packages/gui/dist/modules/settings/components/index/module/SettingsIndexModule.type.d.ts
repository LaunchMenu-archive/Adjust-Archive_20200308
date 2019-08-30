import { ChildModule, ParentModule } from "@adjust/core/types";
import { ISettingsIndexModule } from "../../../_types/ISettingsIndexModule";
export declare type SettingsIndexModule = ChildModule<{}>;
export declare type SettingsIndexModuleParent = ParentModule<{}>;
export declare type SettingsIndexModuleContract = {
    parent: SettingsIndexModuleParent;
    child: SettingsIndexModule;
    data: ISettingsIndexModule;
};
export declare const SettingsIndexModuleType: import("@adjust/core/types").ContractID<SettingsIndexModuleContract>;
