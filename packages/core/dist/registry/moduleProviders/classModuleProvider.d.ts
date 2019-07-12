import { InterfaceID } from "../_types/interfaceID";
import { NormalizedRequest } from "../_types/request";
import { ExtendsClass } from "../../utils/_types/standardTypes";
import { Module } from "../../module/module";
import { AbstractModuleProvider } from "./abstractModuleProvider";
import { ModuleInterface } from "../../module/_types/moduleInterface";
import { PublicModuleMethods } from "../../module/_types/publicModuleMethods";
export declare class ClassModuleProvider<M extends ModuleInterface> extends AbstractModuleProvider<M> {
    protected moduleClass: ExtendsClass<typeof Module>;
    /**
     * Creates a module provider that is able to create new modules from a given class
     * @param type The type of module that gets created
     * @param moduleClass The module class to create the instances from
     */
    constructor(type: InterfaceID<M>, moduleClass: ExtendsClass<typeof Module>);
    /**
     * Retrieves the module class that this provider creates modules with
     * @returns The module class of this provider
     */
    getModuleClass(): ExtendsClass<typeof Module>;
    /** @override */
    getModule(request: NormalizedRequest<M>): Promise<M["child"] & PublicModuleMethods>;
}
