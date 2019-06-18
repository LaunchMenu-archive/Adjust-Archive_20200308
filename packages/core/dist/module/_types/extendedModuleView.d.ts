import { ParameterizedModule } from "../module";
import { DeepPartial, Omit, Constructor, GetConstructed, DeepReadonly, Map } from "../../utils/_types/standardTypes";
import { ModuleView, ParameterizedModuleView } from "../moduleView";
import { ExtractModuleState } from "./extendedModule";
import { Settings } from "../../storage/settings/settings";
import { ModuleViewProps } from "./moduleViewProps";
import { ModuleViewState } from "./moduleViewState";
/**
 * Extracts the settingsConfig type from a given module
 */
export declare type ExtractModuleSettingsConfig<M extends ParameterizedModule> = M["settingsObject"] extends Settings<infer C> ? C : never;
/**
 * Extracts the assignable state type from a given module view
 */
export declare type ExtractModuleViewState<V extends {
    state: any;
}> = V["state"] extends ModuleViewState<infer S, any> ? S : void;
/**
 * Filters out any methods from a module view that should be overwritten
 */
export declare type FilterModuleView<M extends ParameterizedModuleView> = Omit<M, "setState">;
/**
 * Creates a new module type, based on a module config and a module type
 */
export declare type ExtendedModuleView<M extends ParameterizedModule, S extends Map<any>, V extends ParameterizedModuleView> = {
    setState(state: ((prevState: DeepReadonly<S & ExtractModuleViewState<V> & ModuleViewState<S & ExtractModuleState<M>, ExtractModuleSettingsConfig<M>>>, props: ModuleViewProps<M>) => DeepPartial<S & ExtractModuleViewState<V>>) | DeepPartial<S & ExtractModuleViewState<V>>, callback?: () => any): void;
} & V & FilterModuleView<ModuleView<S & ExtractModuleState<M>, ExtractModuleSettingsConfig<M>, M>>;
/**
 * Creates a new module constructor type, based on a module config and a module constructor type
 */
export declare type ExtendedModuleViewClass<M extends Constructor<any>, S extends Map<any>, V extends Constructor<any>> = {
    new (...args: any): ExtendedModuleView<GetConstructed<M>, S, GetConstructed<V>>;
} & typeof ModuleView;
