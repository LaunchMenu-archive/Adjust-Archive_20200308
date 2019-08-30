import {ISettingsIndexType} from "./ISettingsIndexType";
import {ISettingsIndexModule} from "./ISettingsIndexModule";
import {ISettingsIndexPackage} from "./ISettingsIndexPackage";
import {ISettingsIndexTypeTree} from "./ISettingsIndexTypeTree";
import {ISettingsIndexModuleTree} from "./ISettingsIndexModuleTree";

/**
 * Data to represent all the types and modules in the index
 */
export type ISettingsIndex = {
    types: ISettingsIndexType[];
    modules: ISettingsIndexModule[];
    typesTree: {[packag: string]: ISettingsIndexPackage<ISettingsIndexTypeTree>};
    modulesTree: {[packag: string]: ISettingsIndexPackage<ISettingsIndexModuleTree>};
};
