/// <reference types="react" />
import { ParameterizedModule } from "../module";
import { DeepPartial, Omit, Constructor, GetConstructed, DeepReadonly, Map } from "../../utils/_types/standardTypes";
import { ModuleView, ParameterizedModuleView } from "../moduleView";
import { ExtractModuleState } from "./extendedModule";
import { Settings } from "../../storage/settings/settings";
import { ModuleViewProps } from "./moduleViewProps";
import { ModuleViewState } from "./moduleViewState";
import { ModuleInterface } from "./moduleInterface";
import { ModuleRequestData } from "./moduleRequestData";
import { ModuleState } from "./moduleState";
import { ModuleReference } from "../moduleID";
import { PublicModuleMethods } from "./publicModuleMethods";
/**
 * Extracts the settingsConfig type from a given module
 */
export declare type ExtractModuleSettingsConfig<M extends ParameterizedModule> = M["settingsObject"] extends Settings<infer C> ? C["settings"] : never;
/**
 * Extracts the request data type from a given module
 */
export declare type ExtractModuleData<M extends {
    type: ModuleInterface;
}> = ModuleRequestData<M["type"]> extends {
    data: infer D;
} ? D : undefined;
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
} : S extends ParameterizedModule ? JSX.Element : S extends PublicModuleMethods ? JSX.Element : S extends ModuleReference ? JSX.Element : S;
/**
 * Filters out any methods from a module view that should be overwritten
 */
export declare type FilterModuleView<M extends ParameterizedModuleView> = Omit<M, "setState">;
/**
 * Creates a new module type, based on a module config and a module type
 */
export declare type ExtendedModuleView<M extends ParameterizedModule, S extends Map<any>, V extends ParameterizedModuleView> = {
    setState(state: ((prevState: DeepReadonly<S & ExtractModuleViewState<V> & ModuleViewState<S & ExtractModuleState<M>, ExtractModuleSettingsConfig<M>, ExtractModuleData<M>>>, props: ModuleViewProps<M>) => DeepPartial<S & ExtractModuleViewState<V>>) | DeepPartial<S & ExtractModuleViewState<V>>, callback?: () => any): void;
} & V & ModuleView<S & TransformModuleViewState<ExtractModuleState<M>>, ExtractModuleSettingsConfig<M>, M, ExtractModuleData<M>>;
/**
 * Creates a new module constructor type, based on a module config and a module constructor type
 */
export declare type ExtendedModuleViewClass<M extends Constructor<any>, S extends Map<any>, V extends Constructor<any>> = {
    new (...args: any): ExtendedModuleView<GetConstructed<M>, S, GetConstructed<V>>;
} & typeof ModuleView;
