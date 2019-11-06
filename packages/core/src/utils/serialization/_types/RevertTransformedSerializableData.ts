import {ParameterizedModule} from "../../../module/module";
import {ModuleReference} from "../../../module/moduleID";
import {ChildModule} from "../../../module/_types/moduleContract";
import {Json} from "../../_types/standardTypes";
import {ITraceableTransformer} from "./ITracableTransformer";

/**
 * Obtains a type for possible arguments that a transformed serializable data object could have been created from
 */
export type RevertTransformedSerializedData<S> =
    | (S extends object
          ? {[P in keyof S]: RevertTransformedSerializedData<S[P]>}
          : S extends JSX.Element
          ? ChildModule<{}> | ModuleReference | ParameterizedModule
          : S)
    | ITraceableTransformer<S>;
