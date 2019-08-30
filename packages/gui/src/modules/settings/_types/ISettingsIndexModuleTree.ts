import {ISettingsIndexModule} from "./ISettingsIndexModule";

export type ISettingsIndexModulePureTree = {
    name: string;
    children: {
        [child: string]: ISettingsIndexModuleTree;
    };
};

/**
 * Data tp represent the module tree
 */
export type ISettingsIndexModuleTree =
    | ISettingsIndexModulePureTree
    | ISettingsIndexModule
    | (ISettingsIndexModulePureTree & ISettingsIndexModule);
