import {Module, ParameterizedModule} from "../../module/module";
import {AbstractModuleProvider} from "./abstractModuleProvider";
import {ParameterizedInterfaceID, InterfaceID} from "../_types/interfaceID";
import {NormalizedRequest} from "../_types/request";
import {ModuleInterface} from "../../module/_types/moduleInterface";
import {PublicModuleMethods} from "../../module/_types/publicModuleMethods";
import {Registry} from "../registry";
import {ModuleProxy} from "../../module/moduleProxy";

export class InstanceModuleProvider<
    M extends ModuleInterface
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
        type: InterfaceID<M>,
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
        if (this.module.state.isStopping) {
            Registry.removeProvider(this);
            return 0;
        }

        // Call the standard get priority method
        return super.getPriority(request);
    }

    /** @override */
    public async getModule(
        request: NormalizedRequest<M>
    ): Promise<M["child"] & PublicModuleMethods> {
        // Make a copy of the request but overwrite the parent
        const parentProxy = request.parent.createProxy();
        request = Object.assign({}, request, {parent: parentProxy});

        // Create the proxy for the module
        const moduleProxy = this.module.createProxy();

        // Connect the proxies and add this as a parent
        moduleProxy.connect(parentProxy);
        this.module.addParent(parentProxy as any);

        // Inform the module of a newly made connection
        this.connectionListener(parentProxy as any);

        // Return the module
        return moduleProxy as any;
    }
}
