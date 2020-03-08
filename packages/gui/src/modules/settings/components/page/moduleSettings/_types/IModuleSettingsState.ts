import {
    SettingsConfigSet,
    JSXchild,
    ParameterizedSettingDefinition,
    ITraceableTransformer,
    SettingInputContract,
} from "@adjust/core/types";

/**
 * The state for a section config
 */
export type ISectionState = {
    path: string;
    name: ITraceableTransformer<JSXchild> | string;
    description: ITraceableTransformer<JSXchild> | string;
    help: ITraceableTransformer<JSXchild> | string;
    helpLink: string;
};

/**
 * The sate for a setting
 */
export type ISettingState = {
    default: true; // Just to indicate this is a setting
    path: string;
    valueModule: SettingInputContract<unknown, unknown>["child"];
    name: ITraceableTransformer<JSXchild> | string;
    description: ITraceableTransformer<JSXchild> | string;
    help: ITraceableTransformer<JSXchild> | string;
    helpLink: string;
    hidden: boolean;
    advanced: boolean;
    enabled: boolean;
    searchExcluded: boolean;
    tags: string[];
};

/**
 * An interface for the state to store settings property values
 */
export type IModuleSettingsState<S extends SettingsConfigSet = SettingsConfigSet> = {
    [P in keyof S]: P extends "sectionConfig"
        ? ISectionState
        : S[P] extends ParameterizedSettingDefinition<infer V, infer T>
        ? ISettingState
        : S[P] extends SettingsConfigSet
        ? IModuleSettingsState<S[P]>
        : null;
};
