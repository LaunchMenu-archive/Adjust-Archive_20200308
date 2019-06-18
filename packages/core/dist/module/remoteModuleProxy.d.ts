import { ExtendsClass } from "../utils/_types/standardTypes";
import { Module, ParameterizedModule } from "./module";
import { ModuleID } from "./moduleID";
/**
 * A class to represent a module present in another process
 * Uses the windowManager to send the calls to the original module
 */
export declare class RemoteModuleProxy {
    protected moduleID: string;
    /**
     * Creates a proxy for a module in another process (the main process)
     * @param moduleID The request path of the module to create a proxy for
     */
    constructor(moduleID: ModuleID | string);
    /** @override */
    toString(): string;
    /**
     * Retrieves the methods of an object, including inherited methods
     * @param obj The object to get the methods from
     * @returns A list of methods and their names
     */
    protected static getMethods(obj: object): {
        [name: string]: Function;
    };
    /**
     * Creates a new class extending the passed class, with a dynamic name
     * @param name The name for the class
     * @param cls The class to extend
     */
    protected static createNamedClass(name: string, cls: Function): Function;
    /**
     * Creates a dynamic module proxy class for a specific Module class
     * @param moduleCls The module class for which to create a proxy class
     * @returns The remoteModuleProxy for a module class
     */
    static createClass(moduleCls: ExtendsClass<typeof Module>): ExtendsClass<typeof RemoteModuleProxy>;
    /**
     * Creates a new instance of this class, and provides typecasting
     * @param moduleID The moduleID to create an instance for
     * @returns The created instance
     */
    static createInstance<M extends ParameterizedModule, P extends RemoteModuleProxy = RemoteModuleProxy>(moduleID: ModuleID | string): P & M;
}
