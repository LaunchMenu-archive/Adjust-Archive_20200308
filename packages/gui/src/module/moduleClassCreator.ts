import {
    ModuleClassCreator as AdjustModuleClassCreator,
    Module as AdjustModule,
} from "@adjust/core";
import {ExtendsClass, ModuleInterface, ExtendedModuleClass} from "@adjust/core/types";
import {Module} from "./module";
import {ModuleLocation} from "./_types/ModuleLocation";
import {ParameterizedModuleConfig} from "./_types/ModuleConfig";

// Specify that the default module to be used is our extend module
export class ModuleClassCreator extends AdjustModuleClassCreator {
    /** @override */
    public static createModule<
        MC extends ParameterizedModuleConfig & {location?: ModuleLocation},
        // Can't use Module<{}, {}, any> instead of {}, due to it expecting private members
        X extends ExtendsClass<typeof AdjustModule, {}> = ExtendsClass<
            typeof Module,
            Module
        >
    >(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X> {
        // Set the module class to the default module if not specified
        if (!moduleClass) moduleClass = Module as any;

        // If a module location is provided, assign it to the settings
        if (config.location)
            (config.settings as any).location = {
                default: config.location,
            };

        // Add location definition to the install method if present
        if (config.defineLocation) {
            const install = config.onInstall;
            config.onInstall = async () => {
                // TODO: make install happen after loading all modules, not while loading modules

                // Call the original install function
                if (install) return install();
            };
        }

        // Call the method as per usual
        return super.createModule(config, moduleClass);
    }
}

/**
 * A shortcut for the module creation method
 */
export const createModule: (typeof ModuleClassCreator)["createModule"] = ModuleClassCreator.createModule.bind(
    ModuleClassCreator
);
