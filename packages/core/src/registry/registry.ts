import Path from "path";
import FS from "fs";
import {InterfaceID} from "./_types/interfaceID";
import {ParentlessRequest, Request, NormalizedRequest} from "./_types/request";
import {RequestFilter} from "./_types/requestFilter";
import {Module, ParameterizedModule} from "../module/module";
import {ModuleInterface} from "../module/_types/moduleInterface";
import {AbstractModuleProvider as ModuleProvider} from "./moduleProviders/abstractModuleProvider";
import {ClassModuleProvider} from "./moduleProviders/classModuleProvider";
import {isMain} from "../utils/isMain";
import {IpcMain} from "../communication/ipcMain";
import {IpcRenderer} from "../communication/ipcRenderer";
import {ExtendsClass} from "../utils/_types/standardTypes";
import {PublicModuleMethods} from "../module/_types/publicModuleMethods";
import {ExtendedObject} from "../utils/extendedObject";
import {ModuleView} from "../module/moduleView";
import {SettingsManager} from "../storage/settings/settingsManager";

/**
 * Keeps track of all modules classes and module providers
 */
export class RegistrySingleton {
    // Stores all the module providers
    protected moduleProviders: {
        [interfaceID: string]: ModuleProvider<any>[];
    } = {};

    // The module collection folders, which are the locations to load the module from
    protected collectionFolders: {[collectionName: string]: string} = {
        default: Path.join(process.cwd(), "dist", "modules"),
    };

    // Request methods
    /**
     * Retrieves modules based on the given request specification
     * @param request The request to base the modules to retrieve on
     * @returns The modules that were either created or obtained
     */
    public async request<M extends ModuleInterface>(
        request: Request<M> & {use: "all" | RequestFilter<M>}
    ): Promise<(M["child"] & PublicModuleMethods)[]>;

    /**
     * Retrieves a module based on the given request specification
     * @param request The request to base the module to retrieve on
     * @returns The module that was either created or obtained
     */
    public async request<M extends ModuleInterface>(
        request: Request<M>
    ): Promise<M["child"] & PublicModuleMethods>;

    public async request<M extends ModuleInterface>(
        request: Request<M>
    ): Promise<M["child"] & PublicModuleMethods | (M["child"] & PublicModuleMethods)[]> {
        // Normalize the request
        const normalizedRequest: NormalizedRequest<M> = {
            type: request.type,
            use: request.use || "one",
            data: request.data || {},
            parent: request.parent,
            openView: request.openView || false,
        } as any;

        // Retrieve the providers for this request
        const providers = await this.getProviders(normalizedRequest);

        // Retrieve the modules for each of the providers that should be used
        const modules = await Promise.all(
            providers.map(provider => provider.getModule(normalizedRequest))
        );

        // Only return a single module and not an array if use was set to "one"
        if (normalizedRequest.use == "one") return modules[0];

        // Return the retrieved modules
        return modules;
    }

    // Module provider methods
    /**
     * Retrieves all the providers for the given request
     * @param request The request to retrieve the providers for
     * @returns A list of module providers in sorted order from highest to lowest priority
     */
    protected async getProviders<M extends ModuleInterface>(
        request: NormalizedRequest<M>
    ): Promise<ModuleProvider<M>[]> {
        // Retrieve the interfaceID
        const interfaceID = request.type;

        // Get all providers for this interface
        let providers = this.moduleProviders[interfaceID.ID];

        // Make sure there are any providers
        if (providers) {
            // Check if there are any providers
            if (providers.length == 0) return [];

            // Get the priorities of all provides
            let providerPriorities = providers.map(provider => ({
                provider: provider,
                priority: provider.getPriority(request),
            }));

            // Filter out any providers with priority 0
            providerPriorities = providerPriorities.filter(({priority}) => priority > 0);

            // Sort the providers by their priority
            providerPriorities.sort((a, b) => b.priority - a.priority);

            // Decide what modules should be used
            if (request.use instanceof Function) {
                return (request as any).use(providerPriorities);
            } else if (request.use == "all") {
                return providerPriorities.map(({provider}) => provider);
            } else {
                // else request.use == "one" (or is invalid)
                if (providerPriorities.length == 0) return [];
                return [providerPriorities[0].provider];
            }
        }

        // If there are no providers for this type, return an empty array
        return [];
    }

    /**
     * Adds the provider to the registry
     * @param provider The provider to add to the registry
     */
    public addProvider(provider: ModuleProvider<any>): void {
        // Retrieve the interfaceID
        const interfaceID = provider.getType();

        // Get all providers for this interface
        let providers = this.moduleProviders[interfaceID.ID];

        // If no providers are present, create the list
        if (!providers) providers = this.moduleProviders[interfaceID.ID] = [];

        // Add this provider to the providers
        providers.push(provider);
    }

