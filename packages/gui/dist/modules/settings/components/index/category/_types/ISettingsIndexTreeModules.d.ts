import SettingsIndexModule from "../../SettingsIndex";
import { SettingsIndexType } from "../../type/SettingsIndexType.type";
/**
 * Data to represent the tree modules
 */
export declare type ISettingsIndexTreeModules = {
    name: string;
    children?: {
        [child: string]: ISettingsIndexTreeModules;
    };
} & {
    module?: SettingsIndexModule | SettingsIndexType;
};
