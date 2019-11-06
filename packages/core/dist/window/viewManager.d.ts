/// <reference types="react" />
import { Json } from "../utils/_types/standardTypes";
import { ParameterizedModuleView } from "../module/moduleView";
import { ParameterizedModuleViewState } from "../module/_types/moduleViewState";
import { SerializeableData } from "../utils/serialization/_types/serializeableData";
import { ModuleID, ModuleReference } from "../module/moduleID";
import { ViewCache } from "./viewCache";
/**
 * Keeps track of all of the views in the window and makes sure they are updated
 */
declare class ViewManagerSingleton {
    protected readonly views: {
        [modulePath: string]: {
            [moduleID: string]: Promise<ParameterizedModuleView>[];
        };
    };
    protected readonly loadingViews: {
        [modulePath: string]: {
            [moduleID: string]: ParameterizedModuleView[];
        };
    };
    protected viewNotFoundID: ModuleID;
    protected batchDelay: number;
    protected stateBatch: {
        timeout: number;
        promise: Promise<ParameterizedModuleViewState[]>;
        requests: string[];
    };
    protected viewCache: ViewCache;
    /**
     * Creates a view manager
     */
    constructor();
    /**
     * Sets the ID of the module to use for displaying the view not found message
     * @param ID The ID of the module
     */
    setViewNotFoundID(ID: ModuleID): void;
    /**
     * Obtains the list of module views
     * @param moduleID The moduleID to get the views for
     * @param create Whether or not to create the list if absent
     * @returns The list of module views, or undefined if there is no such list
     */
    protected getViews(moduleID: ModuleReference | string, create?: boolean): Promise<ParameterizedModuleView>[] | undefined;
    /**
     * Retrieves the state of a module, and applies batching
     * @param moduleID The ID of the module to retrieve
     * @returns The state that was obtained
     */
    protected retrieveViewState(moduleID: string | ModuleReference): Promise<ParameterizedModuleViewState>;
    /**
     * Registers a view such that it will receive updates
     * @param view The view to register
     * @param moduleID The moduleID of the module that the view represents
     * @returns The initial data for the module
     */
    registerView(view: ParameterizedModuleView, moduleID: ModuleReference): Promise<ParameterizedModuleView>;
    /**
     * Deregisters a view such that it no longer receives updates
     * @param view The view to deregister
     * @param moduleID The moduleID of the module that the view represents
     */
    deregisterView(view: Promise<ParameterizedModuleView>, moduleID: ModuleReference): void;
    /**
     * Updates the module count in the WindowManager for a given module instance
     * @param moduleID The module to update the count for
     */
    protected updateWindowModuleCount(moduleID: ModuleReference): Promise<void>;
    /**
     * Retrieves an instance of the GUI of the given request path
     * @param moduleID The ID which to retieve a view for
     * @returns A new view for the given moduleID
     */
    createModuleView(moduleID: ModuleID | string): JSX.Element;
    /**
     * Obtains a view for a module that has no view, by using the 'viewNotFound' module type
     * @param moduleID The module for which to create a view
     * @returns A new view not found view for the given moduleID
     */
    protected getViewNotFoundView(moduleID: ModuleID | string): JSX.Element;
    /**
     * Updates the states of all views for the given module ID
     * @param moduleID The moduleID of the module that updated
     * @param updatedData The data of the module that updated
     */
    protected updateModuleData(moduleID: ModuleReference | string, updatedData: ParameterizedModuleViewState): void;
    /**
     * Deserializes json data (Adding jsx elements)
     * @param data The data to deserialize
     * @returns The deserialized data
     */
    protected deserializeData(data: Json): SerializeableData;
}
export declare const ViewManager: ViewManagerSingleton;
export {};
