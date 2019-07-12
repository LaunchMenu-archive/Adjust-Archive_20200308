import {DeepReadonly, ExtendsClass, Json} from "../utils/_types/standardTypes";
import {RemoteModuleProxy} from "./remoteModuleProxy";
import {ModuleState} from "./_types/moduleState";
import {SerializedModule} from "./_types/serializedModule";
import {
    ParameterizedNormalizedModuleConfig,
    NormalizedModuleConfig,
} from "./_types/moduleConfig";
import {
    ModuleRequestData,
    ParameterizedModuleRequestData,
} from "./_types/moduleRequestData";
import {ProgramState} from "../state/programState";
import {SettingsConfig} from "../storage/settings/_types/settingsConfig";
import {SettingsData} from "../storage/settings/_types/settingsData";
import {Settings} from "../storage/settings/settings";
import {StateData} from "../state/stateData";
import {RequestPath} from "./requestPath/requestPath";
import {ParameterizedModuleView} from "./moduleView";
import {JsonPartial} from "../storage/_types/jsonPartial";
import {ModuleInterface} from "./_types/moduleInterface";
import {Registry} from "../registry/registry";
import {ModuleProxy} from "./moduleProxy";
import {ParentlessRequest, ParameterizedRequest} from "../registry/_types/request";
import {ExtendedObject} from "../utils/extendedObject";
import {PublicModuleMethods} from "./_types/publicModuleMethods";
import {RequestFilter} from "../registry/_types/requestFilter";
import {ModuleID} from "./moduleID";
import {SettingsManager} from "../storage/settings/settingsManager";
import {SettingsFile} from "../storage/settings/settingsFile";

export const baseConfig = {
    settings: {},
    initialState: {
        isStopping: false,
        isStopped: false,
    },
    abstract: true,
    type: null,
    viewClass: undefined,
    getPriority: () => 1,
};

/**
 * A class containing data for importing it (its actual file location),
 * a state that can be serialized and deserialized and
 * a settings object that stores settings for this type of component
 */
export class Module<
    S extends ModuleState,
    C extends SettingsConfig,
    I extends ModuleInterface
