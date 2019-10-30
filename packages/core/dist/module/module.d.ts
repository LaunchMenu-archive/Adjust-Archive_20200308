import { DeepReadonly, ExtendsClass, Json } from "../utils/_types/standardTypes";
import { RemoteModuleProxy } from "./remoteModuleProxy";
import { ModuleState } from "./_types/moduleState";
import { SerializedModule } from "./_types/serializedModule";
import { ParameterizedNormalizedModuleConfig, NormalizedModuleConfig } from "./_types/moduleConfig";
import { ModuleRequestData } from "./_types/moduleRequestData";
import { SettingsConfig } from "../storage/settings/_types/settingsConfig";
import { Settings } from "../storage/settings/settings";
import { StateData } from "../state/stateData";
import { RequestPath } from "./requestPath/requestPath";
import { ParameterizedModuleView } from "./moduleView";
import { DataChange } from "../storage/_types/dataChange";
import { ModuleContract, ChildModule } from "./_types/moduleContract";
import { ModuleProxy } from "./moduleProxy";
import { ParentlessRequest, ParameterizedRequest } from "../registry/_types/request";
import { RequestFilter } from "../registry/_types/requestFilter";
import { ModuleID } from "./moduleID";
import { SettingsFile } from "../storage/settings/settingsFile";
import { SettingsConditions } from "../storage/settings/settingsConditions/abstractSettingsConditions";
import { SettingsConfigData } from "../storage/settings/_types/settingsConfigData";
import { NormalizedModuleDetails } from "./_types/moduleDetails";
import { Package } from "../utils/_types/package";
export declare const baseConfig: {
    version: string;
    details: {
        icon: string;
        name: string;
        description: string;
        section: string;
    };
    package: any;
    settings: {};
    settingsMigrators: {};
    state: {
        isStopping: boolean;
        isStopped: boolean;
    };
    onInstall: () => void;
    onLoad: () => void;
    abstract: boolean;
    type: any;
    viewClass: any;
    getPriority: () => number;
};
/**
 * The base class to build your app using adjust gui
 *
 * Takes care of the following tasks:
 * -    Tracking modue file location for importing it
 * -    Storing a serializable state
 * -    Storing settings that can be altered by the user
 *
 */
