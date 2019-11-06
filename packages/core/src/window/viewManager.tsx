import React from "react";
import {Json} from "../utils/_types/standardTypes";
import {ParameterizedModuleView, ModuleView} from "../module/moduleView";
import {IpcRenderer} from "../communication/ipcRenderer";
import {ParameterizedModuleViewState} from "../module/_types/moduleViewState";
import {Serialize} from "../utils/serialization/serialize";
import {SerializeableData} from "../utils/serialization/_types/serializeableData";
import {ModuleID, ModuleReference} from "../module/moduleID";
import {ViewCache} from "./viewCache";

// Any window will have a global windowID
declare const windowID: string;

/**
 * Keeps track of all of the views in the window and makes sure they are updated
 */
class ViewManagerSingleton {
    // Stores all of the views in this window
    protected readonly views: {
        [modulePath: string]: {
            [moduleID: string]: Promise<ParameterizedModuleView>[];
        };
    } = {};

    // Store views that are currently being loaded
    protected readonly loadingViews: {
        [modulePath: string]: {
            [moduleID: string]: ParameterizedModuleView[];
        };
    } = {};

    // The ID of the module whose view should be used of the view can't be found
    protected viewNotFoundID: ModuleID;

    // Data used to batch state fetches
    protected batchDelay = 1;
    protected stateBatch: {
        timeout: number;
        promise: Promise<ParameterizedModuleViewState[]>;
        requests: string[];
    } = {timeout: null, promise: null, requests: []};

    // Cache to store views that are (temporarily?) not visible
    protected viewCache = new ViewCache();

    /**
     * Creates a view manager
     */
    constructor() {
        // Listen for the main thread sending updates
        IpcRenderer.on("ViewManager.sendUpdate", (moduleID: string, data: Json) => {
            const stateChange = this.deserializeData(data);
            return this.updateModuleData(
                moduleID,
                stateChange as ParameterizedModuleViewState
            );
        });
    }

    /**
     * Sets the ID of the module to use for displaying the view not found message
     * @param ID The ID of the module
     */
    public setViewNotFoundID(ID: ModuleID) {
        this.viewNotFoundID = ID;
    }

    // View tracking methods
    /**
     * Obtains the list of module views
     * @param moduleID The moduleID to get the views for
     * @param create Whether or not to create the list if absent
     * @returns The list of module views, or undefined if there is no such list
     */
    protected getViews(
        moduleID: ModuleReference | string,
        create: boolean = false
    ): Promise<ParameterizedModuleView>[] | undefined {
        // Normalize  the request path
        if (typeof moduleID == "string") moduleID = new ModuleReference(moduleID);

        // Retrieve the module path
        const modulePath = moduleID.getModulePath();

        // Get the paths for this module
        let paths = this.views[modulePath];
        if (!paths) {
            if (create) paths = this.views[modulePath] = {};
            else return;
        }

        // Get the list of module views for this specific request path
        let moduleViews = paths[moduleID.toString()];
        if (!moduleViews) {
            if (create) moduleViews = paths[moduleID.toString()] = [];
            else return;
        }

        // Return the views
        return moduleViews;
    }

    /**
     * Retrieves the state of a module, and applies batching
     * @param moduleID The ID of the module to retrieve
     * @returns The state that was obtained
     */
    protected async retrieveViewState(
        moduleID: string | ModuleReference
    ): Promise<ParameterizedModuleViewState> {
        // Store the index that should be retrieved from the batched response, and add the request
        const index = this.stateBatch.requests.length;
        this.stateBatch.requests.push(moduleID.toString());

        // Initiate the request if none is present
        if (!this.stateBatch.timeout) {
            this.stateBatch.promise = new Promise(res => {
                this.stateBatch.timeout = setTimeout(async () => {
                    // Indicate that no request is present anymore to add to
                    this.stateBatch.timeout = null;
                    const requests = this.stateBatch.requests;
                    this.stateBatch.requests = [];

                    // Make the request and return its response
                    res(
                        (await IpcRenderer.send(
                            "WindowManager.getState",
                            requests,
                            windowID
                        ))[0]
                    );
                }, this.batchDelay) as any;
            });
        }

        // Wait for the request to resolve, and retrieve the correct response
        const states = await this.stateBatch.promise;
        return states[index];
    }

    /**
     * Registers a view such that it will receive updates
     * @param view The view to register
     * @param moduleID The moduleID of the module that the view represents
     * @returns The initial data for the module
     */
    public registerView(
        view: ParameterizedModuleView,
        moduleID: ModuleReference
    ): Promise<ParameterizedModuleView> {
        // Get the list of module views for this specific request path
        const moduleViews = this.getViews(moduleID, true);

        // Store the new promise that will resolve in a view
        let promise = new Promise(async (resolve, reject) => {
            // Set the initial state of the view from cache if possible
            const cachedState = this.viewCache.getViewState(moduleID);
            if (cachedState) view.loadInitialState(cachedState);

            // Get the initial state of the view
            let initialState: ParameterizedModuleViewState;
            if (moduleViews.length) {
                // Get the state from an existing module
                try {
                    const existingView = await moduleViews[0];
                    initialState = existingView.state;
                } catch (e) {}
            }

            // If either now such view existed, or it was removed before resolving
            if (!initialState) {
                // Get the initial state from the window manager
                const stateData = await this.retrieveViewState(moduleID);

                initialState = this.deserializeData(stateData) as any;
            }

            // Make sure the module hasn't updated its path by now (became a view for another module)
            // and hasn't been completed unmounted yet
            if (moduleID.equals(view.props.moduleID) && !view.unmounted) {
                // Update the state
                view.loadInitialState(initialState);

                // Resolve in to this view
                resolve(view);
            } else {
                // Otherwise, don't even resolve the promise,
                // and make sure it is removed (should already be the case because of unmount)
                reject("Module removed");

                this.deregisterView(promise, moduleID);
            }
        }) as Promise<ParameterizedModuleView>;
        moduleViews.push(promise);

        // Update the module count
        this.updateWindowModuleCount(moduleID);

        // Return the promise
        return promise;
    }

