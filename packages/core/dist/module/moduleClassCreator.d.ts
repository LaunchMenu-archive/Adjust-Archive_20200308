import { ParameterizedModuleConfig } from "./_types/moduleConfig";
import { ExtendedModuleClass } from "./_types/extendedModule";
import { Constructor, ExtendsClass } from "../utils/_types/standardTypes";
import { Module } from "./module";
import { ModuleInterface } from "./_types/moduleInterface";
export declare class ModuleClassCreator {
    /**
     * Creates a new class extending the passed class, with a dynamic name
     * @param name The name for the class
     * @param cls The class to extend
     */
    protected static createNamedClass<K extends Constructor<any>>(name: string, cls: K): K;
    /**
     * A function to create a new module class
     * @param config The module config
     * @param module The module to extend
     */
    static createModule<MC extends ParameterizedModuleConfig, X extends ExtendsClass<typeof Module, {}> = ExtendsClass<typeof Module, Module<typeof Module.config.initialState, {}, ModuleInterface>>>(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X>;
}
/**
 * A shortcut for the module creation method
 */
export declare const createModule: (typeof ModuleClassCreator)["createModule"];
