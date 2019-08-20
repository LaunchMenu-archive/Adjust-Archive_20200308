import {ExtendsClass} from "../utils/_types/standardTypes";
import {ContractID} from "../registry/_types/contractID";
import {ExtendedObject} from "../utils/extendedObject";
import {ParameterizedModule, Module} from "./module";
import {ModuleContract, ParentModule} from "./_types/moduleContract";
import {ModuleID} from "./moduleID";

export class ModuleProxy {
    // The module that is being proxied
    protected _target: ParameterizedModule;

    // The source that calls methods on this proxy
    protected _source: ModuleProxy;

    // A method to optionally ovewrite the class' close method
    protected _onClose: () => void;

    // Stores the ID of the module instance
    protected _moduleID: ModuleID;

    // Stores the methods that are currently processing
    protected _processing: {[methodName: string]: boolean} = {};
    // A promise that's resolved when no more methods are processing
    protected _processingWaiter = {promise: Promise.resolve(), resolver: null} as {
        promise: Promise<void>;
        resolver: () => void;
    };

    /**
     * Creates a proxy for a module
     * @param target The module tp proxy
     */
    constructor(target: ParameterizedModule) {
        this._target = target;
        this._moduleID = target.getID();
    }

    /** @override */
    public toString() {
        return this._target.toString();
    }

    /**
     * Connects two proxies with one and another
     * @param proxy The proxy to connect with
     * @param onClose An option callback for when close is called
     * @throws {IllegalStateException} If called when already connected
     */
    public _connect(proxy: ModuleProxy, onClose?: () => void): void {
        if (this._source) throw Error("Connect may only be called once");

        proxy._source = this;
        this._source = proxy;
        this._onClose = onClose;
    }

    // Instance checking methods
    /**
     * Checks whether this is a proxy for a node of the given interface
     * @param interfaceID The interface to check
     * @returns Whether or not the program node is of the interface type
     */
    public isInstanceof<I extends ModuleContract>(
        interfaceID: ContractID<I>
    ): this is I["child"] {
        // Get the target's class
        const cls = this._target.getClass() as any;

        // Check if the class' type is the interface
        return cls.getConfig && cls.getConfig().type == interfaceID;
    }

    /**
     * Checks whether this is a proxy for the parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    public isMainParentof<P extends ParentModule<any>>(module: {
        getParent: () => P;
    }): this is P {
        // Get the parent of the module
        const parent = module.getParent();

        // Check whether the parent proxy's target is this source's target
        // @ts-ignore
        return parent == this;
    }

    /**
     * Checks whether this is a proxy for the main parent or an addition parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    public isParentof<P extends ParentModule<any>>(module: {
        getParents: () => P[];
    }): this is P {
        // Get the parents of the module
        const parents = module.getParents();

        // Check whether the parent proxy's target is this source's target
        // @ts-ignore
        return parents.indexOf(this) != -1;
    }

    /**
     * Checks whether this is a proxy for an additional parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    public isAdditionalParentof<P extends ParentModule<any>>(module: {
        getParent: () => P;
        getParents: () => P[];
    }): this is P {
        return this.isParentof(module) && !this.isMainParentof(module);
    }

    // Declaration of close, since any module will have this method
    /**
     * A method to close this proxy and its module.
     * Body gets created by the `createClass` method
     */
    public async close(): Promise<void> {}

    // Methods to support proxying
    protected _setProcessing(name: string, processing: boolean): void {
        if (processing) {
            this._processing[name] = true;

            // If there is no resolver, the processing is currently resolved
            if (!this._processingWaiter.resolver) {
                let resolver;
                const promise = new Promise(res => (resolver = res)) as Promise<void>;
                this._processingWaiter = {promise, resolver};
            }
        } else {
            delete this._processing[name];

            // If nothing is processing anymore, resolve the processing waiter
            if (
                Object.keys(this._processing).length == 0 &&
                this._processingWaiter.resolver
            ) {
                this._processingWaiter.resolver();
                this._processingWaiter.resolver = null;
            }
        }
    }

    // Static methods to create a proxy
    /**
     * Retrieves the methods of an object, including inherited methods
     * @param obj The object to get the methods from
     * @returns A list of methods and their names
     */
    protected static getMethods(obj: object): {[name: string]: Function} {
        // The methods that were found
        const methods: {[name: string]: Function} = {};

        // Go through all super classes and get their modules
        obj = (obj as any).prototype;
        do {
            // Go through all of the property names
            Object.getOwnPropertyNames(obj).forEach(name => {
                // Make sure the method isn't defined already
                if (methods[name] != null) return;

                // Get the actual property, and check if it's a valid method
                const property = Object.getOwnPropertyDescriptor(obj, name);

                if (!(property.value instanceof Function)) return;

                // Add the method
                methods[name] = property.value;
            });
        } while ((obj = Object.getPrototypeOf(obj)) != Object.prototype);

        // Return the methods
        return methods;
    }

    /**
     * Creates a new class extending the passed class, with a dynamic name
     * @param name The name for the class
     * @param cls The class to extend
     */
    protected static createNamedClass(name: string, cls: Function): Function {
        return new Function("cls", `return class ${name} extends cls {}`)(cls);
    }

    /**
     * Wraps a method of a module with some extra behaviour for when modules interact with each other
     * @param name The name of the method
     * @param method The method itself
     * @returns The wrapped method
     */
    protected static createProxiedMethod(name: string, method: Function): Function {
        return function(this: ModuleProxy) {
            if (!this._target) throw Error("Module has already been closed");

            // Update the context
            this._target.setCallContext(this._source);

            // Indicate this method is now processing
            this._setProcessing(name, true);

            // Make the original call
            const result = method.apply(this._target, arguments);

            // Indicate this method is no longer processing on resolve
            if (result instanceof Promise)
                result
                    .then(() => this._setProcessing(name, false))
                    .catch(e => {
                        this._setProcessing(name, false);
                        throw e;
                    });
            else this._setProcessing(name, false);

            // Reset the context
            this._target.setCallContext(undefined);

            // Return the actual result
            return result;
        };
    }

    /**
     * Creates a dynamic module proxy class for a specific Module class
     * @param traceableCls The module class for which to create a proxy class
     * @returns The moduleProxy for a module class
     */
    public static createClass(
        traceableCls: ExtendsClass<typeof Module>
    ): ExtendsClass<typeof ModuleProxy> {
        // Create the proxy class
        const cls = this.createNamedClass((traceableCls as any).name, ModuleProxy);

        // Get the class methods
        const methods = this.getMethods(traceableCls);

        // Create a proxy for each method
        ExtendedObject.forEach(methods, (name, method) => {
            cls.prototype[name] = this.createProxiedMethod(name, method);
        });

        // Make a specialised method for closing, that automatically closes the channel (proxy)
        const close = cls.prototype.close;
        cls.prototype.close = async function(this: ModuleProxy) {
            // Make sure no processing is going on, before closing
            await this._processingWaiter.promise;

            // Perform regular closing
            await close.apply(this, arguments);

            // Call a possible on close handler
            if (this._onClose) this._onClose();

            // Renove the target reference
            this._target = null;
        };

        // Make a method to return the module ID, even if the module was closed
        cls.prototype.getID = function() {
            return this._moduleID;
        };

        // Return the created class
        return cls as any;
    }

    /**
     * Creates a new instance of this class, and provides typecasting
     * @param module The module to create the proxy for
     * @returns The created instance
     */
    public static createInstance<
        M extends ParameterizedModule,
        P extends ModuleProxy = ModuleProxy
    >(module: M): P & M {
        return new this(module) as any;
    }
}
