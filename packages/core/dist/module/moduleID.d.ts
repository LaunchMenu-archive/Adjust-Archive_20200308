import { ParameterizedModule, Module } from "./module";
import { RequestPath } from "./requestPath/requestPath";
/**
 * A class that can be used to reference a module.
 * Can be used within an app to show a module's view without having a connection to that module.
 */
export declare class ModuleReference {
    protected modulePath: string;
    protected ID: number;
    /**
     * Creates a moduleID based on a module path and a unique ID
     * @param modulePath The path to the module class
     * @param id The unique ID for this class
     */
    constructor(modulePath: string, id: number);
    /**
     * Creates a moduleID based on an already existing module ID in either string or object form
     * @param moduleID The already existing module ID
     */
    constructor(moduleID: string | ModuleReference);
    /**
     * Retrieves the path to the class of the module
     * @returns The path
     */
    getModulePath(): string;
    /**
     * Retrieves the ID of the module
     * @returns the ID
     */
    getID(): number;
    /**@override */
    toString(): string;
    /**
     * Checks whether two module references are equivalent
     * @param ref The reference to compare this to
     * @returns Whether the references are quivalent
     */
    equals(ref: ModuleReference): boolean;
}
/**
 * The class used internally to identify modules,
 * provides some utility methods to obtain data from this identifier
 */
export declare class ModuleID extends ModuleReference {
    /**
     * Retrieves the class of the module type this ID represents
     * @returns The module class
     */
    getModuleClass(): typeof Module;
    /**
     * Retrieves the request path that corresponds to this module ID
     * @returns The request path
     */
    getRequestPath(): RequestPath;
    /**
     * Retrieves the module that this ID uniquely identifies
     * @returns The module that this ID identifies
     */
    getModule(): ParameterizedModule;
}