export declare class Module<S extends ModuleState, C extends SettingsConfig<any>, I extends ModuleContract> implements ChildModule<{}> {
    private initPromise;
    private readonly ID;
    private readonly requestData;
    parent: I["parent"];
    private readonly parents;
    readonly settings: DeepReadonly<SettingsConfigData<C>>;
    private readonly settingsObject;
    readonly state: DeepReadonly<S>;
    private readonly stateObject;
    private readonly children;
    /**
     * The core building block for Adjust applications
     * @returns An unregistered instance of this module
     */
    protected constructor();
    /**
     * The core building block for Adjust applications
     * @param request The relevant data of the request that created this instance
     * @param moduleID The ID of this module
     * @param initialState The intial state that the module should have
     * @param parents The list of parents of the module
     * @returns An unregistered instance of this module
     */
    protected static construct<S extends ModuleState, C extends SettingsConfig, I extends ModuleContract>(request: ModuleRequestData<I>, moduleID: ModuleID, initialState: S, parents: I["parent"][]): Promise<Module<S, C, I>>;
    /**
     * Get the request path for this module based on its parent and the ID
     * @param moduleID The ID of this module
     * @param parent The parent of this module
     * @param data The json data that was send with this request
     * @returns The request path obtained
     */
    static createRequestPath(moduleID: ModuleID, parent: ModuleProxy, data: Json): RequestPath;
    /**
     * Creates an instance of this module, given an ID for the instance and a request
     * @param request The request that started the creation of the module
     * @param moduleID The ID that the new instance should have
     * @returns A new instance of this class
     */
    static createInstance(request: ParameterizedRequest, moduleID: ModuleID): Promise<any>;
    /**
     * A method that gets called to perform initialisation, immediately when the module was created
     * Will automaticcally be called once, upon creation. This method will run before init, and even before the module's settings have been pbtained (and thus can't used them)
     */
    preInit(): Promise<void>;
    /**
     * A method that gets called to perform initialisation, immediately when the module was created
     * Will automaticcally be called once, upon creation. This method will run before init, and even before the module's settings have been pbtained (and thus can't used them)
     */
    protected onPreInit(): Promise<void>;
    /**
     * A method that gets called to perform initialisation,
     * Will be called when a new module connects as well, but will ensure that onInit is called only once
     * (will be called by external setup method, such as from a module provider)
     * @param fromReload Whether or not this module is initialised with a state already present (reloading a previous state)
     * @param extraInit Additional method to call on init
     * @returns Whether or not this was the initial reload
     */
    init(fromReload: boolean, extraInit?: (fromReload: boolean) => Promise<void>): Promise<boolean>;
    /**
     * A method that gets called to perform any initialization,
     * will be called only once, after having been added to the state
     * @param fromReload Whether or not this module is initialised with a state already present (reloading a previous state)
     */
    protected onInit(fromReload: boolean): Promise<void>;
    /**
     * Retrieves the entire state object of the module
     * @returns The entire state object on which listeners could be registered
     */
    getStateObject(): StateData<S>;
    /**
     * Changes the current state of the module
     * @param changedProps An object containing any fields of the state that have changed
     * @returns A promise that resolves once all listeners have resolved
     */
    changeState(changedProps: DataChange<S>): Promise<void>;
    /**
     * Retrieves the entire settings object of the module
     * @returns The entire settings object on which listeners could be registered
     */
    getSettingsObject(): Settings<C>;
    /**
     * Changes the settings of the module
     * @param changedProps An object containing any fields of the settings that have changed
     * @param condition The settings condition to store the data under
     * @returns A promise that resolves once all listeners have resolved
     */
    changeSettings(changedProps: DataChange<SettingsConfigData<C>>, condition?: SettingsConditions): Promise<void>;
    /**
     * Serializes the entire module, based on the state
     * @returns An object containing all the module's relevant data
     */
    serialize(): SerializedModule;
    /**
     * Creates an instance of this module, given an ID for the instance and serialized data representing an instance
     * @param serializedData The serialized data, obtained by serializing a previous instance
     * @param moduleID The ID that the new instance should have
     * @returns A new instance of this class
     */
    static recreateInstance(serializedData: SerializedModule, moduleID: ModuleID): Promise<Module<{}, SettingsConfig<import("../storage/settings/_types/settingsConfigSet").SettingsConfigSet>, ModuleContract>>;
    /**
     * Deserializes the data that defines the module's own state
     * @param data The data to be deserialized
     */
    deserialize(data: SerializedModule["data"]): Promise<void>;
    /**
     * Returns the ID of this module
     * @returns The ID
     */
    getID(): ModuleID;
    /** @override */
    toString(): string;
    /**
     * Retrieves the request that instanciated this module
     * @returns The request
     */
    getRequest(): ModuleRequestData<I> & {
        parent: ParameterizedModule;
    };
    /**
     * Retrieves the request path for this module
     * @returns The request path
     */
    getRequestPath(): RequestPath;
    /**
     * Retrieves the request data for this module
     * @returns The request data
     */
    getData(): I["data"];
    /**
     * Retrieves the parent of this module
     * @returns The parent that made the request
     */
    getParent(): I["parent"];
    /**
     * Retrievs the additional parents of this module of any
     * @returns An array of the additional parents
     */
    getParents(): I["parent"][];
    /**
     * Adds an additonal parent to the module (for when obtained with instance module provider)
     * @param parent The new parent to add
     */
    notifyParentAdded(parent: I["parent"]): void;
    /**
     * Removes an additional parent from the module (for when an additional parent closes the child)
     * @param parent The parent to remove
     * @returns Whether this was the last parent
     */
    protected notifyParentRemoved(parent: I["parent"]): boolean;
    /**
     * Checks whether the given parent is this module's last parent
     * @param parent The parent to check
     * @returns Whether or not this parent is the module's last parent
     */
    protected isLastParent(parent: I["parent"]): boolean;
    /**
     * Called when any parent is removed (Either the main or additional parent)
     * @param parent The parent that was removed
     */
    onRemoveParent(parent: I["parent"]): void;
    /**
     * Called when the main parent is removed, but an additional parent may take over
     * @param newParent The additional parent that is taking over
     * @param oldParent The previously main parent that got removed
     */
    onChangeParent(newParent: I["parent"], oldParent: I["parent"]): void;
    /**
     * Retrieves modules based on the given request specification
     * @param request The request to base the modules to retrieve on
     * @returns The modules that were either created or obtained
     */
    request<M extends ModuleContract>(this: M["parent"], request: ParentlessRequest<M> & {
        use: "all" | RequestFilter<M>;
    }): Promise<(M["child"])[]>;
    /**
     * Retrieves a module based on the given request specification
     * @param request The request to base the module to retrieve on
     * @returns The module that was either created or obtained
     */
    request<M extends ModuleContract>(this: M["parent"], request: ParentlessRequest<M>): Promise<M["child"]>;
    private callContext;
    /**
     * Retrieves the context that this method was called from, should be called before any awaits
     * @returns The program node from which the method was called
     * @throws {IllegalStateException} If the method is not called from the start of a interface method
     */
    protected getCallContext(): ModuleProxy;
    /**
     * Updates the call context, should only be invoked by the proxy
     * @param callContext The new context
     */
    setCallContext(callContext: ModuleProxy): void;
    /**
     * Indicates that this module is now the parent of the given module
     * @param module The module that is now a child of this module
     */
    notifyChildAdded(module: ModuleProxy): void;
    /**
     * Indicates that this module is no longer the parent of the given module
     * @param module The module that is no longer a child of this module (due to being closed)
     */
    notifyChildRemoved(module: ModuleProxy): void;
    /**
     * Stop and close the module
     */
    close(): Promise<void>;
    /**
     * A hook for tasks to execute when the node is closed
     */
    protected onClose(): Promise<void>;
    /**
     * Stops the program node's tasks
     */
    stop(): Promise<void>;
    /**
     * A hook for tasks to execute when the node is stopped
     */
    protected onStop(): Promise<void>;
    /**
     * Stops all of the children and awaits them
     */
    protected stopChildren(): Promise<void>;
    /**
     * Disposes all stored resources of the node and unlinks itself from the state
     */
    protected destroy(): Promise<void>;
    /*************************
     * Class related methods *
     *************************/
    protected static proxyClass: ExtendsClass<typeof Module>;
    protected static remoteProxyClass: ExtendsClass<typeof RemoteModuleProxy>;
    /**
     * Gets a 'singleton' remote proxy class for this module class
     * @returns The remoteModuleProxy for this module class
     */
    static getRemoteProxyClass(): ExtendsClass<typeof RemoteModuleProxy>;
    /**
     * Gets a 'singleton' proxy class for this node
     * @returns The programNodeProxy for this programNode class
     */
    protected static getProxyClass(): ExtendsClass<typeof Module>;
    /**
     * Creates a proxy for this program node
     * @returns The created proxy
     */
    createProxy(): ModuleProxy;
    /**
     * A hook for detecting when the module has been loaded
     * @remarks Useful if the module path is required
     * @param isMain Whether or not the class was loaded in the main process
     * @param modulePath The path of this module
     */
    protected static onFileLoad(isMain: boolean, modulePath: string): void;
    static config: {
        version: string;
        details: {
            icon: string;
            name: string;
            description: string;
            section: string;
        };
        package: any;
        settings: {};
        settingsMigrators: {};
        state: {
            isStopping: boolean;
            isStopped: boolean;
        };
        onInstall: () => void;
        onLoad: () => void;
        abstract: boolean;
        type: any;
        viewClass: any;
        getPriority: () => number;
    };
    /**
     * Retrieves the config of the module
     * @returns The module's config
     */
    static getConfig(): ParameterizedNormalizedModuleConfig;
    /**
     * Retrieves an instance of the settings file for this module
     * @returns The settings file instance
     */
    static getSettingsFile(): Promise<SettingsFile<any>>;
    /**
     * Retrieves the package of the module
     * @returns THe module's package
     */
    static getPackage(): Package;
    /**
     * Retrieves the details of the module to be displayed to the user
     * @returns The module's details
     */
    static getDetails(): NormalizedModuleDetails;
    /**
     * Loads the module and installs if there is no settings file present for it
     * @returns A promise that resolves when installation is complete, indicating whether installation happened
     */
    static loadAndInstallIfRequired(): Promise<boolean>;
    /**
     * Retrieves the config of the module
     * @returns The module's config
     */
    getConfig(): NormalizedModuleConfig<S, C["settings"], I>;
    /**
     * Assigns a view class to the config of this module
     * @param viewClass The view class to relate to this module class
     */
    static setViewClass(viewClass: ExtendsClass<ParameterizedModuleView>): void;
    getClass<PN extends ExtendsClass<typeof Module> = typeof Module>(): PN;
    protected static path: string;
    /**
     * Returns the path to this file, relative to the modules folder
     * @returns The path to this file
     */
    static getPath(): string;
    /**
     * Returns the path to this module class
     * @returns The path to this module class
     * @public
     */
    static toString(): string;
}
/**
 * A type representing a module, where the generic parameter arguments can be left out
 */
export declare type ParameterizedModule = Module<ModuleState, SettingsConfig<any>, ModuleContract>;
