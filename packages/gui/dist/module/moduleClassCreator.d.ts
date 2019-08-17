import { ModuleClassCreator as CoreModuleClassCreator, Module as CoreModule } from "@adjust/core";
import { ExtendsClass, ExtendedModuleClass } from "@adjust/core/types";
import { Module } from "./module";
import { ParameterizedModuleConfig } from "./_types/ModuleConfig";
export declare class ModuleClassCreator extends CoreModuleClassCreator {
    /** @override */
    static createModule<MC extends ParameterizedModuleConfig, X extends ExtendsClass<typeof CoreModule, {}> = ExtendsClass<typeof Module, Module>>(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X>;
}
/**
 * A shortcut for the module creation method
 */
export declare const createModule: (typeof ModuleClassCreator)["createModule"];
