import {ModuleState} from "./moduleState";
import {SettingsData} from "../../storage/settings/_types/settingsData";
import {SettingsConfig} from "../../storage/settings/_types/settingsConfig";

/**
 * A base interface for the react state of the view
 */
export type ModuleViewState<
    S extends ModuleState,
    C extends SettingsConfig,
    D extends any
> = S & {
    "~settings": SettingsData<C>;
    "~data": D;
};

/**
 * A base interface for the react state of the view, with default parameters
 */
export type ParameterizedModuleViewState<
    S extends ModuleState = ModuleState,
    C extends SettingsConfig = SettingsConfig,
    D extends any = undefined
> = ModuleViewState<S, C, D>;
