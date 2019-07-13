import Path from "path";
import {
    Registry as AdjustRegistry,
    RegistrySingleton as AdjustRegistrySingleton,
    ParameterizedModule,
} from "@adjust/core";
import {ExtendsClass} from "@adjust/core/types";

// TODO: think of a better way to handle singleton patterns and extendability in Adjust
const loadDefaultClassModuleProviders = AdjustRegistry.loadDefaultClassModuleProviders.bind(
    AdjustRegistry
);
(AdjustRegistry as any).__proto__.loadDefaultClassModuleProviders = async function(
    filter: (moduleClass: ExtendsClass<ParameterizedModule>) => boolean = () => true
) {
    await loadDefaultClassModuleProviders();
    await this.loadClassModuleProviders(
        Path.join(__dirname, "..", "modules"),
        "gui",
        filter
    );
};

export const Registry = AdjustRegistry as AdjustRegistrySingleton & {
    /**
     * Loads all the standard modules that AdjustMaterialUI provides
     * @param filter An optional function that decides what module classes to load (return true to be used)
     */
    loadDefaultClassModuleProviders(
        filter?: (moduleClass: ExtendsClass<ParameterizedModule>) => boolean
    ): Promise<void>;
};