> implements PublicModuleMethods {
    // ID
    readonly ID: ModuleID;

    // Request
    private readonly requestData: ModuleRequestData<I>;
    parent: I["parent"];
    readonly parents: I["parent"][]; // A list of all 'parents'

    // Settings
    readonly settings: DeepReadonly<SettingsData<C>>;
    readonly settingsObject: Settings<C>;

    // State
    readonly state: DeepReadonly<S>; // An easy to reference object to get state properties
    readonly stateObject: StateData<S>; // The full state object, to which listeners can be added

    /**
     * The core building block for Adjust applications
     * @returns An unregistered instance of this module
     */
    protected constructor() {}

    /**
     * The core building block for Adjust applications
     * @param request The relevant data of the request that created this instance
     * @param moduleID The ID of this module
     * @param initialState The intial state that the module should have
     * @param parents The list of parents of the module
     * @returns An unregistered instance of this module
     */
    protected static async construct<
        S extends ModuleState,
        C extends SettingsConfig,
        I extends ModuleInterface
    >(
        request: ModuleRequestData<I>,
        moduleID: ModuleID,
        initialState: S,
        parents: I["parent"][]
    ): Promise<Module<S, C, I>> {
        const module = new this();

        // Setup request related data
        // @ts-ignore
        module.requestData = request;
        // @ts-ignore
        module.ID = moduleID;
        // @ts-ignore
        module.parents = parents;
        module.parent = module.parents[0];

        // Settings initialization
        // @ts-ignore
        module.settingsObject = await Settings.createInstance(module);
        // @ts-ignore
        module.settings = module.settingsObject.get;

        // State initialization
        // @ts-ignore
        module.stateObject = new StateData(initialState);
        // @ts-ignore
        module.state = module.stateObject.get;

        return module as any;
    }

    /**
     * Get the request path for this module based on its parent and the ID
     * @param moduleID The ID of this module
     * @param parent The parent of this module
     * @param data The json data that was send with this request
     * @returns The request path obtained
     */
    public static createRequestPath(
        moduleID: ModuleID,
        parent: ModuleProxy,
        data: Json
    ): RequestPath {
        if (parent) {
            // Extend the parent's path
            const parentRequestPath = ((parent as any) as ParameterizedModule).getRequestPath();
            return parentRequestPath.extend(moduleID, data);
        } else {
            // If the module is a root, create a path from scratch
            return new RequestPath(moduleID, data);
        }
    }

    /**
     * Creates an instance of this module, given an ID for the instance and a request
     * @param request The request that started the creation of the module
     * @param moduleID The ID that the new instance should have
     * @returns A new instance of this class
     */
    public static async createInstance(
        request: ParameterizedRequest,
        moduleID: ModuleID
    ): Promise<any> {
        // Obtain the required data to instanciate the module
        const initialState = this.getConfig().initialState;
        (request as any).requestPath = this.createRequestPath(
            moduleID,
            request.parent as any,
            request.data
        );
        const parents = request.parent ? [request.parent] : [];

        // Create the instance
        return this.construct(request as any, moduleID, initialState, parents);
    }

    // Initialisation
    /**
     * A method that gets called to perform initialisation,
     * should be called only once, after having been added to the program state
     * (will be called by external setup method, such as in classModuleProvider)
     */
    public async init(): Promise<void> {
        this.onInit();
    }

    /**
     * A method that gets called to perform any required initialization on reload
     * (will be called by internal setup method; deserialize)
     */
    public async reloadInit(): Promise<void> {
        this.onReloadInit();
    }

    /**
     * A method that gets called to perform any initialization,
     * will be called only once, after having been added to the state
     */
    protected async onInit(): Promise<void> {}

    /**
     * A method that gets called to perform any required initialization on reload
     */
    protected async onReloadInit(): Promise<void> {}

    // State related methods
    /**
     * Retrieves the entire state object of the module
     * @returns The entire state object on which listeners could be registered
     */
    public getStateObject(): StateData<S> {
        return this.stateObject;
    }

    /**
     * Changes the current state of the module
     * @param changedProps An object containing any fields of the state that have changed
     * @returns A promise that resolves once all listeners have resolved
     */
    public async setState(changedProps: JsonPartial<S>): Promise<void> {
        return this.stateObject.changeData(changedProps as any);
    }

    // Settings related methods
    /**
     * Retrieves the entire settings object of the module
     * @returns The entire settings object on which listeners could be registered
     */
    public getSettingsObject(): Settings<C> {
        return this.settingsObject;
    }

    // Serialization related methods
    /**
     * Serializes the entire module, based on the state
     * @returns An object containing all the module's relevant data
     */
    public serialize(): SerializedModule {
        const requestData = this.getRequest();
        return {
            $type: this.getClass().getPath(),
            data: {
                request: {
                    ...(ExtendedObject.filter(
                        requestData,
                        (v, k) => ["use", "type"].indexOf(k) == -1
                    ) as any),
                    requestPath: requestData.requestPath.toString(),
                    parent: requestData.parent && requestData.parent.getID().toString(),
                },
                parents: this.parents.map(parent => parent.getID().toString()),
                state: this.stateObject.serialize(),
            },
        };
    }

    /**
     * Creates an instance of this module, given an ID for the instance and serialized data representing an instance
     * @param serializedData The serialized data, obtained by serializing a previous instance
     * @param moduleID The ID that the new instance should have
     * @returns A new instance of this class
     */
    public static async recreateInstance(
        serializedData: SerializedModule,
        moduleID: ModuleID
    ) {
        // The data is a serialized module
        const data = serializedData.data;

        // Obtain the required data to instanciate the module
        const request = {
            ...data.request,
            requestPath: new RequestPath(data.request.requestPath),
        };

        // Create the instance
        return await this.construct(request, moduleID, {}, []);
    }

    /**
     * Deserializes the data that defines the module's own state
     * @param data The data to be deserialized
     */
    public deserialize(data: SerializedModule["data"]): void {
        // Update the parents
        const parents = data.parents.map(parent =>
            ProgramState.getModule(parent).createProxy()
        );
        this.parents.push.apply(this.parents, parents);
        this.parent = this.parents[0];

        // Deserialize the state
        this.stateObject.deserialize(data.state, this);

        // Finish by calling the init hook
        this.reloadInit();
    }

    // Request related methods
    /**
     * Returns the ID of this module
     * @returns The ID
     */
    public getID(): ModuleID {
        return this.ID;
    }

    /** @override */
    public toString(): string {
        return this.ID.toString();
    }

    /**
     * Retrieves the request that instanciated this module
     * @returns The request
     */
    public getRequest(): ModuleRequestData<I> & {parent: ParameterizedModule} {
        return this.requestData as any;
    }

    /**
     * Retrieves the request path for this module
     * @returns The request path
     */
    public getRequestPath(): RequestPath {
        return this.requestData.requestPath;
    }

    /**
     * Retrieves the request data for this module
     * @returns The request data
     */
    public getData(): I["data"] {
        return this.requestData.data;
    }

    /**
     * Retrieves the parent of this module
     * @returns The parent that made the request
     */
    public getParent(): I["parent"] {
        return this.parent;
    }

    /**
     * Retrievs the additional parents of this module of any
     * @returns An array of the additional parents
     */
    public getParents(): I["parent"][] {
        return this.parents;
    }

    /**
     * Adds an additonal parent to the module (for when obtained with instance module provider)
     * @param parent The new parent to add
     */
    public addParent(parent: I["parent"]): void {
        this.parents.push(parent as any);
    }

    /**
     * Removes an additional parent from the module (for when an additional parent closes the child)
     * @param parent The parent to remove
     * @returns Whether this was the last parent
     */
    protected removeParent(parent: I["parent"]): boolean {
        // Remove the parent
        const index = this.parents.indexOf(parent);
        if (index >= 0) {
            this.parents.splice(index, 1);

            // Notify about the parent disconnect
            this.onRemoveParent(parent);

            // Check if this is the main parent, and if so, replace it
            if (parent == this.parent) {
                this.parent = this.parents[0];

                // Check if there is a replacement
                if (this.parent) this.onChangeParent(this.parent, parent);
                else return true;
            }
        }
    }

    /**
     * Called when any parent is removed (Either the main or additional parent)
     * @param parent The parent that was removed
     */
    public onRemoveParent(parent: I["parent"]): void {}

    /**
     * Called when the main parent is removed, but an additional parent may take over
     * @param newParent The additional parent that is taking over
     * @param oldParent The previously main parent that got removed
     */
    public onChangeParent(newParent: I["parent"], oldParent: I["parent"]): void {}

    /**
     * Retrieves modules based on the given request specification
     * @param request The request to base the modules to retrieve on
     * @returns The modules that were either created or obtained
     */
    public async request<M extends ModuleInterface>(
        this: M["parent"],
        request: ParentlessRequest<M> & {
            use: "all" | RequestFilter<M>;
        }
    ): Promise<(M["child"] & PublicModuleMethods)[]>;

    /**
     * Retrieves a module based on the given request specification
     * @param request The request to base the module to retrieve on
     * @returns The module that was either created or obtained
     */
    public async request<M extends ModuleInterface>(
        this: M["parent"],
        request: ParentlessRequest<M>
    ): Promise<M["child"] & PublicModuleMethods>;

    public async request<M extends ModuleInterface>(
        this: M["parent"],
        request: ParentlessRequest<M>
    ): Promise<M["child"] & PublicModuleMethods | (M["child"] & PublicModuleMethods)[]> {
        return Registry.request({parent: this, ...request} as any);
    }

    // Channel related methods
    private callContext: ModuleProxy;

    /**
     * Retrieves the context that this method was called from, should be called before any awaits
     * @returns The program node from which the method was called
     * @throws {IllegalStateException} If the method is not called from the start of a interface method
     */
    protected getCallContext(): ModuleProxy {
        if (this.callContext === undefined)
            throw Error("Method shouldn't be called after an async call");
        return this.callContext;
    }

    /**
     * Updates the call context, should only be invoked by the proxy
     * @param callContext The new context
     */
    public setCallContext(callContext: ModuleProxy): void {
        this.callContext = callContext;
    }

    // Closing related methods
    /**
     * Stop and close the module
     */
    public async close(): Promise<void> {
        // Get the caller of the method, and make sure it's a parent
        const context = this.getCallContext();
        if (context.isParentof(this)) {
            // Remove the parent, and only close the module if it was the last parent
            if (this.removeParent(context)) {
                // Stop and destroy thismodule
                await this.stop();
                await this.destroy();
            }
        } else throw Error("Module may only be closed by its parent");
    }

    /**
     * Stops the program node's tasks
     */
    public async stop(): Promise<void> {
        // Indicate we are now attempting to stop
        await this.setState({
            isStopping: true,
        } as any);

        // Perform stopping methods
        await this.stopChildren();
        await this.onStop();

        // TODO: Close communication channel

        // Indicate the module has now stopped
        this.setState({
            isStopped: true,
        } as any);
    }

    /**
     * A hook for tasks to execute when the node is stopped
     */
    protected async onStop(): Promise<void> {}

    /**
     * Stops all of the children and awaits them
     */
    protected async stopChildren(): Promise<void> {
        // TODO: make sure to check whether module is closed before removing it from state
        // Retrieve all the modules in the state
        const modules: ModuleProxy[] = [];
        ExtendedObject.forEach(
            this.state,
            (key, val) => (val instanceof ModuleProxy ? modules.push(val) : null),
            true
        );

        // Close all of the modules and wait for them to finish
        await Promise.all(modules.map((module: any) => module.close()));
    }

    /**
     * Disposes all stored resources of the node and unlinks itself from the state
     */
    protected async destroy(): Promise<void> {
        ProgramState.removeModule(this);

        this.settingsObject.destroy();
    }

    /*************************
     * Class related methods *
     *************************/

    // Proxy related methods
    protected static proxyClass: ExtendsClass<typeof Module>; // The singleton proxy class
    protected static remoteProxyClass: ExtendsClass<typeof RemoteModuleProxy>; // The singleton proxy class

    /**
     * Gets a 'singleton' remote proxy class for this module class
     * @returns The remoteModuleProxy for this module class
     */
    public static getRemoteProxyClass(): ExtendsClass<typeof RemoteModuleProxy> {
        if (!this.remoteProxyClass)
            this.remoteProxyClass = RemoteModuleProxy.createClass(this);
        return this.remoteProxyClass;
    }

    /**
     * Gets a 'singleton' proxy class for this node
     * @returns The programNodeProxy for this programNode class
     */
    protected static getProxyClass(): ExtendsClass<typeof Module> {
        if (!this.proxyClass) this.proxyClass = ModuleProxy.createClass(this);
        return this.proxyClass;
    }

    /**
     * Creates a proxy for this program node
     * @returns The created proxy
     */
    public createProxy(): ModuleProxy {
        // Get the proxy class for this program node
        const ProxyClass = this.getClass().getProxyClass();

        // Create and return a new instance of this proxy class
        return ProxyClass.createInstance(this);
    }

    // Config related methods
    static config = baseConfig; // The config of the module, will be replaced by createModule

    /**
     * Retrieves the config of the module
     * @returns The module's config
     */
    public static getConfig(): ParameterizedNormalizedModuleConfig {
        return this.config;
    }

    /**
     * Retrieves an instance of the settings file for this module
     * @returns The settings file instance
     */
    public static async getSettingsFile(): Promise<SettingsFile<any>> {
        return SettingsManager.getSettingsFile(this.getPath(), this.getConfig().settings);
    }

    /**
     * Installs the module if there is no settings file present for it
     * @returns A promise that resolves when installation is complete, indicating whether installation happened
     */
    public static async installIfRequired(): Promise<boolean> {
        // Check if an install is required or whether the mdoule has been isntalled already
        if (!SettingsManager.fileExists(this.getPath())) {
            return true;
        } else return false;
    }

    /**
     * Retrieves the config of the module
     * @returns The module's config
     */
    public getConfig(): NormalizedModuleConfig<S, C, I> {
        return this.getClass().config as any;
    }

    /**
     * Assigns a view class to the config of this module
     * @param viewClass The view class to relate to this module class
     */
    public static setViewClass(viewClass: ExtendsClass<ParameterizedModuleView>): void {
        this.getConfig().viewClass = viewClass;
    }

    // Importing related methods
    public getClass<PN extends ExtendsClass<typeof Module> = typeof Module>(): PN {
        // Get the class out of this object instance
        return (<any>this).__proto__.constructor;
    }

    protected static path: string = ""; // The path of the importable class TODO: refer to some 'missing' path

    /**
     * Returns the path to this file, relative to the modules folder
     * @returns The path to this file
     */
    public static getPath(): string {
        return this.path;
    }

    /**
     * Returns the path to this module class
     * @returns The path to this module class
     * @public
     */
    public static toString(): string {
        return this.getPath();
    }
}

/**
 * A type representing a module, where the generic parameter arguments can be left out
 */
export type ParameterizedModule = Module<ModuleState, SettingsConfig, ModuleInterface>;
