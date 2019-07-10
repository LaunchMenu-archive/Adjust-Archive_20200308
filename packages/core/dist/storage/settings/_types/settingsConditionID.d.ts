import {ModuleID} from "../../../module/moduleID";
export declare type SettingsConditionID = {
    module: ModuleID;
    condition: string;
    equals(con: SettingsConditionID): boolean;
};
