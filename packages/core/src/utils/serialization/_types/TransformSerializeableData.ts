import {ModuleState} from "../../../module/_types/moduleState";
import {ChildModule} from "../../../module/_types/moduleContract";
import {ModuleReference} from "../../../module/moduleID";
import {ParameterizedModule} from "../../../module/module";
import {ITraceableTransformer} from "./ITracableTransformer";

/**
 * Extracts the modules from the data, and replaces it with a element
 * And extractrs the type of a transform
 */
type TransformType<S> = S extends ParameterizedModule
    ? JSX.Element
    : S extends ChildModule<{}>
    ? JSX.Element
    : S extends ModuleReference
    ? JSX.Element
    : S extends ITraceableTransformer<infer T>
    ? T
    : S;

/**
 * Transforms the serializable data to the format it will be in the frontend/view
 * -Replaces promises by its values
 * -Replaces modules and module references by JSX elements
 * -Replaces ITracableTransformers to their transformed values
 */
export type TransformSerializeableData<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformSerializeableData<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformSerializeableData2<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformSerializeableData2<T>>
    : TransformType<S>;

// Repeat same definition explicitely because typescript doesn't manage infinite recursion
type TransformSerializeableData2<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformSerializeableData<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformSerializeableData3<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformSerializeableData3<T>>
    : TransformType<S>;

type TransformSerializeableData3<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformSerializeableData<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformSerializeableData4<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformSerializeableData4<T>>
    : TransformType<S>;

type TransformSerializeableData4<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformSerializeableData<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformSerializeableData5<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformSerializeableData5<T>>
    : TransformType<S>;

type TransformSerializeableData5<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformSerializeableData<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformSerializeableData6<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformSerializeableData6<T>>
    : TransformType<S>;

type TransformSerializeableData6<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformSerializeableData<S[P]>;
      }
    : TransformType<S>;
