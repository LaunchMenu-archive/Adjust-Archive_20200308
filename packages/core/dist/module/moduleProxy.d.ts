import { ExtendsClass } from "../utils/_types/standardTypes";
import { InterfaceID } from "../registry/_types/interfaceID";
import { ParameterizedModule, Module } from "./module";
import { ModuleInterface } from "./_types/moduleInterface";
import { ModuleID } from "./moduleID";
export declare class ModuleProxy {
    protected _target: ParameterizedModule;
    protected _source: ModuleProxy;
    protected _onClose: () => void;
    protected _moduleID: ModuleID;
    /**
     * Creates a proxy for a module
     * @param target The module tp proxy
     */
    constructor(target: ParameterizedModule);
    /** @override */
    toString(): string;
    /**
     * Connects two proxies with one and another
     * @param proxy The proxy to connect with
     * @param onClose An option callback for when close is called
     * @throws {IllegalStateException} If called when already connected
     */
    connect(proxy: ModuleProxy, onClose?: () => void): void;
    /**
     * Checks whether this is a proxy for a node of the given interface
     * @param interfaceID The interface to check
     * @returns Whether or not the program node is of the interface type
     */
    isInstanceof<I extends ModuleInterface>(interfaceID: InterfaceID<I>): this is I["child"];
    /**
     * Checks whether this is a proxy for the parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    isMainParentof<I extends ModuleInterface>(module: {
        getParent: () => ModuleProxy;
    }): this is I["parent"];
    /**
     * Checks whether this is a proxy for the main parent or an addition parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    isParentof<I extends ModuleInterface>(module: {
        getParents: () => I["parent"][];
    }): this is I["parent"];
    /**
     * Checks whether this is a proxy for an additional parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    isAdditionalParentof<I extends ModuleInterface>(module: {
        getParent: () => ModuleProxy;
        getParents: () => I["parent"][];
    }): this is I["parent"];
    /**
     * A method to close this proxy and its module.
     * Body gets created by the `createClass` method
     */
    close(): Promise<void>;
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
     * @param traceableCls The module class for which to create a proxy class
     * @returns The moduleProxy for a module class
     */
    static createClass(traceableCls: ExtendsClass<typeof Module>): ExtendsClass<typeof ModuleProxy>;
    /**
     * Creates a new instance of this class, and provides typecasting
     * @param module The module to create the proxy for
     * @returns The created instance
     */
    static createInstance<M extends ParameterizedModule, P extends ModuleProxy = ModuleProxy>(module: M): P & M;
}
