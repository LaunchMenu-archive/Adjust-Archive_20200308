import { NormalizedRequest } from "../_types/request";
import { ContractID } from "../_types/contractID";
import { ModuleContract } from "../../module/_types/moduleContract";
export declare abstract class AbstractModuleProvider<M extends ModuleContract> {
    protected type: ContractID<M>;
    protected filter: (request: NormalizedRequest<M>) => number;
    /**
     * Creates a module provider for a certain interface
     * @param type The interface ID of the module that should be provided
     * @param filter A filter as to skip certain requests
     */
    constructor(type: ContractID<M>, filter?: (request: NormalizedRequest<M>) => number);
    /**
     * Retrieves the type that this provider can provide a module for
     * @returns The module type
     */
    getType(): ContractID<any>;
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
    abstract getModule(request: NormalizedRequest<M>): Promise<M["child"]>;
}
