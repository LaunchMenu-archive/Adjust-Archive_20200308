import {
    ModuleViewClassCreator as CoreModuleViewClassCreator,
    ModuleView as CoreModuleView,
    ParameterizedModule,
} from "@adjust/core";
import {Constructor, ExtendsClass, ExtendedModuleViewClass} from "@adjust/core/types";
import {ModuleView} from "./moduleView";
import {Module} from "./module";

// Specify that the default module to be used is our extend module
export class ModuleViewClassCreator extends CoreModuleViewClassCreator {
    /** @override */
    public static createModuleView<
        M extends Constructor<any>,
        S extends object = {},
        // Can't use ModuleView<{}, {}, ParameterizedModule> instead of {}, due to it expecting private members
        V extends ExtendsClass<
            typeof ModuleView,
            CoreModuleView<{}, {}, ParameterizedModule, {}>
        > = ExtendsClass<typeof ModuleView, ModuleView<{}, {}, Module, {}>>
    >(module: M, initialState?: S, moduleView?: V): ExtendedModuleViewClass<M, S, V> {
        // Set the module view class to the default module if not specified
        if (!moduleView) moduleView = ModuleView as any;

        // Call the method as per usual
        return super.createModuleView(module, initialState, moduleView);
    }
}

/**
 * A shortcut for the module view creation method
 */
export const createModuleView: (typeof ModuleViewClassCreator)["createModuleView"] = ModuleViewClassCreator.createModuleView.bind(
    ModuleViewClassCreator
);
