import { RegistrySingleton as AdjustRegistrySingleton } from "@adjust/core";
export declare const Registry: AdjustRegistrySingleton & {
    /**
     * Loads all the standard modules that AdjustMaterialUI provides
     * @param filter An optional function that decides what module classes to load (return true to be used)
     */
    loadDefaultClassModuleProviders(filter?: (moduleClass: any) => boolean): Promise<void>;
};
