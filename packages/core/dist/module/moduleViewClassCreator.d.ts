import { Constructor, ExtendsClass } from "../utils/_types/standardTypes";
import { ParameterizedModule } from "./module";
import { ModuleView } from "./moduleView";
import { ExtendedModuleViewClass } from "./_types/extendedModuleView";
export declare class ModuleViewClassCreator {
    /**
     * Creates a new class extending the passed class, with a dynamic name
     * @param name The name for the class
     * @param cls The class to extend
     */
    protected static createNamedClass<K extends Constructor<any>>(name: string, cls: K): K;
    /**
     * A function to create a new module view class
     * @param module The module class to create the view for
     * @param initialState The initial state to augment the module state with
     * @param moduleView The module view class to extend
     */
    static createModuleView<M extends Constructor<any>, S extends object = {}, V extends ExtendsClass<typeof ModuleView, {}> = ExtendsClass<typeof ModuleView, ModuleView<{}, {}, ParameterizedModule, {}>>>(module: M, initialState?: S, moduleView?: V): ExtendedModuleViewClass<M, S, V>;
}
/**
 * A shortcut for the module view creation method
 */
export declare const createModuleView: (typeof ModuleViewClassCreator)["createModuleView"];
