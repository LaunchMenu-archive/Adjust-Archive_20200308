import { ExtendsClass } from "../utils/_types/standardTypes";
import { ContractID } from "../registry/_types/contractID";
import { ParameterizedModule, Module } from "./module";
import { ModuleContract, ParentModule } from "./_types/moduleContract";
import { ModuleID } from "./moduleID";
import { AsyncSequencer } from "../utils/async/AsyncSequencer";
export declare class ModuleProxy {
    protected _target: ParameterizedModule;
    protected _source: ModuleProxy;
    protected _moduleID: ModuleID;
    protected _processing: AsyncSequencer;
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
     * @throws {IllegalStateException} If called when already connected
     */
    _connect(proxy: ModuleProxy): void;
    /**
     * Checks whether this is a proxy for a node of the given interface
     * @param interfaceID The interface to check
     * @returns Whether or not the program node is of the interface type
     */
    isInstanceof<I extends ModuleContract>(interfaceID: ContractID<I>): this is I["child"];
    /**
     * Checks whether this is a proxy for the parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    isMainParentof<P extends ParentModule<any>>(module: {
        getParent: () => P;
    }): this is P;
    /**
     * Checks whether this is a proxy for the main parent or an addition parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    isParentof<P extends ParentModule<any>>(module: {
        getParents: () => P[];
    }): this is P;
    /**
     * Checks whether this is a proxy for an additional parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    isAdditionalParentof<P extends ParentModule<any>>(module: {
        getParent: () => P;
        getParents: () => P[];
    }): this is P;
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
     * Wraps a method of a module with some extra behaviour for when modules interact with each other
     * @param name The name of the method
     * @param method The method itself
     * @returns The wrapped method
     */
    protected static createProxiedMethod(name: string, method: Function): Function;
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
