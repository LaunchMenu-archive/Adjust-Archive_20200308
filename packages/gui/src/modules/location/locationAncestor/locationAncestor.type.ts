import {Registry, ModuleReference} from "@adjust/core";
import {PublicModuleMethods} from "@adjust/core/types";
import {LocationPath} from "../_types/LocationPath";

export type LocationAncestor = {
    /**
     * Opens a module at the given location
     * @param module The module to open
     * @param location The location to open it in, and the path of nodes along the way
     * @returns The location path that ended up being used, prefixed by own locationID (this.getData().id)
     */
    openModule(module: ModuleReference, location: LocationPath): Promise<LocationPath>;

    /**
     * Close a module from the given location
     * @param module The module to close
     * @param location The location to close it from
     * @returns Whether or not the module was successfully closed from this location
     */
    closeModule(module: ModuleReference, location: LocationPath): Promise<boolean>;

    //TODO: add request focus method
} & PublicModuleMethods;
export type LocationAncestorParent = {};
export type LocationAncestorContract = {
    parent: LocationAncestorParent;
    child: LocationAncestor;
    data: {
        id: string;
    };
};

// Export the interfaceID type
export const LocationAncestorID = Registry.createInterfaceID<LocationAncestorContract>(
    __filename
);
