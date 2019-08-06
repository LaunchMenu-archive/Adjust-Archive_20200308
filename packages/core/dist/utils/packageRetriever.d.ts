import { Package } from "./_types/package";
/**
 * A class dedicated to retrieving package files of modules
 */
declare class PackageRetrieverSingleton {
    protected packages: {
        [key: string]: Package;
    };
    /**
     * Requires a given path and returns the package of the module
     * @param path An absolute path to start the lookup at
     * @returns The closest package file
     */
    requireModulePackage(path: string): Package;
}
export declare const PackageRetriever: PackageRetrieverSingleton;
export {};
