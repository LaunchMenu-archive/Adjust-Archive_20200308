import SettingsIndexModule from "../../SettingsIndex";
import {SettingsIndexType} from "../../type/SettingsIndexType.type";

/**
 * Data to represent the tree elements
 */
export type ISettingsIndexTreeElements = {
    name: string;
    children?: {
        [child: string]: ISettingsIndexTreeElements;
    };
} & {module?: JSX.Element | JSX.Element};
