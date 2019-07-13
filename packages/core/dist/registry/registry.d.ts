/// <reference types="node" />
import { InterfaceID } from "./_types/interfaceID";
import { ParentlessRequest, Request, NormalizedRequest } from "./_types/request";
import { RequestFilter } from "./_types/requestFilter";
import { Module, ParameterizedModule } from "../module/module";
import { ModuleInterface } from "../module/_types/moduleInterface";
import { AbstractModuleProvider as ModuleProvider } from "./moduleProviders/abstractModuleProvider";
import { ClassModuleProvider } from "./moduleProviders/classModuleProvider";
import { ExtendsClass } from "../utils/_types/standardTypes";
import { PublicModuleMethods } from "../module/_types/publicModuleMethods";
/**
 * Keeps track of all modules classes and module providers
 */
export declare class RegistrySingleton {
    protected moduleProviders: {
        [interfaceID: string]: ModuleProvider<any>[];
    };
    protected collectionFolders: {
        [collectionName: string]: string;
    };
    /**
     * Retrieves modules based on the given request specification
     * @param request The request to base the modules to retrieve on
     * @returns The modules that were either created or obtained
     */
    request<M extends ModuleInterface>(request: Request<M> & {
        use: "all" | RequestFilter<M>;
    }): Promise<(M["child"] & PublicModuleMethods)[]>;
    /**
     * Retrieves a module based on the given request specification
     * @param request The request to base the module to retrieve on
     * @returns The module that was either created or obtained
     */
    request<M extends ModuleInterface>(request: Request<M>): Promise<M["child"] & PublicModuleMethods>;
    /**
     * Retrieves all the providers for the given request
     * @param request The request to retrieve the providers for
     * @returns A list of module providers in sorted order from highest to lowest priority
     */
    protected getProviders<M extends ModuleInterface>(request: NormalizedRequest<M>): Promise<ModuleProvider<M>[]>;
    /**
     * Adds the provider to the registry
     * @param provider The provider to add to the registry
     */
    addProvider(provider: ModuleProvider<any>): void;
    /**
     * Removes the provider from the registry
     * @param provider The provider to remove
     * @returns Whether or not the provider was in the registry to start with
     */
    removeProvider(provider: ModuleProvider<any>): boolean;
    /**
     * Retrieves a module based on the given request specification to be the root of your application
     * @param request The request to base the module to retrieve on
     * @returns The module that was created
     */
    createRoot<M extends ModuleInterface>(this: M["parent"], request: ParentlessRequest<M>): Promise<M["child"] & PublicModuleMethods>;
    /**
     * Creates a unique ID for the interface
     * @param location The location of the interface in string form (use __filename), should be unique
     * @returns An interface ID for recognizing classes using the interface
     */
    createInterfaceID<M extends ModuleInterface = null>(location: string & (M extends null ? "You must provide a generic type parameter" : string)): InterfaceID<M>;
    /**
     * Retrieves the module object of which Adjust is a depedency
     * @returns The node module that's not part of adjust (node as in node.js)
     */
    protected getParentNodeModule(): NodeModule;
    /**
     * Requires a given path and returns its result
     * @param collectionName The name of the collection to take the module from
     * @param path A path that's relative to the modules folder
     * @returns The exports of the file
     */
    protected requireModuleFile(collectionName: string, path: string): any;
    /**
     * Requires a given path and returns the obtained Module class if present
     * @param modulePath A collection name followed by relative path, E.G. default/myFolder/myModule
     * @returns A module class, or undefined
     */
    getModuleClass(modulePath: string): Promise<typeof Module>;
    /**
     * Maps module classes to module providers
     * @param moduleClasses The module classes to create module providers for
     * @returns The created module providers
     */
    protected createClassModuleProviders(moduleClasses: (typeof Module)[]): ClassModuleProvider<any>[];
    /**
     * Loads all of the default modules that are available
     */
    loadDefaultClassModuleProviders(filter?: (moduleClass: ExtendsClass<ParameterizedModule>) => boolean): Promise<void>;
    /**
     * Loads all of the class module providers into the registry
     * @param folder The folder to load the modules from
     * @param collectionName The name of the collection you are defining, is "default" by default
     * @param filter An optional function that decides what module classes to load (return true to be used)
     */
    loadClassModuleProviders(folder?: string, collectionName?: string, filter?: (moduleClass: ExtendsClass<ParameterizedModule>) => boolean): Promise<void>;
    /**
     * Loads all modules from the given collection
     * @param collectionName The collection to load from
     * @param filter An optional function that decides what module classes to load (return true to be used)
     * @returns All the Module classes that could be found
     */
    protected loadModuleClasses(collectionName?: string, filter?: (moduleClass: ExtendsClass<ParameterizedModule>) => boolean): Promise<(typeof Module)[]>;
    /**
     * Checks whether a given object (class) is a sub type of the Module class
     * @param object The object to check
     * @returns Whether it is a subclass of Module
     */
    protected isModuleClass(object: any): object is typeof Module;
    /**
     * Checks the file path to determine whether the file can contain a module
     * @param path The path to check
     * @returns Whether or not the file can contain a module
     */
    protected isModulePath(path: string): boolean;
}
export declare const Registry: RegistrySingleton;
