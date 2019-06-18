Object.defineProperty(exports, "__esModule", { value: true });
const extendedObject_1 = require("../utils/extendedObject");
class ModuleProxy {
    /**
     * Creates a proxy for a module
     * @param target The module tp proxy
     */
    constructor(target) {
        this._target = target;
    }
    /** @override */
    toString() {
        return this._target.toString();
    }
    /**
     * Connects two proxies with one and another
     * @param proxy The proxy to connect with
     * @throws {IllegalStateException} If called when already connected
     */
    connect(proxy) {
        if (this._source)
            throw Error("Connect may only be called once");
        proxy._source = this;
        this._source = proxy;
    }
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
            cls.prototype[name] = function () {
                // Update the context
                this._target.setCallContext(this._source);
                // Make the original call
                const result = method.apply(this._target, arguments);
                // Reset the context
                this._target.setCallContext(undefined);
                // Return the actual result
                return result;
            };
        });
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