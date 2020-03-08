/// <reference types="react" />
/**
 * Data to represent the tree elements
 */
export declare type ISettingsIndexTreeElements = {
    name: string;
    children?: {
        [child: string]: ISettingsIndexTreeElements;
    };
} & {
    module?: JSX.Element | JSX.Element;
};
