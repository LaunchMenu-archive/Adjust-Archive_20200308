import {Module, ParameterizedModule} from "../../module/module";
import {AbstractModuleProvider} from "./abstractModuleProvider";
import {ParameterizedContractID, ContractID} from "../_types/contractID";
import {NormalizedRequest} from "../_types/request";
import {ModuleContract} from "../../module/_types/moduleContract";
import {Registry} from "../registry";
import {ModuleProxy} from "../../module/moduleProxy";

export class InstanceModuleProvider<
    M extends ModuleContract
> extends AbstractModuleProvider<M> {
    // The module to provide
    protected module: ParameterizedModule;

    // Connection listener to call when a module connected
    protected connectionListener: (module: M["parent"]) => void;

    /**
     * Creates a module provider that is able to provide an already existing module
     * @param type The type of module that gets created
     * @param moduleClass The module class to create the instances from
     * @param filter The filter to apply to choose wherther or not to use this module
     * @param connectionListener A method that gets called when a new 'parent' connects
     */
    constructor(
        type: ContractID<M>,
        module: ParameterizedModule | ModuleProxy,
        filter?: (request: NormalizedRequest<M>) => number,
        connectionListener: (module: M["parent"]) => void = () => {}
    ) {
        super(type, filter);
        // Normalize the module
        if (module instanceof ModuleProxy)
            module = (module as any)._target as ParameterizedModule;

        this.module = module;
        this.connectionListener = connectionListener;
    }

    /** @override*/
    public getPriority(request: NormalizedRequest<M>): number {
        // Check if the module that we are providing for is still alive
        if (this.module.getStateObject().get.isStopping) {
            Registry.removeProvider(this);
            return 0;
        }

        // Call the standard get priority method
        return super.getPriority(request);
    }

    /** @override */
    public async getModule(request: NormalizedRequest<M>): Promise<M["child"]> {
        // Create a proxy for the parent, and add to the request
        let parentProxy: ParameterizedModule & ModuleProxy;
        // Make sure the request was not for a root
        if (request.parent) {
            parentProxy = request.parent.createProxy() as any;
            request = Object.assign({}, request, {parent: parentProxy});
        }

        // Create the proxy for the module
        const moduleProxy = this.module.createProxy();

        // Only connect and inform the module of a connection if a parent was specified
        if (parentProxy) {
            // Connect the proxies and add this as a parent
            moduleProxy._connect(parentProxy);
            this.module.notifyParentAdded(parentProxy as any);

            // Also add the reference the other way around
            parentProxy.notifyChildAdded(moduleProxy);

            // Inform the listener of a newly made connection
            this.connectionListener(parentProxy as any);
        }

        // Return the module
        return moduleProxy as any;
    }
}