    /**
     * Removes the provider from the registry
     * @param provider The provider to remove
     * @returns Whether or not the provider was in the registry to start with
     */
    public removeProvider(provider: ModuleProvider<any>): boolean {
        // Retrieve the interfaceID
        const interfaceID = provider.getType();

        // Get all providers for this interface
        let providers = this.moduleProviders[interfaceID.ID];

        // Make sure there is a list of providers for this type
        if (providers) {
            // Remove the provider if present
            const index = providers.indexOf(provider);
            if (index != -1) {
                providers.splice(index, 1);
                return true;
            }
        }

        // If the if statements above failed, the provider has not been removed
        return false;
    }

    /**
     * Retrieves a module based on the given request specification to be the root of your application
     * @param request The request to base the module to retrieve on
     * @returns The module that was created
     */
    public async createRoot<M extends ModuleInterface>(
        this: M["parent"],
        request: ParentlessRequest<M>
    ): Promise<M["child"] & PublicModuleMethods> {
        return this.request({parent: undefined, ...request} as any) as any;
    }

    // Interface methods
    /**
     * Creates a unique ID for the interface
     * @param location The location of the interface in string form (use __filename), should be unique
     * @returns An interface ID for recognizing classes using the interface
     */
    public createInterfaceID<M extends ModuleInterface = null>(
        location: string &
            (M extends null ? "You must provide a generic type parameter" : string)
    ): InterfaceID<M> {
        return {
            ID: location,
            toString: () => location,
        };
    }

    // /** Keep track of the lowest interface ID that hasn't been used yet */
    // protected newInterfaceID: number = 1;

    // Module loading related methods
    /**
     * Retrieves the module object of which Adjust is a depedency
     * @returns The node module that's not part of adjust (node as in node.js)
     */
    protected getParentNodeModule(): NodeModule {
        // Find the last module that's located in the running process
        const p = process.cwd();

        // Define the 'current' module and previous module
        let m = module;

        // Go through the parent's until no parent is left, or it's not in the process
        let reachedProcess = false;
        while (m && m.parent) {
            // If the parent's file starts the same as the process, we have reached the process
            if (m.parent.filename.substring(0, p.length) == p) {
                reachedProcess = true;
                // If it doesn't, but we had already reached the process, we surpassed the process
            } else if (reachedProcess) {
                return m;
            }

            // Go to the parent
            m = m.parent;
        }

        // Return the last found module if we didn't go out of the process
        return m;
    }

    /**
     * Requires a given path and returns its result
     * @param collectionName The name of the collection to take the module from
     * @param path A path that's relative to the modules folder
     * @returns The exports of the file
     */
    protected requireModuleFile(collectionName: string, path: string): any {
        return require(Path.join(
            this.collectionFolders[collectionName] || this.collectionFolders.default,
            path
        ));
    }

    /**
     * Requires a given path and returns the obtained Module class if present
     * @param modulePath A collection name followed by relative path, E.G. default/myFolder/myModule
     * @returns A module class, or undefined
     */
    public async getModuleClass(modulePath: string): Promise<typeof Module> {
        // Extract the collection name from the path
        const dirs = modulePath.split(Path.sep);
        const collectionName = dirs.shift() || "default";
        const path = dirs.join(Path.sep);

        // Check if the file could be a module
        if (this.isModulePath(modulePath)) {
            // Get the contents of the file
            const exports = this.requireModuleFile(collectionName, path);

            // Get the default from the exports
            const def = exports.default;

            // Check if the default export is a module
            if (this.isModuleClass(def)) {
                // Add the path tp the module
                // @ts-ignore
                def.path =
                    (collectionName != "default" ? collectionName : "") + Path.sep + path;

                // Check if the module still needs a view
                if (def.getConfig().viewClass === undefined) {
                    // Check if a view class was provided in the file, and if so, assign it to the module
                    const viewClass = ExtendedObject.find(
                        exports,
                        (exp, k) => k != "default" && exp.prototype instanceof ModuleView
                    );
                    if (viewClass) def.getConfig().viewClass = viewClass;
                }

                // Install the class if required
                await def.installIfRequired();

                // Return the module
                return def;
            }
        }
    }

    /**
     * Maps module classes to module providers
     * @param moduleClasses The module classes to create module providers for
     * @returns The created module providers
     */
    protected createClassModuleProviders(
        moduleClasses: (typeof Module)[]
    ): ClassModuleProvider<any>[] {
        return moduleClasses.map(
            moduleClass =>
                new ClassModuleProvider(moduleClass.getConfig().type, moduleClass)
        );
    }

