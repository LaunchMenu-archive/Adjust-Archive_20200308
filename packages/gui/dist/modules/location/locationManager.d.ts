import { ModuleReference } from "@adjust/core";
import { SettingsDataID } from "@adjust/core";
import { LocationManager } from "./locationManager.type";
import { ModuleLocation } from "../../module/_types/ModuleLocation";
import LocationAncestorModule from "./locationAncestor/locationAncestor";
import { LocationPath } from "./_types/LocationPath";
import { LocationAncestor } from "./locationAncestor/locationAncestor.type";
import { LocationsMoveData } from "./_types/LocationsMoveData";
import { LocationAncestorIDs } from "./_types/LocationAncestorIDs";
export declare const config: {
    initialState: {
        locationAncestors: {
            [locationAncestorID: string]: LocationAncestor;
        };
        locations: {
            [locationID: string]: {
                modules: ModuleReference[];
            };
        };
        editMode: boolean;
        locationMoveData: LocationsMoveData;
    };
    settings: {
        locations: {
            default: {
                [locationID: string]: {
                    path: LocationPath;
                    modules: SettingsDataID[];
                };
            };
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./locationManager.type").LocationManagerContract>;
};
declare const LocationManagerModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        locationAncestors: {
            [locationAncestorID: string]: LocationAncestor;
        };
        locations: {
            [locationID: string]: {
                modules: ModuleReference[];
            };
        };
        editMode: boolean;
        locationMoveData: LocationsMoveData;
    };
    settings: {
        locations: {
            default: {
                [locationID: string]: {
                    path: LocationPath;
                    modules: SettingsDataID[];
                };
            };
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./locationManager.type").LocationManagerContract>;
}, typeof LocationAncestorModule>;
/**
 * Accepts location hints:
 * - ID: String (The ID of the window to open)
 * - sameAs: String (The ID of a location in the same window)
 */
/**
 * The location manager, which in this implementation also is a window manager (all windows are on the same level)
 */
export default class LocationManagerModule extends LocationManagerModule_base implements LocationManager {
    protected ancestorName: string;
    /** @override */
    protected onInit(): Promise<void>;
    /** @override */
    protected onReloadInit(): Promise<void>;
    /**
     * Retrieves a location path for the given location
     * @param location The module location to get the path for
     * @returns The retrieve location path
     */
    protected getLocationPath(location: ModuleLocation | string): LocationPath;
    /**
     * Updates the location path in the settings
     * @param locationPath The location path to be stored
     */
    protected updateLocationPath(locationPath: LocationPath): void;
    /**
     * Retrieves the location ancestor with a given ID
     * @param ancestorID The ID of the location ancestor to retrieve
     * @returns The ancestor that was either already loaded, or was just opened
     */
    protected getAncestor(ancestorID: string): Promise<LocationAncestor>;
    /** @override */
    updateLocation(location: ModuleLocation): Promise<void>;
    /** @override */
    updateModuleLocation(settingsDataID: SettingsDataID, newLocationIDs: string[], oldLocationIDs: string[]): Promise<void>;
    /**
     * General approach:
     * - User enables edit mode
     * - User selects some locationAncestor to move by dragging (which calls setLocationsMoveData)
     * - User selects a target by dropping (which calls getLocationsMoveData and updateLocationsMoveData)
     * - updateMovedLocations is striggered by the drop/mouse up event
     */
    /** @override */
    setEditMode(edit: boolean): Promise<boolean>;
    /** @override */
    setLocationsMoveData(data: LocationsMoveData): Promise<boolean>;
    /** @override */
    updateLocationsMoveData(data: LocationsMoveData): Promise<boolean>;
    /** @override */
    getLocationsMoveData(): Promise<LocationsMoveData>;
    /** @override */
    getLocationsAtPath(partialPath: LocationAncestorIDs): Promise<ModuleLocation[]>;
    /**
     * Updates the actual locations that were just moved (update the actual ancestors representing them)
     */
    protected updateMovedLocations(): Promise<void>;
    /** @override */
    openModule(module: ModuleReference, location: string): Promise<void>;
    /** @override */
    closeModule(module: ModuleReference, location: string): Promise<void>;
    /** @override */
    showModule(module: ModuleReference, location: string): Promise<boolean>;
    /** @override */
    isModuleOpened(module: ModuleReference, locationID: string): Promise<boolean>;
    /**
     * Retrieves the modules that are opened at a given location
     * @param location The ID of the location to get the opened modules of
     * @returns The modules that are opened at this location in this settions
     */
    protected getModulesAtLocation(location: string): ModuleReference[];
}
export {};
