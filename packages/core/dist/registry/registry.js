var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const classModuleProvider_1 = require("./moduleProviders/classModuleProvider");
const isMain_1 = require("../utils/isMain");
const ipcMain_1 = require("../communication/ipcMain");
const ipcRenderer_1 = require("../communication/ipcRenderer");
const extendedObject_1 = require("../utils/extendedObject");
const moduleView_1 = require("../module/moduleView");
const settingsManager_1 = require("../storage/settings/settingsManager");
const packageRetriever_1 = require("../utils/packageRetriever");
const AsyncMutualExcluder_1 = require("../utils/async/AsyncMutualExcluder");
/**
 * Keeps track of all modules classes and module providers
 */
class RegistrySingleton {
    constructor() {
        // Stores all the module providers
        this.moduleProviders = {};
        // The module collection folders, which are the locations to load the module from
        this.collectionFolders = {
            default: path_1.default.join(process.cwd(), "dist", "modules"),
        };
        // A mutual excluder to make sure the previous set of modules is retrieved before handling the next set
        this.excluder = new AsyncMutualExcluder_1.AsyncMutualExcluder();
        // Today I had sandwiches for breakfast -SpaceWalker 18/6/2019
    }
    async request(request) {
        // Normalize the request
        const normalizedRequest = {
            type: request.type,
            use: request.use || "one",
            data: request.data || {},
            parent: request.parent,
            openView: request.openView || false,
        };
        // Retrieve the module promises, and make sure only one set can be retrieved at once
        let modulePromises = await this.excluder.schedule(async () => {
            // Retrieve the providers for this request
            const providers = await this.getProviders(normalizedRequest);
            // Create the modules from the promises
            return providers.map(provider => provider.getModule(normalizedRequest));
        });
        // Retrieve the modules for each of the providers that should be used
        const modules = await Promise.all(modulePromises);
        // Only return a single module and not an array if use was set to "one"
        if (normalizedRequest.use == "one")
            return modules[0];
        // Return the retrieved modules
        return modules;
    }
    // Module provider methods
    /**
     * Retrieves all the providers for the given request
     * @param request The request to retrieve the providers for
     * @returns A list of module providers in sorted order from highest to lowest priority
     */
    async getProviders(request) {
        // Retrieve the interfaceID
        const interfaceID = request.type;
        // Get all providers for this interface
        let providers = this.moduleProviders[interfaceID.ID];
        // Make sure there are any providers
        if (providers) {
            // Check if there are any providers
            if (providers.length == 0)
                return [];
            // Get the priorities of all provides
            let providerPriorities = providers.map(provider => ({
                provider: provider,
                priority: provider.getPriority(request),
            }));
            // Filter out any providers with priority 0
            providerPriorities = providerPriorities.filter(({ priority }) => priority > 0);
            // Sort the providers by their priority
            providerPriorities.sort((a, b) => b.priority - a.priority);
            // Decide what modules should be used
            if (request.use instanceof Function) {
                return request.use(providerPriorities);
            }
            else if (request.use == "all") {
                return providerPriorities.map(({ provider }) => provider);
            }
            else {
                // else request.use == "one" (or is invalid)
                if (providerPriorities.length == 0)
                    return [];
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
    addProvider(provider) {
        // Retrieve the interfaceID
        const interfaceID = provider.getType();
        // Get all providers for this interface
        let providers = this.moduleProviders[interfaceID.ID];
        // If no providers are present, create the list
        if (!providers)
            providers = this.moduleProviders[interfaceID.ID] = [];
        // Add this provider to the providers
        providers.push(provider);
    }
    /**
     * Removes the provider from the registry
     * @param provider The provider to remove
     * @returns Whether or not the provider was in the registry to start with
     */
    removeProvider(provider) {
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
    async createRoot(request) {
        return this.request(Object.assign({ parent: undefined }, request));
    }
    // contract methods
    /**
     * Creates a unique ID for the contract
     * @param location The location of the contract in string form (use __filename), should be unique
     * @returns An contract ID for recognizing classes using the contract
     */
    createContractID(location) {
        return {
            ID: location,
            toString: () => location,
        };
    }
    // Module loading related methods
    /**
     * Retrieves the module object of which Adjust is a depedency
     * @returns The node module that's not part of adjust (node as in node.js)
     */
    getParentNodeModule() {
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
            }
            else if (reachedProcess) {
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
    requireModuleFile(collectionName, path) {
        return require(path_1.default.join(this.collectionFolders[collectionName] || this.collectionFolders.default, path));
    }
    /**
     * Requires a given path and returns the package of the module
     * @param collectionName The name of the collection to take the module from
     * @param path A path that's relative to the modules folder
     * @returns The package that could be found
     */
    requireModulePackage(collectionName, path) {
        return packageRetriever_1.PackageRetriever.requireModulePackage(path_1.default.join(this.collectionFolders[collectionName] || this.collectionFolders.default, path));
    }
    /**
     * Requires a given path and returns the obtained Module class if present
     * @param modulePath A collection name followed by relative path, E.G. default/myFolder/myModule
     * @returns A module class, or undefined
     */
    getModuleClass(modulePath) {
        // Extract the collection name from the path
        const dirs = modulePath.split(path_1.default.sep);
        const collectionName = dirs.shift() || "default";
        const path = dirs.join(path_1.default.sep);
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
                    (collectionName != "default" ? collectionName : "") + path_1.default.sep + path;
                // Assign the package to the config
                const config = def.getConfig();
                const packag = this.requireModulePackage(collectionName, path);
                config.package = packag;
                // Assign the version number of abscent
                if (!config.version) {
                    if (packag && packag.version)
                        config.version = packag.version;
                    else
                        config.version = "0.0.0";
                }
                // Check if a view class was provided in the file, and if so, assign it to the module
                const viewClass = extendedObject_1.ExtendedObject.find(exports, (exp, k) => k != "default" && exp.prototype instanceof moduleView_1.ModuleView);
                if (viewClass)
                    config.viewClass = viewClass;
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
    createClassModuleProviders(moduleClasses) {
        return moduleClasses.map(moduleClass => new classModuleProvider_1.ClassModuleProvider(moduleClass.getConfig().type, moduleClass));
    }
    /**
     * Loads all of the default modules that are available
     */
    async loadDefaultClassModuleProviders(filter) {
        await this.loadClassModuleProviders(path_1.default.join(__dirname, "..", "modules"), "core", filter);
    }
    /**
     * Loads all of the class module providers into the registry
     * @param folder The folder to load the modules from
     * @param collectionName The name of the collection you are defining, is "default" by default
     * @param filter An optional function that decides what module classes to load (return true to be used)
     */
    async loadClassModuleProviders(folder = this.collectionFolders.default, collectionName = "default", filter = () => true) {
        // Store the collection
        this.collectionFolders[collectionName] = folder;
        // Obtain all of the module classes
        let moduleClasses = await this.loadModuleClasses(collectionName, filter);
        // Filter out any module classes without an interface (probably a class to be extended)
        moduleClasses = moduleClasses.filter(moduleClass => moduleClass.getConfig().type != undefined &&
            !moduleClass.getConfig().abstract);
        // Create module providers for each of the classes
        const moduleProviders = this.createClassModuleProviders(moduleClasses);
        // Add all of the module providers to the registry
        moduleProviders.forEach(moduleProvider => this.addProvider(moduleProvider));
        // Install all modules that require it, and save their settings
        for (let moduleClass of moduleClasses) {
            await moduleClass.loadAndInstallIfRequired();
        }
        await settingsManager_1.SettingsManager.saveAll();
        settingsManager_1.SettingsManager.destroySettingsFiles();
    }
    /**
     * Loads all modules from the given collection
     * @param collectionName The collection to load from
     * @param filter An optional function that decides what module classes to load (return true to be used)
     * @returns All the Module classes that could be found
     */
    loadModuleClasses(collectionName = "default", filter = () => true) {
        // The module classes to return
        const outModules = [];
        // The root path to look at
        const startPath = this.collectionFolders[collectionName];
        // A method to go through a single folder at a given path
        const readDir = path => {
            // Get and read the files in the directory
            const files = fs_1.default.readdirSync(path);
            files.forEach(file => {
                // Obtain the full path for the file
                const filePath = path_1.default.join(path, file);
                // Check if this file is a directory or not, and if it is; recurse
                if (fs_1.default.lstatSync(filePath).isDirectory()) {
                    readDir(filePath);
                }
                else {
                    // Get the file path relative to the modules folder
                    const relativeFilePath = filePath.substring(startPath.length + 1);
                    // Retrieve any possible module class located at this path
                    const moduleClass = this.getModuleClass(path_1.default.join(collectionName, relativeFilePath));
                    // Check whether or not the class should be used
                    if (!filter(moduleClass))
                        return;
                    // Add the module to the output
                    if (moduleClass)
                        outModules.push(moduleClass);
                }
            });
        };
        // Start the recursion
        readDir(startPath);
        // Return the loaded configs
        return outModules;
    }
    /**
     * Checks whether a given object (class) is a sub type of the Module class
     * @param object The object to check
     * @returns Whether it is a subclass of Module
     */
    isModuleClass(object) {
        // Go through all calsses in the inherticence chain
        while (object != null && object instanceof Object) {
            // If the object is module, it's a module class
            if (object.name == "Module")
                return true; // Comparison to Module doesn't work, probably require issues
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
    isModulePath(path) {
        // TODO: Decide on a file/path convention for modules
        return !path.match(/\.d\./g) && !!path.match(/\.js$/g);
    }
}
exports.RegistrySingleton = RegistrySingleton;
exports.Registry = new RegistrySingleton();
// Synchonize collectionFolders between main and sub processes
if (isMain_1.isMain) {
    //@ts-ignore
    ipcMain_1.IpcMain.on("Registry.getCollections", () => exports.Registry.collectionFolders);
}
else {
    // TODO: do a proper fix for test cases (which don't have ipcMain nor ipcRenderer)
    try {
        //@ts-ignore
        exports.Registry.collectionFolders = ipcRenderer_1.IpcRenderer.sendSync("Registry.getCollections")[0];
    }
    catch (e) { }
}
//# sourceMappingURL=registry.js.map