    /**
     * Loads all of the default modules that are available
     */
    public async loadDefaultClassModuleProviders(
        filter?: (moduleClass: ExtendsClass<ParameterizedModule>) => boolean
    ): Promise<void> {
        await this.loadClassModuleProviders(
            Path.join(__dirname, "..", "modules"),
            "core",
            filter
        );
    }

    /**
     * Loads all of the class module providers into the registry
     * @param folder The folder to load the modules from
     * @param collectionName The name of the collection you are defining, is "default" by default
     * @param filter An optional function that decides what module classes to load (return true to be used)
     */
    public async loadClassModuleProviders(
        folder: string = this.collectionFolders.default,
        collectionName: string = "default",
        filter: (moduleClass: ExtendsClass<ParameterizedModule>) => boolean = () => true
    ): Promise<void> {
        // Store the collection
        this.collectionFolders[collectionName] = folder;

        // Obtain all of the module classes
        let moduleClasses = await this.loadModuleClasses(collectionName, filter);

        // Filter out any module classes without an interface (probably a class to be extended)
        moduleClasses = moduleClasses.filter(
            moduleClass =>
                moduleClass.getConfig().type != undefined &&
                !moduleClass.getConfig().abstract
        );

        // Create module providers for each of the classes
        const moduleProviders = this.createClassModuleProviders(moduleClasses);

        // Add all of the module providers to the registry
        moduleProviders.forEach(moduleProvider => this.addProvider(moduleProvider));
    }

    /**
     * Loads all modules from the given collection
     * @param collectionName The collection to load from
     * @param filter An optional function that decides what module classes to load (return true to be used)
     * @returns All the Module classes that could be found
     */
    protected async loadModuleClasses(
        collectionName: string = "default",
        filter: (moduleClass: ExtendsClass<ParameterizedModule>) => boolean = () => true
    ): Promise<(typeof Module)[]> {
        // The module classes to return
        const outModules: Promise<typeof Module>[] = [];

        // The root path to look at
        const startPath = this.collectionFolders[collectionName];

        // A method to go through a single folder at a given path
        const readDir = path => {
            // Get and read the files in the directory
            const files = FS.readdirSync(path);
            files.forEach(file => {
                // Obtain the full path for the file
                const filePath = Path.join(path, file);

                // Check if this file is a directory or not, and if it is; recurse
                if (FS.lstatSync(filePath).isDirectory()) {
                    readDir(filePath);
                } else {
                    // Get the file path relative to the modules folder
                    const relativeFilePath = filePath.substring(startPath.length + 1);

                    // Retrieve any possible module class located at this path
                    const moduleClass = this.getModuleClass(
                        Path.join(collectionName, relativeFilePath)
                    );

                    // Check whether or not the class should be used
                    if (!filter(moduleClass)) return;

                    // Add the module to the output
                    if (moduleClass) outModules.push(moduleClass);
                }
            });
        };

        // Start the recursion
        readDir(startPath);

        // Save all settings that were created by modules being installed
        SettingsManager.saveAll();
        SettingsManager.destroySettingsFiles();

        // Return the loaded configs
        return await Promise.all(outModules);
    }

    /**
     * Checks whether a given object (class) is a sub type of the Module class
     * @param object The object to check
     * @returns Whether it is a subclass of Module
     */
    protected isModuleClass(object: any): object is typeof Module {
        // Go through all calsses in the inherticence chain
        while (object != null && object instanceof Object) {
            // If the object is module, it's a module class
            if (object.name == "Module") return true; // Comparison to Module doesn't work, probably require issues

            // Check the super class
            object = object.__proto__;
        }

        // If the Module class couldn't be found
        return false;
    }

    /**
     * Checks the file path to determine whether the file can contain a module
     * @param path The path to check
     * @returns Whether or not the file can contain a module
     */
    protected isModulePath(path: string): boolean {
        // TODO: Decide on a file/path convention for modules
        return !path.match(/\.d\./g) && !!path.match(/\.js$/g);
    }

    // Today I had sandwiches for breakfast -SpaceWalker 18/6/2019
}

export const Registry = new RegistrySingleton();

// Synchonize collectionFolders between main and sub processes
if (isMain) {
    //@ts-ignore
    IpcMain.on("Registry.getCollections", () => Registry.collectionFolders);
} else {
    // TODO: do a proper fix for test cases (which don't have ipcMain nor ipcRenderer)
    try {
        //@ts-ignore
        Registry.collectionFolders = IpcRenderer.sendSync("Registry.getCollections")[0];
    } catch (e) {}
}
