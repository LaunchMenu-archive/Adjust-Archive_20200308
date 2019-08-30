import {ISettingsIndexType} from "./ISettingsIndexType";

export type ISettingsIndexTypePureTree = {
    name: string;
    children: {
        [child: string]: ISettingsIndexTypeTree;
    };
};

/**
 * Data tp represent the contract type tree
 */
export type ISettingsIndexTypeTree =
    | ISettingsIndexTypePureTree
    | ISettingsIndexType
    | (ISettingsIndexTypePureTree & ISettingsIndexType);
