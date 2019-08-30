import { ISettingsIndexType } from "./ISettingsIndexType";
export declare type ISettingsIndexTypePureTree = {
    name: string;
    children: {
        [child: string]: ISettingsIndexTypeTree;
    };
};
/**
 * Data tp represent the contract type tree
 */
export declare type ISettingsIndexTypeTree = ISettingsIndexTypePureTree | ISettingsIndexType | (ISettingsIndexTypePureTree & ISettingsIndexType);
