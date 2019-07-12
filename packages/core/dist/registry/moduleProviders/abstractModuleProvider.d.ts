import { NormalizedRequest } from "../_types/request";
import { InterfaceID } from "../_types/interfaceID";
import { ModuleInterface } from "../../module/_types/moduleInterface";
import { PublicModuleMethods } from "../../module/_types/publicModuleMethods";
export declare abstract class AbstractModuleProvider<M extends ModuleInterface> {
    protected type: InterfaceID<M>;
    protected filter: (request: NormalizedRequest<M>) => number;
    /**
     * Creates a module provider for a certain interface
     * @param type The interface ID of the module that should be provided
     * @param filter A filter as to skip certain requests
     */
    constructor(type: InterfaceID<M>, filter?: (request: NormalizedRequest<M>) => number);
    /**
     * Retrieves the type that this provider can provide a module for
     * @returns The module type
     */
    getType(): InterfaceID<any>;
    /**
     * Retrieves the priority of this provider to provide a module
     * if 0 is returned, the provider shouldn't be used
     * @param request The request to provide for
     * @returns The priority for usage of this provider
     */
    getPriority(request: NormalizedRequest<M>): number;
    /**
     * Retrieves a module based on the request made
     * @param request The request that was sent
     */
    abstract getModule(request: NormalizedRequest<M>): Promise<M["child"] & PublicModuleMethods>;
}
