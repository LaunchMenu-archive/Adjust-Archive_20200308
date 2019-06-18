import { ModuleReference } from "@adjust/core";
import { PublicModuleMethods } from "@adjust/core/types";
import { ModuleLocation } from "../../module/_types/ModuleLocation";
export declare type LocationManager = {
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
export declare type LocationManagerParent = {};
export declare type LocationManagerContract = {
    parent: LocationManagerParent;
    child: LocationManager;
};
export declare const LocationManagerID: import("@adjust/core/types").InterfaceID<LocationManagerContract>;
