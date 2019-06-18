Object.defineProperty(exports, "__esModule", { value: true });
const ipcRenderer_1 = require("../communication/ipcRenderer");
const extendedObject_1 = require("../utils/extendedObject");
/**
 * A class to represent a module present in another process
 * Uses the windowManager to send the calls to the original module
 */
class RemoteModuleProxy {
    /**
     * Creates a proxy for a module in another process (the main process)
     * @param moduleID The request path of the module to create a proxy for
     */
    constructor(moduleID) {
        this.moduleID = moduleID.toString();
    }
    /** @override */
    toString() {
        return this.moduleID.toString();
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
     * @param moduleCls The module class for which to create a proxy class
     * @returns The remoteModuleProxy for a module class
     */
    static createClass(moduleCls) {
        // Create the proxy class
        const cls = this.createNamedClass(moduleCls.name, RemoteModuleProxy);
        // Get the class methods
        const methods = this.getMethods(moduleCls);
        // Create a proxy for each method
        extendedObject_1.ExtendedObject.forEach(methods, (name, method) => {
            cls.prototype[name] = function (...args) {
                ipcRenderer_1.IpcRenderer.send("WindowManager.moduleCall", this.moduleID, name, args);
            };
        });
        // Return the created class
        return cls;
    }
    /**
     * Creates a new instance of this class, and provides typecasting
     * @param moduleID The moduleID to create an instance for
     * @returns The created instance
     */
    static createInstance(moduleID) {
        return new this(moduleID);
    }
}
exports.RemoteModuleProxy = RemoteModuleProxy;
//# sourceMappingURL=remoteModuleProxy.js.map