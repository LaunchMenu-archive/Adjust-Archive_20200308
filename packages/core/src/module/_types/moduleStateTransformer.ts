import {ModuleState} from "./moduleState";
import {ParameterizedModule} from "../module";
import {ChildModule} from "./moduleContract";
import {ModuleReference} from "../moduleID";

/**
 * Transforms the module state to the format it will be in the view;
 * -Replaces promises by its values
 * -Replaces modules and module references by JSX elements
 */
export type TransformModuleViewState<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformModuleViewState<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformModuleViewState2<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformModuleViewState2<T>>
    : ExtractModules<S>;

type ExtractModules<S> = S extends ParameterizedModule
    ? JSX.Element
    : S extends ChildModule<{}>
    ? JSX.Element
    : S extends ModuleReference
    ? JSX.Element
    : S;

type TransformModuleViewState2<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformModuleViewState2<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformModuleViewState3<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformModuleViewState3<T>>
    : ExtractModules<S>;

type TransformModuleViewState3<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformModuleViewState3<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformModuleViewState4<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformModuleViewState4<T>>
    : ExtractModules<S>;

type TransformModuleViewState4<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformModuleViewState4<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformModuleViewState5<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformModuleViewState5<T>>
    : ExtractModules<S>;

type TransformModuleViewState5<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformModuleViewState5<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformModuleViewState6<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformModuleViewState6<T>>
    : ExtractModules<S>;

type TransformModuleViewState6<S> = S extends ModuleState
    ? {
          [P in keyof S]: TransformModuleViewState6<S[P]>;
      }
    : S extends Promise<infer T>
    ? TransformModuleViewState7<T> // For some reason typescript doesn't accept this as recursion
    : S extends Array<infer T>
    ? Array<TransformModuleViewState7<T>>
    : ExtractModules<S>;

// We need to stop at some point, when this type is reached, something like Promise<Module[]> won't be translated properly
type TransformModuleViewState7<S> = S extends ModuleState
    ? {
          [P in keyof S]: S[P] extends Promise<infer T>
              ? TransformModuleViewState7<T>
              : S[P] extends Array<infer T>
              ? Array<TransformModuleViewState7<T>>
              : TransformModuleViewState7<S[P]>;
      }
    : ExtractModules<S>;