    /**
     * Deregisters a view such that it no longer receives updates
     * @param view The view to deregister
     * @param moduleID The moduleID of the module that the view represents
     */
    public deregisterView(
        view: Promise<ParameterizedModuleView>,
        moduleID: ModuleReference
    ): void {
        // Get the list of module views for this specific request path
        const moduleViews = this.getViews(moduleID);
        if (!moduleViews) return;

        // Remove the module if present
        let index = moduleViews.indexOf(view);
        if (index == -1) return;
        moduleViews.splice(index, 1);

        // Update the module count
        this.updateWindowModuleCount(moduleID);

        // Add the view's state to the cache
        view.then(view => {
            this.viewCache.addViewState(view.props.moduleID.toString(), view.state);
        });
    }

    /**
     * Updates the module count in the WindowManager for a given module instance
     * @param moduleID The module to update the count for
     */
    protected async updateWindowModuleCount(moduleID: ModuleReference): Promise<void> {
        // Get the list of module views for this specific request path
        const moduleViews = this.getViews(moduleID);

        //  Check how many instances there are
        let count = moduleViews ? moduleViews.length : 0;

        // Send the new count
        await IpcRenderer.send(
            "WindowManager.updateCount",
            windowID,
            moduleID.toString(),
            count
        );
    }

    // View creation methods
    /**
     * Retrieves an instance of the GUI of the given request path
     * @param moduleID The ID which to retieve a view for
     * @returns A new view for the given moduleID
     */
    public createModuleView(moduleID: ModuleID | string): JSX.Element {
        // Normalize the moduleID
        if (typeof moduleID == "string") moduleID = new ModuleID(moduleID);

        // Retrieve the module path
        const ModuleClass = moduleID.getModuleClass();

        // Extract the view and remote proxy classes
        const ModuleViewClass: typeof ModuleView = ModuleClass.getConfig()
            .viewClass as any;
        if (!ModuleViewClass) return this.getViewNotFoundView(moduleID);
        const RemoteProxyClass = ModuleClass.getRemoteProxyClass();

        // Create an instance of this remote proxy
        const moduleProxy = RemoteProxyClass.createInstance(moduleID);

        // Return a jsx element of the view
        return (
            <ModuleViewClass
                key={moduleID.toString()} // Make sure that a new instance is created for a new module ID
                moduleID={moduleID.toString()}
                module={moduleProxy}
            />
        );
    }

    /**
     * Obtains a view for a module that has no view, by using the 'viewNotFound' module type
     * @param moduleID The module for which to create a view
     * @returns A new view not found view for the given moduleID
     */
    protected getViewNotFoundView(moduleID: ModuleID | string): JSX.Element {
        // Normalize the moduleID
        if (typeof moduleID == "string") moduleID = new ModuleID(moduleID);

        // Get the module classes from the ID
        const ViewNotFoundModuleClass = this.viewNotFoundID.getModuleClass();
        const ModuleClass = moduleID.getModuleClass();

        // Extract the view and remote proxy classes for the viewNotFound module
        const ViewNotFoundModuleViewClass = ViewNotFoundModuleClass.getConfig()
            .viewClass as any;
        const RemoteProxyClass = ViewNotFoundModuleClass.getRemoteProxyClass();

        // Create an instance of this remote proxy
        const moduleProxy = RemoteProxyClass.createInstance(this.viewNotFoundID);

        // Return a jsx element of the view, and pass relevant data of what module it is displaying
        return (
            <ViewNotFoundModuleViewClass
                moduleID={this.viewNotFoundID}
                key={moduleID.toString()} // Make sure that a new instance is created for a new module ID
                module={moduleProxy}
                target={{cls: ModuleClass, id: moduleID}}
            />
        );
    }

    // View maintenance methods
    /**
     * Updates the states of all views for the given module ID
     * @param moduleID The moduleID of the module that updated
     * @param updatedData The data of the module that updated
     */
    protected updateModuleData(
        moduleID: ModuleReference | string,
        updatedData: ParameterizedModuleViewState
    ): void {
        // Get the list of module views for this specific request path
        const moduleViews = this.getViews(moduleID);
        if (!moduleViews) return;

        // Update the state
        moduleViews.forEach(async moduleView =>
            (await moduleView).changeState(updatedData)
        );
    }

    /**
     * Deserializes json data (Adding jsx elements)
     * @param data The data to deserialize
     * @returns The deserialized data
     */
    protected deserializeData(data: Json): SerializeableData {
        return Serialize.deserialize(data, requestPath =>
            this.createModuleView(requestPath)
        );
    }
}

export const ViewManager = new ViewManagerSingleton();
