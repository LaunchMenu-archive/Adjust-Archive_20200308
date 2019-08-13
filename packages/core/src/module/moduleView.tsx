import React from "react";
import {ParameterizedModule} from "./module";
import {DeepReadonly, ExtendsClass} from "../utils/_types/standardTypes";
import {ViewManager} from "../window/viewManager";
import {ModuleState} from "./_types/moduleState";
import {ModuleViewState} from "./_types/moduleViewState";
import {RemoteModule} from "./_types/remoteModule";
import {ModuleViewProps} from "./_types/moduleViewProps";
import {SettingsConfig} from "../storage/settings/_types/settingsConfig";
import {SettingsConfigSetData} from "../storage/settings/_types/settingsConfigSetData";
import {ExtendedObject} from "../utils/extendedObject";
import {SettingsConfigSet} from "../storage/settings/_types/settingsConfigSet";

/**
 * A class that can visually represent the module
 */
export abstract class ModuleView<
    S extends ModuleState,
    C extends SettingsConfigSet,
    M extends ParameterizedModule,
    D extends any
> extends React.Component<ModuleViewProps<M>, ModuleViewState<S, C, D>> {
    // Indicates whether this react component has been completely unmounted
    public unmounted: boolean = false;

    // A promise that resolves in this instance once it finished loading
    protected self: Promise<this>;

    // A proxy to the module that this view is representing
    protected readonly module: RemoteModule<M>;

    // The settings of the module
    protected readonly settings: DeepReadonly<SettingsConfigSetData<C>>;

    // The data that the module received when requested
    protected readonly data: DeepReadonly<D>;

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
        this.self = ViewManager.registerView(this, this.props.moduleID) as any;
        this.self.catch(() => {
            // Unmounted before having been initalized
        });
    }

    /**
     * @override Will stop listening for updates
     */
    public componentWillUnmount(): void {
        ViewManager.deregisterView(this.self, this.props.moduleID);
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
    public loadInitialState(state: ModuleViewState<S, C, D>): void {
        // @ts-ignore
        this.settings = state["~settings"];

        // @ts-ignore
        this.data = state["~data"];

        this.setState(curState => this.getNewState(curState, state));
    }

    /**
     * Updates the state of the view
     * @param state The parts of the state to update
     */
    public updateState(state: ModuleViewState<S, C, D>): void {
        this.setState(
            curState => this.getNewState(curState, state),
            // @ts-ignore
            () => (this.settings = this.state["~settings"])
        );
    }

    /**
     * Augments the state changes to full state fields
     * ({something:{stuff:3}} to {something:{stuff:3, otherCurVal:5}})
     * @param oldState The current state data
     * @param changes The changed path values
     * @modifies changes
     */
    protected getNewState(
        oldState: ModuleViewState<S, C, D>,
        changes: ModuleViewState<S, C, D>
    ): ModuleViewState<S, C, D> {
        return ExtendedObject.map(changes, ((value, key) => {
            const curValue = oldState[key] as any;
            // Copy the missing values from current into the changes
            if (
                ExtendedObject.isPlainObject(value) &&
                ExtendedObject.isPlainObject(curValue)
            )
                return ExtendedObject.copyData(
                    value,
                    ExtendedObject.copyData(curValue, {}),
                    undefined,
                    false
                );

            // If either the new or old value is not a plain object, return it
            return value;
        }) as any) as any;
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

        // If the module has stopped, render it stopped
        if (this.state.isStopped) return this.renderStopped();

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
     * Renders an element if this module was stopped
     * @returns An element to be displayed when the module was stoppped
     */
    protected renderStopped(): JSX.Element {
        return <span>Stopped</span>;
    }

    /**
     * Renders an error element
     * @returns An element to be displayed when the module rendering errored
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
    SettingsConfigSet,
    ParameterizedModule,
    any
>;
