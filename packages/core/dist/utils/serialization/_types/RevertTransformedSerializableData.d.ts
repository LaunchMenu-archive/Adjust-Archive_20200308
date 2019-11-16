/// <reference types="react" />
import { ParameterizedModule } from "../../../module/module";
import { ModuleReference } from "../../../module/moduleID";
import { ChildModule } from "../../../module/_types/moduleContract";
import { ITraceableTransformer } from "./ITracableTransformer";
/**
 * Obtains a type for possible arguments that a transformed serializable data object could have been created from
 */
export declare type RevertTransformedSerializedData<S> = (S extends object ? S extends JSX.Element ? ChildModule<{}> | ModuleReference | ParameterizedModule : {
    [P in keyof S]: RevertTransformedSerializedData<S[P]>;
} : S) | ITraceableTransformer<S>;
