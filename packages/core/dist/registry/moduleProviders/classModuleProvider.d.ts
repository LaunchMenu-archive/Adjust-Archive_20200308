import { ContractID } from "../_types/contractID";
import { NormalizedRequest } from "../_types/request";
import { ExtendsClass } from "../../utils/_types/standardTypes";
import { Module } from "../../module/module";
import { AbstractModuleProvider } from "./abstractModuleProvider";
import { ModuleContract } from "../../module/_types/moduleContract";
export declare class ClassModuleProvider<M extends ModuleContract> extends AbstractModuleProvider<M> {
    protected moduleClass: ExtendsClass<typeof Module>;
    /**
     * Creates a module provider that is able to create new modules from a given class
     * @param type The type of module that gets created
     * @param moduleClass The module class to create the instances from
     */
    constructor(type: ContractID<M>, moduleClass: ExtendsClass<typeof Module>);
    /**
     * Retrieves the module class that this provider creates modules with
     * @returns The module class of this provider
     */
    getModuleClass(): ExtendsClass<typeof Module>;
    /** @override */
    getModule(request: NormalizedRequest<M>): Promise<M["child"]>;
}
