import {ModuleState} from "./moduleState";

/**
 * A base interface for the react state of the view
 */
export type ModuleViewState<
    S extends ModuleState,
    C extends {[field: string]: any},
    D extends {[field: string]: any}
> = S & {
    "~settings": C;
    "~data": D;
};

/**
 * A base interface for the react state of the view, with default parameters
 */
export type ParameterizedModuleViewState<
    S extends ModuleState = ModuleState,
    C extends {[field: string]: any} = {[field: string]: any},
    D extends {[field: string]: any} = {[field: string]: any}
> = ModuleViewState<S, C, D>;
