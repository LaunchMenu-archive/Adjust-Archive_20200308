import {NormalizedRequest} from "../_types/request";
import {ContractID} from "../_types/contractID";
import {ModuleContract} from "../../module/_types/moduleContract";
export abstract class AbstractModuleProvider<M extends ModuleContract> {
    // The type of requests to match
    protected type: ContractID<M>;

    // A filter to apply to determine the priority
    protected filter: (request: NormalizedRequest<M>) => number;

    /**
     * Creates a module provider for a certain interface
     * @param type The interface ID of the module that should be provided
     * @param filter A filter as to skip certain requests
     */
    constructor(
        type: ContractID<M>,
        filter: (request: NormalizedRequest<M>) => number = () => 1
    ) {
        this.type = type;
        this.filter = filter;
    }

    /**
     * Retrieves the type that this provider can provide a module for
     * @returns The module type
     */
    public getType(): ContractID<any> {
        return this.type;
    }

    /**
     * Retrieves the priority of this provider to provide a module
     * if 0 is returned, the provider shouldn't be used
     * @param request The request to provide for
     * @returns The priority for usage of this provider
     */
    public getPriority(request: NormalizedRequest<M>): number {
        if (this.type.ID != request.type.ID) return 0;
        // TODO: factor in user's ordering settings
        return Number(this.filter(request));
    }

    /**
     * Retrieves a module based on the request made
     * @param request The request that was sent
     */
    public abstract async getModule(request: NormalizedRequest<M>): Promise<M["child"]>;
}
