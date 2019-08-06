import {ModuleState} from "./moduleState";
import {SettingsConfigSetData} from "../../storage/settings/_types/settingsConfigSetData";
import {SettingsConfigSet} from "../../storage/settings/_types/settingsConfigSet";

/**
 * A base interface for the react state of the view
 */
export type ModuleViewState<
    S extends ModuleState,
    C extends SettingsConfigSet,
    D extends any
> = S & {
    "~settings": SettingsConfigSetData<C>;
    "~data": D;
};

/**
 * A base interface for the react state of the view, with default parameters
 */
export type ParameterizedModuleViewState<
    S extends ModuleState = ModuleState,
    C extends SettingsConfigSet = SettingsConfigSet,
    D extends any = undefined
> = ModuleViewState<S, C, D>;
