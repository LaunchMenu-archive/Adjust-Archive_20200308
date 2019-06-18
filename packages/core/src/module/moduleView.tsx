import React from "react";
import {ParameterizedModule} from "./module";
import {DeepReadonly, ExtendsClass} from "../utils/_types/standardTypes";
import {ViewManager} from "../state/window/viewManager";
import {ModuleState} from "./_types/moduleState";
import {ModuleViewState} from "./_types/moduleViewState";
import {RemoteModule} from "./_types/remoteModule";
import {ModuleViewProps} from "./_types/moduleViewProps";
import {SettingsConfig} from "../storage/settings/_types/settingsConfig";
import {SettingsData} from "../storage/settings/_types/settingsData";

/**
 * A class that can visually represent the module
 */
export abstract class ModuleView<
    S extends ModuleState,
    C extends SettingsConfig,
    M extends ParameterizedModule
> extends React.Component<ModuleViewProps<M>, ModuleViewState<S, C>> {
    // Indicates whether this react component has been completely unmounted
    unmounted: boolean = false;

    // A proxy to the module that this view is representing
    readonly module: RemoteModule<M>;

    // The settings of the module
    readonly settings: DeepReadonly<SettingsData<C>>;

    /**
     * Creates an instance of the module view
     * @param props The properties of this element
     */
    constructor(props) {
        super(props);

        // @ts-ignore
        this.state = this.getClass().initialState;

        // Make a shortcut to the module
        this.module = this.props.module as any;
    }

    // Management methods (people willhave to call super when overriding these :[ )
    /**
     * @override Will load the initial state and start listening for updates
     */
    public componentWillMount(): void {
        ViewManager.registerView(this, this.props.moduleID);
    }

    /**
     * @override Will stop listening for updates
     */
    public componentWillUnmount(): void {
        ViewManager.deregisterView(this, this.props.moduleID);
        this.unmounted = true;
    }

    // State methods
    public getClass<V extends ExtendsClass<typeof ModuleView> = typeof ModuleView>(): V {
        return (this as any).__proto__.constructor;
    }

    static initialState: any = {}; // The initial state to be loaded for this class, will be replaced by createModuleView

    /**
     * Loads the initial state into the view
     * @param state The state to load
     */
    public loadInitialState(state: ModuleViewState<S, C>): void {
        this.setState(state);

        // @ts-ignore
        this.settings = state["~settings"];
    }

    /**
     * Updates the state of the view
     * @param state The parts of the state to update
     */
    public updateState(state: ModuleViewState<S, C>): void {
        this.setState(state);
    }

    // Error related methods
    /**@override */
    public static getDerivedStateFromError(error: Error): {error: Error} {
        // Update state so the next render will show the fallback UI.
        console.error(error);
        return {error};
    }

    //TODO: figure out typing
    /**@override */
    public componentDidCatch(error: Error, info): void {
        console.error(error, info);
    }

    // Rendering methods
    /**
     * @override The normal react render method
     */
    public render(): JSX.Element {
        // Render the loader while the state is not loaded
        if (Object.keys(this.state).length == 0) return this.renderLoader();

        // If an error eccured, render the error
        if (this.state.error) return this.renderError();

        // Renders the actual view otherwise
        return this.renderView();
    }

    /**
     * Renders a loader element
     * @returns An element to be displayed while the module is loading
     */
    protected renderLoader(): JSX.Element {
        return <span>Loading</span>;
    }

    /**
     * Renders a loader element
     * @returns An element to be displayed while the module is loading
     */
    protected renderError(): JSX.Element {
        return <span style={{color: "red"}}>{this.state.error.toString()}</span>;
    }

    /**
     * Renders the actual contents of module
     * @returns A custom element representing the view's dom
     */
    protected abstract renderView(): JSX.Element;
}

/**
 * A type representing a module view, where the generic parameter arguments can be left out
 */
export type ParameterizedModuleView = ModuleView<
    ModuleState,
    SettingsConfig,
    ParameterizedModule
>;
