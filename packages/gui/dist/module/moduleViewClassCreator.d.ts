import { ModuleViewClassCreator as CoreModuleViewClassCreator, ModuleView as CoreModuleView, ParameterizedModule } from "@adjust/core";
import { Constructor, ExtendsClass, ExtendedModuleViewClass } from "@adjust/core/types";
import { ModuleView } from "./moduleView";
import { Module } from "./module";
export declare class ModuleViewClassCreator extends CoreModuleViewClassCreator {
    /** @override */
    static createModuleView<M extends Constructor<any>, S extends object = {}, V extends ExtendsClass<typeof ModuleView, CoreModuleView<{}, {}, ParameterizedModule, {}>> = ExtendsClass<typeof ModuleView, ModuleView<{}, {}, Module, {}>>>(module: M, initialState?: S, moduleView?: V): ExtendedModuleViewClass<M, S, V>;
}
/**
 * A shortcut for the module view creation method
 */
export declare const createModuleView: (typeof ModuleViewClassCreator)["createModuleView"];
