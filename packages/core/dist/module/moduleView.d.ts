import React from "react";
import { ParameterizedModule } from "./module";
import { DeepReadonly, ExtendsClass } from "../utils/_types/standardTypes";
import { ModuleState } from "./_types/moduleState";
import { ModuleViewState } from "./_types/moduleViewState";
import { RemoteModule } from "./_types/remoteModule";
import { ModuleViewProps } from "./_types/moduleViewProps";
import { SettingsConfig } from "../storage/settings/_types/settingsConfig";
import { SettingsData } from "../storage/settings/_types/settingsData";
/**
 * A class that can visually represent the module
 */
export declare abstract class ModuleView<S extends ModuleState, C extends SettingsConfig, M extends ParameterizedModule> extends React.Component<ModuleViewProps<M>, ModuleViewState<S, C>> {
    unmounted: boolean;
    readonly module: RemoteModule<M>;
    readonly settings: DeepReadonly<SettingsData<C>>;
    /**
     * Creates an instance of the module view
     * @param props The properties of this element
     */
    constructor(props: any);
    /**
     * @override Will load the initial state and start listening for updates
     */
    componentWillMount(): void;
    /**
     * @override Will stop listening for updates
     */
    componentWillUnmount(): void;
    getClass<V extends ExtendsClass<typeof ModuleView> = typeof ModuleView>(): V;
    static initialState: any;
    /**
     * Loads the initial state into the view
     * @param state The state to load
     */
    loadInitialState(state: ModuleViewState<S, C>): void;
    /**
     * Updates the state of the view
     * @param state The parts of the state to update
     */
    updateState(state: ModuleViewState<S, C>): void;
    /**@override */
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    /**@override */
    componentDidCatch(error: Error, info: any): void;
    /**
     * @override The normal react render method
     */
    render(): JSX.Element;
    /**
     * Renders a loader element
     * @returns An element to be displayed while the module is loading
     */
    protected renderLoader(): JSX.Element;
    /**
     * Renders a loader element
     * @returns An element to be displayed while the module is loading
     */
    protected renderError(): JSX.Element;
    /**
     * Renders the actual contents of module
     * @returns A custom element representing the view's dom
     */
    protected abstract renderView(): JSX.Element;
}
/**
 * A type representing a module view, where the generic parameter arguments can be left out
 */
export declare type ParameterizedModuleView = ModuleView<ModuleState, SettingsConfig, ParameterizedModule>;
