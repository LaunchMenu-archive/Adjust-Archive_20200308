/// <reference types="react" />
import { ParameterizedModule, Module } from "../module";
import { DeepPartial, Omit, Constructor, GetConstructed, DeepReadonly, Map } from "../../utils/_types/standardTypes";
import { ModuleView, ParameterizedModuleView } from "../moduleView";
import { ExtractModuleState, ExtractModuleSettings } from "./extendedModule";
import { ModuleViewProps } from "./moduleViewProps";
import { ModuleViewState } from "./moduleViewState";
import { ChildModule } from "./moduleContract";
import { ModuleState } from "./moduleState";
import { ModuleReference } from "../moduleID";
/**
 * Extracts the request data type from a given module
 */
export declare type ExtractModuleData<M extends ParameterizedModule> = M extends Module<any, any, infer D> ? D["data"] : undefined;
/**
 * Extracts the assignable state type from a given module view
 */
export declare type ExtractModuleViewState<V extends {
    state: any;
}> = V["state"] extends ModuleViewState<infer S, any, any> ? S : void;
/**
 * Transforms the module state to the format it will be in the view;
 * -Replaces promises by its values
 * -Replaces modules and module references by JSX elements
 */
export declare type TransformModuleViewState<S> = S extends ModuleState ? {
    [P in keyof S]: S[P] extends Promise<infer T> ? TransformModuleViewState<T> : S[P] extends Array<infer T> ? Array<TransformModuleViewState<T>> : TransformModuleViewState<S[P]>;
} : S extends ParameterizedModule ? JSX.Element : S extends ChildModule<{}> ? JSX.Element : S extends ModuleReference ? JSX.Element : S;
/**
 * Filters out any methods from a module view that should be overwritten
 */
export declare type FilterModuleView<M extends ParameterizedModuleView> = Omit<M, "changeState">;
/**
 * Creates a new module type, based on a module config and a module type
 */
export declare type ExtendedModuleView<M extends ParameterizedModule, S extends Map<any>, V extends ParameterizedModuleView> = {
    setState(state: ((prevState: DeepReadonly<S & ExtractModuleViewState<V> & ModuleViewState<S & ExtractModuleState<M>, ExtractModuleSettings<M>, ExtractModuleData<M>>>, props: ModuleViewProps<M>) => DeepPartial<S & ExtractModuleViewState<V>>) | DeepPartial<S & ExtractModuleViewState<V>>, callback?: () => any): void;
} & V & ModuleView<S & TransformModuleViewState<ExtractModuleState<M>>, ExtractModuleSettings<M>, M, ExtractModuleData<M>>;
/**
 * Creates a new module constructor type, based on a module config and a module constructor type
 */
export declare type ExtendedModuleViewClass<M extends Constructor<any>, S extends Map<any>, V extends Constructor<any>> = {
    new (...args: any): ExtendedModuleView<GetConstructed<M>, S, GetConstructed<V>>;
} & typeof ModuleView;
