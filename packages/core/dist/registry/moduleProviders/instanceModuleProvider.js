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
        if (this.module.state.isStopping) {
            registry_1.Registry.removeProvider(this);
            return 0;
        }
        // Call the standard get priority method
        return super.getPriority(request);
    }
    /** @override */
    getModule(request) {
        // Make a copy of the request but overwrite the parent
        const parentProxy = request.parent.createProxy();
        request = Object.assign({}, request, { parent: parentProxy });
        // Create the proxy for the module
        const moduleProxy = this.module.createProxy();
        // Connect the proxies and add this as a parent
        moduleProxy.connect(parentProxy);
        this.module.addParent(parentProxy);
        // Inform the module of a newly made connection
        this.connectionListener(parentProxy);
        // Return the module
        return moduleProxy;
    }
}
exports.InstanceModuleProvider = InstanceModuleProvider;
//# sourceMappingURL=instanceModuleProvider.js.map