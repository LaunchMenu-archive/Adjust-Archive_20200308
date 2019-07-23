import { ModuleClassCreator as AdjustModuleClassCreator, Module as AdjustModule } from "@adjust/core";
import { ExtendsClass, ExtendedModuleClass } from "@adjust/core/types";
import { Module } from "./module";
import { ParameterizedModuleConfig } from "./_types/ModuleConfig";
export declare class ModuleClassCreator extends AdjustModuleClassCreator {
    /** @override */
    static createModule<MC extends ParameterizedModuleConfig, X extends ExtendsClass<typeof AdjustModule, {}> = ExtendsClass<typeof Module, Module>>(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X>;
}
/**
 * A shortcut for the module creation method
 */
export declare const createModule: (typeof ModuleClassCreator)["createModule"];
