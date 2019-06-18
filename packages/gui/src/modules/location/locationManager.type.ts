import {Registry, ModuleReference} from "@adjust/core";
import {PublicModuleMethods} from "@adjust/core/types";
import {ModuleLocation} from "../../module/_types/ModuleLocation";

export type LocationManager = {
    /**
     * Opens a module at the given location
     * @param module The module to open
     * @param location The location to open it in
     */
    openModule(module: ModuleReference, location: ModuleLocation): Promise<void>;

    /**
     * Close a module from the given location
     * @param module The module to close
     * @param location The location to close it from
     */
    closeModule(module: ModuleReference, location: ModuleLocation): Promise<void>;
} & PublicModuleMethods;
export type LocationManagerParent = {};
export type LocationManagerContract = {
    parent: LocationManagerParent;
    child: LocationManager;
};

// Export the interfaceID type
export const LocationManagerID = Registry.createInterfaceID<LocationManagerContract>(
    __filename
);
