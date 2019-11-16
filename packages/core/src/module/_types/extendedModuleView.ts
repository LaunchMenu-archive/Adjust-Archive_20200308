import {ParameterizedModule, Module} from "../module";
import {
    DeepPartial,
    Omit,
    Constructor,
    GetConstructed,
    DeepReadonly,
    Map,
} from "../../utils/_types/standardTypes";
import {ModuleView, ParameterizedModuleView} from "../moduleView";
import {ExtractModuleState, ExtractModuleSettings} from "./extendedModule";
import {ModuleViewProps} from "./moduleViewProps";
import {ModuleViewState} from "./moduleViewState";
import {TransformSerializeableData} from "../../utils/serialization/_types/TransformSerializeableData";

/**
 * Extracts the request data type from a given module
 */
export type ExtractModuleData<M extends ParameterizedModule> = M extends Module<
    any,
    any,
    infer D
>
    ? D["data"]
    : undefined;

/**
 * Extracts the assignable state type from a given module view
 */
export type ExtractModuleViewState<
    V extends {state: any}
> = V["state"] extends ModuleViewState<infer S, any, any> ? S : void;

/**
 * Filters out any methods from a module view that should be overwritten
 */
export type FilterModuleView<M extends ParameterizedModuleView> = Omit<M, "changeState">;

/**
 * Creates a new module type, based on a module config and a module type
 */
export type ExtendedModuleView<
    M extends ParameterizedModule,
    S extends Map<any>,
    V extends ParameterizedModuleView
> = {
    // Intellisense for prevState won't work 'properly' due to contravariance, we would want to overwrite changeState's signature, rather than merge it.
    // modified From https://github.com/DefinitelyTyped/DefinitelyTyped/blob/eafef8bd049017b3998939de2edbab5d8a96423b/types/react/v15/index.d.ts#L307
    setState(
        state:
            | ((
                  prevState: DeepReadonly<
                      S &
                          ExtractModuleViewState<V> &
                          TransformSerializeableData<
                              ModuleViewState<
                                  S & ExtractModuleState<M>,
                                  ExtractModuleSettings<M>,
                                  ExtractModuleData<M>
                              >
                          >
                  >,
                  props: ModuleViewProps<M>
              ) => DeepPartial<S & ExtractModuleViewState<V>>)
            | DeepPartial<S & ExtractModuleViewState<V>>,
        callback?: () => any
    ): void;
    changeState(state: DeepPartial<S & ExtractModuleViewState<V>>): void;
} & V &
    // FilterModuleView<ModuleView<S & ExtractModuleState<M>, ExtractModuleSettingsConfig<M>, M>>
    ModuleView<
        S & TransformSerializeableData<ExtractModuleState<M>>,
        ExtractModuleSettings<M>,
        M,
        ExtractModuleData<M>
    >;

// TODO: make sure that V doesn't indicate renderView isn't abstract in ^, it it still is

/**
 * Creates a new module constructor type, based on a module config and a module constructor type
 */
export type ExtendedModuleViewClass<
    M extends Constructor<any>,
    S extends Map<any>,
    V extends Constructor<any>
> = {
    new (...args: any): ExtendedModuleView<GetConstructed<M>, S, GetConstructed<V>>;
} & typeof ModuleView;
