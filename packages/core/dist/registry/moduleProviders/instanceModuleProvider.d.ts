import { ParameterizedModule } from "../../module/module";
import { AbstractModuleProvider } from "./abstractModuleProvider";
import { InterfaceID } from "../_types/interfaceID";
import { NormalizedRequest } from "../_types/request";
import { ModuleInterface } from "../../module/_types/moduleInterface";
import { PublicModuleMethods } from "../../module/_types/publicModuleMethods";
import { ModuleProxy } from "../../module/moduleProxy";
export declare class InstanceModuleProvider<M extends ModuleInterface> extends AbstractModuleProvider<M> {
    protected module: ParameterizedModule;
    protected connectionListener: (module: M["parent"]) => void;
    /**
     * Creates a module provider that is able to provide an already existing module
     * @param type The type of module that gets created
     * @param moduleClass The module class to create the instances from
     * @param filter The filter to apply to choose wherther or not to use this module
     * @param connectionListener A method that gets called when a new 'parent' connects
     */
    constructor(type: InterfaceID<M>, module: ParameterizedModule | ModuleProxy, filter?: (request: NormalizedRequest<M>) => number, connectionListener?: (module: M["parent"]) => void);
    /** @override*/
    getPriority(request: NormalizedRequest<M>): number;
    /** @override */
    getModule(request: NormalizedRequest<M>): Promise<M["child"] & PublicModuleMethods>;
}
