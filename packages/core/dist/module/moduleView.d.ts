import React from "react";
import { ParameterizedModule } from "./module";
import { DeepReadonly, ExtendsClass } from "../utils/_types/standardTypes";
import { ModuleState } from "./_types/moduleState";
import { ModuleViewState } from "./_types/moduleViewState";
import { RemoteModule } from "./_types/remoteModule";
import { ModuleViewProps } from "./_types/moduleViewProps";
import { SettingsConfigSet } from "../storage/settings/_types/settingsConfigSet";
/**
 * A class that can visually represent the module
 */
export declare abstract class ModuleView<S extends ModuleState, C extends {
    [field: string]: any;
}, M extends ParameterizedModule, D extends {
    [field: string]: any;
}> extends React.Component<ModuleViewProps<M>, ModuleViewState<S, C, D>> {
    unmounted: boolean;
    protected initialized: boolean;
    protected self: Promise<this>;
    protected readonly module: RemoteModule<M>;
    protected readonly settings: DeepReadonly<C>;
    protected readonly data: DeepReadonly<D>;
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
    static state: any;
    /**
     * Loads the initial state into the view
     * @param state The state to load
     */
    loadInitialState(state: ModuleViewState<S, C, D>): void;
    /**
     * Updates the state of the view
     * @param state The parts of the state to update
     */
    changeState(state: ModuleViewState<S, C, D>): void;
    /**
     * Augments the state changes to full state fields
     * ({something:{stuff:3}} to {something:{stuff:3, otherCurVal:5}})
     * @param oldState The current state data
     * @param changes The changed path values
     * @modifies changes
     */
    protected getNewState(oldState: ModuleViewState<S, C, D>, changes: ModuleViewState<S, C, D>): ModuleViewState<S, C, D>;
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
     * Performs one of the render options if the module data isn't ready
     * @returns An appropriate rendering if the data isn't ready, or null otherwise
     */
    protected notReadyRender(): JSX.Element;
    /**
     * Renders a loader element
     * @returns An element to be displayed while the module is loading
     */
    protected renderLoader(): JSX.Element;
    /**
     * Renders an element if this module was stopped
     * @returns An element to be displayed when the module was stoppped
     */
    protected renderStopped(): JSX.Element;
    /**
     * Renders an error element
     * @returns An element to be displayed when the module rendering errored
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
export declare type ParameterizedModuleView = ModuleView<ModuleState, SettingsConfigSet, ParameterizedModule, any>;
