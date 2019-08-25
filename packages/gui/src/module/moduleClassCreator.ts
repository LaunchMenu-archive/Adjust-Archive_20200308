import {
    ModuleClassCreator as CoreModuleClassCreator,
    Module as CoreModule,
} from "@adjust/core";
import {ExtendsClass, ExtendedModuleClass} from "@adjust/core/types";
import {Module} from "./module";
import {ParameterizedModuleConfig} from "./_types/ModuleConfig";
import {Registry} from "../registry/registry";
import {LocationManagerType} from "../modules/location/locationManager.type";

// Specify that the default module to be used is our extend module
export class ModuleClassCreator extends CoreModuleClassCreator {
    /** @override */
    public static createModule<
        MC extends ParameterizedModuleConfig,
        // Can't use Module<{}, {}, any> instead of {}, due to it expecting private members
        X extends ExtendsClass<typeof CoreModule, {}> = ExtendsClass<
            typeof Module,
            Module
        >
    >(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X> {
        // Set the module class to the default module if not specified
        if (!moduleClass) moduleClass = Module as any;

        // Add location definition to the install method if present
        if (config.defineLocation) {
            const install = config.onInstall;
            config.onInstall = async (moduleClass: typeof CoreModule) => {
                // Obtain the location manager instance
                const locationManager = await Registry.createRoot({
                    type: LocationManagerType,
                });
                await locationManager.updateLocation(config.defineLocation);

                // Call the original install function
                if (install) return install(moduleClass);
            };

            if (!config.location) config.location = config.defineLocation.ID;
        }

        // If a module location is provided, assign it to the settings
        if (config.location)
            (config.settings as any).location = {
                default: config.location,
            };

        // Call the method as per usual
        return super.createModule(config, moduleClass);
    }

    /**
     * Method may be used to perform typechecking on a config
     * @param config The config to type check
     * @returns A copy of the module
     */
    public static createConfig<T extends ParameterizedModuleConfig>(config: T): T {
        return config;
    }
}

/**
 * A shortcut for the module creation method
 */
export const createModule: (typeof ModuleClassCreator)["createModule"] = ModuleClassCreator.createModule.bind(
    ModuleClassCreator
);

/**
 * A shortcut for the config creation method
 */
export const createConfig: (typeof ModuleClassCreator)["createConfig"] = ModuleClassCreator.createConfig.bind(
    ModuleClassCreator
);
