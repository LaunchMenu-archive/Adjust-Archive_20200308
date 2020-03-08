import { ParameterizedModule } from "../../module/module";
import { AbstractModuleProvider } from "./abstractModuleProvider";
import { ContractID } from "../_types/contractID";
import { NormalizedRequest } from "../_types/request";
import { ModuleContract } from "../../module/_types/moduleContract";
import { ModuleProxy } from "../../module/moduleProxy";
export declare class InstanceModuleProvider<M extends ModuleContract> extends AbstractModuleProvider<M> {
    protected module: ParameterizedModule;
    protected connectionListener: (module: M["parent"]) => void;
    /**
     * Creates a module provider that is able to provide an already existing module
     * @param type The type of module that gets created
     * @param moduleClass The module class to create the instances from
     * @param filter The filter to apply to choose wherther or not to use this module
     * @param connectionListener A method that gets called when a new 'parent' connects
     */
    constructor(type: ContractID<M>, module: ParameterizedModule | ModuleProxy, filter?: (request: NormalizedRequest<M>) => number, connectionListener?: (module: M["parent"]) => void);
    /** @override*/
    getPriority(request: NormalizedRequest<M>): number;
    /** @override */
    getModule(request: NormalizedRequest<M>): Promise<M["child"]>;
}
