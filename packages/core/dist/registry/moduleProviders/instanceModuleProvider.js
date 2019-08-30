Object.defineProperty(exports, "__esModule", { value: true });
const abstractModuleProvider_1 = require("./abstractModuleProvider");
const registry_1 = require("../registry");
const moduleProxy_1 = require("../../module/moduleProxy");
class InstanceModuleProvider extends abstractModuleProvider_1.AbstractModuleProvider {
    /**
     * Creates a module provider that is able to provide an already existing module
     * @param type The type of module that gets created
     * @param moduleClass The module class to create the instances from
     * @param filter The filter to apply to choose wherther or not to use this module
     * @param connectionListener A method that gets called when a new 'parent' connects
     */
    constructor(type, module, filter, connectionListener = () => { }) {
        super(type, filter);
        // Normalize the module
        if (module instanceof moduleProxy_1.ModuleProxy)
            module = module._target;
        this.module = module;
        this.connectionListener = connectionListener;
    }
    /** @override*/
    getPriority(request) {
        // Check if the module that we are providing for is still alive
        if (this.module.getStateObject().get.isStopping) {
            registry_1.Registry.removeProvider(this);
            return 0;
        }
        // Call the standard get priority method
        return super.getPriority(request);
    }
    /** @override */
    async getModule(request) {
        // Create a proxy for the parent, and add to the request
        let parentProxy;
        // Make sure the request was not for a root
        if (request.parent) {
            parentProxy = request.parent.createProxy();
            request = Object.assign({}, request, { parent: parentProxy });
        }
        // Create the proxy for the module
        const moduleProxy = this.module.createProxy();
        // Only connect and inform the module of a connection if a parent was specified
        if (parentProxy) {
            // Connect the proxies and add this as a parent
            moduleProxy._connect(parentProxy, () => {
                parentProxy.notifyChildRemoved(moduleProxy);
            });
            this.module.notifyParentAdded(parentProxy);
            // Inform the module of a newly made connection
            this.connectionListener(parentProxy);
            // Call module initialisation now the connection has completed (will wait for init to complete)
            await this.module.init(false);
            // Also add the reference the other way around
            parentProxy.notifyChildAdded(moduleProxy);
        }
        // Return the module
        return moduleProxy;
    }
}
exports.InstanceModuleProvider = InstanceModuleProvider;
//# sourceMappingURL=instanceModuleProvider.js.map