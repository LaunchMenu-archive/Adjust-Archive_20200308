import { ModuleClassCreator as AdjustModuleClassCreator, Module as AdjustModule } from "@adjust/core";
import { ParameterizedModuleConfig, ExtendsClass, ExtendedModuleClass } from "@adjust/core/types";
import { Module } from "./module";
import { ModuleLocation } from "./_types/ModuleLocation";
export declare class ModuleClassCreator extends AdjustModuleClassCreator {
    /** @override */
    static createModule<MC extends ParameterizedModuleConfig & {
        location?: ModuleLocation;
    }, X extends ExtendsClass<typeof AdjustModule, {}> = ExtendsClass<typeof Module, Module>>(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X>;
}
/**
 * A shortcut for the module creation method
 */
export declare const createModule: (typeof ModuleClassCreator)["createModule"];
