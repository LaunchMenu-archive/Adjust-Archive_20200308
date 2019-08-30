import { ISettingsIndexModule } from "./ISettingsIndexModule";
export declare type ISettingsIndexModulePureTree = {
    name: string;
    children: {
        [child: string]: ISettingsIndexModuleTree;
    };
};
/**
 * Data tp represent the module tree
 */
export declare type ISettingsIndexModuleTree = ISettingsIndexModulePureTree | ISettingsIndexModule | (ISettingsIndexModulePureTree & ISettingsIndexModule);
