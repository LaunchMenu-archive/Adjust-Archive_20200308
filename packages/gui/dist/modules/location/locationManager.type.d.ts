import { ModuleReference, SettingsDataID } from "@adjust/core";
import { PublicModuleMethods } from "@adjust/core/types";
import { ModuleLocation } from "../../module/_types/ModuleLocation";
export declare type LocationManager = {
    /**
     * Opens a module at the given location
     * @param module The module to open
     * @param locationID The ID of the location to open it in
     */
    openModule(module: ModuleReference, locationID: string): Promise<void>;
    /**
     * Close a module from the given location
     * @param module The module to close
     * @param locationID The ID of the location to close it from
     */
    closeModule(module: ModuleReference, locationID: string): Promise<void>;
    /**
     * Makes sure a module is shown at the given location, if the location path is known/correct
     * @param module The module to show
     * @param locationID The ID of the location at which the module should be shown (A module might be opened in multiple locations)
     * @returns Whether or not the given location path is known and contains the passed module
     */
    showModule(module: ModuleReference, locationID: string): Promise<boolean>;
    /**
     * Checks whether a module is currently opened at a given location
     * @param module The ;module for which to check whether it is opened
     * @param locationID THe ID of the location to check at
     * @return Whether or not the module is opened
     */
    isModuleOpened(module: ModuleReference, locationID: string): Promise<boolean>;
    /**
     * Updates the stored location of the module under this setting, doesn't alter the actual location
     * @param settingsDataID The setting to update the location for
     * @param newLocationIDs The new locations that is stored in settings, or undefined if the setting got removed
     * @param oldLocationIDs The old locations that was stored in settings, or undefined if the setting is new
     */
    updateModuleLocation(settingsDataID: SettingsDataID, newLocationIDs: string[], oldLocationIDs: string[]): Promise<void>;
    /**
     * Updates the location by recreating it using the potentially altered hints,
     * Simply creates the location if not present already
     * @param location The location ID and hints for creation
     */
    updateLocation(location: ModuleLocation): Promise<void>;
    /**
     * Sets whether or not the user is currently able to change the locations and their ancestors
     * @param edit Whether or not editing will be enabled
     * @returns Whether or not the value was successfully changed
     */
    setEditMode(edit: boolean): Promise<boolean>;
} & PublicModuleMethods;
export declare type LocationManagerParent = {};
export declare type LocationManagerContract = {
    parent: LocationManagerParent;
    child: LocationManager;
};
export declare const LocationManagerID: import("@adjust/core/types").InterfaceID<LocationManagerContract>;
