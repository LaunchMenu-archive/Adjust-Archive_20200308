/// <reference types="react" />
/**
 * The details of the module, to be shown to the user
 */
export declare type ModuleDetails = {
    /** An icon to represent the module with */
    icon?: string | JSX.Element;
    /** The display name of the module */
    name: string | JSX.Element;
    /** A description of the module */
    description?: string | JSX.Element;
};
/**
 * The details of te module, in normalized form
 */
export declare type NormalizedModuleDetails = {
    [P in keyof ModuleDetails]-?: ModuleDetails[P];
};
