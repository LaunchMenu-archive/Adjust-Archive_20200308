Object.defineProperty(exports, "__esModule", { value: true });
const extendedObject_1 = require("../utils/extendedObject");
const AsyncSequencer_1 = require("../utils/async/AsyncSequencer");
class ModuleProxy {
    /**
     * Creates a proxy for a module
     * @param target The module tp proxy
     */
    constructor(target) {
        // Stores the methods that are currently processing
        this._processing = new AsyncSequencer_1.AsyncSequencer();
        this._target = target;
        this._moduleID = target.getID();
    }
    /** @override */
    toString() {
        return this._target.toString();
    }
    /**
     * Connects two proxies with one and another
     * @param proxy The proxy to connect with
     * @param onClose An option callback for when close is called
     * @throws {IllegalStateException} If called when already connected
     */
    _connect(proxy, onClose) {
        if (this._source)
            throw Error("Connect may only be called once");
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
    isInstanceof(interfaceID) {
        // Get the target's class
        const cls = this._target.getClass();
        // Check if the class' type is the interface
        return cls.getConfig && cls.getConfig().type == interfaceID;
    }
    /**
     * Checks whether this is a proxy for the parent of the given module
     * @param module The module to check with
     * @returns Whether this is a proxy for the parent
     */
    isMainParentof(module) {
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
    isParentof(module) {
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
    isAdditionalParentof(module) {
        return this.isParentof(module) && !this.isMainParentof(module);
    }
    // Declaration of close, since any module will have this method
    /**
     * A method to close this proxy and its module.
     * Body gets created by the `createClass` method
     */
    async close() { }
    // Static methods to create a proxy
    /**
     * Retrieves the methods of an object, including inherited methods
     * @param obj The object to get the methods from
     * @returns A list of methods and their names
     */
    static getMethods(obj) {
        // The methods that were found
        const methods = {};
        // Go through all super classes and get their modules
        obj = obj.prototype;
        do {
            // Go through all of the property names
            Object.getOwnPropertyNames(obj).forEach(name => {
                // Make sure the method isn't defined already
                if (methods[name] != null)
                    return;
                // Get the actual property, and check if it's a valid method
                const property = Object.getOwnPropertyDescriptor(obj, name);
                if (!(property.value instanceof Function))
                    return;
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
    static createNamedClass(name, cls) {
        return new Function("cls", `return class ${name} extends cls {}`)(cls);
    }
    /**
     * Wraps a method of a module with some extra behaviour for when modules interact with each other
     * @param name The name of the method
     * @param method The method itself
     * @returns The wrapped method
     */
    static createProxiedMethod(name, method) {
        return function () {
            if (!this._target)
                throw Error("Module has already been closed");
            // Update the context
            this._target.setCallContext(this._source);
            // Make the original call
            const result = method.apply(this._target, arguments);
            // Indicate this method is no longer processing on resolve
            if (result instanceof Promise)
                this._processing.add(result);
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
    static createClass(traceableCls) {
        // Create the proxy class
        const cls = this.createNamedClass(traceableCls.name, ModuleProxy);
        // Get the class methods
        const methods = this.getMethods(traceableCls);
        // Create a proxy for each method
        extendedObject_1.ExtendedObject.forEach(methods, (name, method) => {
            cls.prototype[name] = this.createProxiedMethod(name, method);
        });
        // Make a specialised method for closing, that automatically closes the channel (proxy)
        const close = cls.prototype.close;
        cls.prototype.close = async function () {
            // Make sure no processing is going on, before closing
            await this._processing.finished;
            // Perform regular closing
            if (this._target) {
                await close.apply(this, arguments);
                // Call a possible on close handler
                if (this._onClose)
                    this._onClose();
                // Renove the target reference
                this._target = null;
            }
        };
        // Make a method to return the module ID, even if the module was closed
        cls.prototype.getID = function () {
            return this._moduleID;
        };
        // Return the created class
        return cls;
    }
    /**
     * Creates a new instance of this class, and provides typecasting
     * @param module The module to create the proxy for
     * @returns The created instance
     */
    static createInstance(module) {
        return new this(module);
    }
}
exports.ModuleProxy = ModuleProxy;
//# sourceMappingURL=moduleProxy.js.map