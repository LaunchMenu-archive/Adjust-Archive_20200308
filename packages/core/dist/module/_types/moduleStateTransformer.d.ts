/// <reference types="react" />
import { ModuleState } from "./moduleState";
import { ParameterizedModule } from "../module";
import { ChildModule } from "./moduleContract";
import { ModuleReference } from "../moduleID";
/**
 * Transforms the module state to the format it will be in the view;
 * -Replaces promises by its values
 * -Replaces modules and module references by JSX elements
 */
export declare type TransformModuleViewState<S> = S extends ModuleState ? {
    [P in keyof S]: TransformModuleViewState<S[P]>;
} : S extends Promise<infer T> ? TransformModuleViewState2<T> : S extends Array<infer T> ? Array<TransformModuleViewState2<T>> : ExtractModules<S>;
declare type ExtractModules<S> = S extends ParameterizedModule ? JSX.Element : S extends ChildModule<{}> ? JSX.Element : S extends ModuleReference ? JSX.Element : S;
declare type TransformModuleViewState2<S> = S extends ModuleState ? {
    [P in keyof S]: TransformModuleViewState2<S[P]>;
} : S extends Promise<infer T> ? TransformModuleViewState3<T> : S extends Array<infer T> ? Array<TransformModuleViewState3<T>> : ExtractModules<S>;
declare type TransformModuleViewState3<S> = S extends ModuleState ? {
    [P in keyof S]: TransformModuleViewState3<S[P]>;
} : S extends Promise<infer T> ? TransformModuleViewState4<T> : S extends Array<infer T> ? Array<TransformModuleViewState4<T>> : ExtractModules<S>;
declare type TransformModuleViewState4<S> = S extends ModuleState ? {
    [P in keyof S]: TransformModuleViewState4<S[P]>;
} : S extends Promise<infer T> ? TransformModuleViewState5<T> : S extends Array<infer T> ? Array<TransformModuleViewState5<T>> : ExtractModules<S>;
declare type TransformModuleViewState5<S> = S extends ModuleState ? {
    [P in keyof S]: TransformModuleViewState5<S[P]>;
} : S extends Promise<infer T> ? TransformModuleViewState6<T> : S extends Array<infer T> ? Array<TransformModuleViewState6<T>> : ExtractModules<S>;
declare type TransformModuleViewState6<S> = S extends ModuleState ? {
    [P in keyof S]: TransformModuleViewState6<S[P]>;
} : S extends Promise<infer T> ? TransformModuleViewState7<T> : S extends Array<infer T> ? Array<TransformModuleViewState7<T>> : ExtractModules<S>;
declare type TransformModuleViewState7<S> = S extends ModuleState ? {
    [P in keyof S]: S[P] extends Promise<infer T> ? TransformModuleViewState7<T> : S[P] extends Array<infer T> ? Array<TransformModuleViewState7<T>> : TransformModuleViewState7<S[P]>;
} : ExtractModules<S>;
export {};
