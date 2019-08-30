import { ModuleReference } from "@adjust/core";
import { SettingsDataID } from "@adjust/core";
import { LocationManager } from "./locationManager.type";
import { ModuleLocation } from "../../module/_types/ModuleLocation";
import LocationAncestorModule from "./locationAncestor/locationAncestor";
import { LocationPath } from "./_types/LocationPath";
import { LocationsMoveData } from "./_types/LocationsMoveData";
import { LocationAncestor } from "./locationAncestor/locationAncestor.type";
export declare const config: {
    state: {
        locations: {
            [locationID: string]: {
                modules: ModuleReference[];
            };
        };
        locationMoveData: LocationsMoveData;
        locationAncestor: Promise<import("@adjust/core/types").ChildModule<{
            openModule(module: ModuleReference, locationPath: LocationPath): Promise<LocationPath>;
            closeModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
            showModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
            createLocation(location: ModuleLocation): Promise<LocationPath>;
            removeLocation(locationPath: LocationPath): Promise<boolean>;
            removeAncestor(): Promise<void>;
            setEditMode(edit: boolean): Promise<void>;
            setDropMode(drop: boolean): Promise<void>;
        }>>;
    };
    settings: {
        locations: {
            default: {
                [locationID: string]: {
                    path: LocationPath;
                    modules: SettingsDataID[];
                };
            };
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
        };
    };
    type: import("@adjust/core/types").ContractID<import("./locationManager.type").LocationManagerContract>;
};
declare const LocationManagerModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        locations: {
            [locationID: string]: {
                modules: ModuleReference[];
            };
        };
        locationMoveData: LocationsMoveData;
        locationAncestor: Promise<import("@adjust/core/types").ChildModule<{
            openModule(module: ModuleReference, locationPath: LocationPath): Promise<LocationPath>;
            closeModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
            showModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
            createLocation(location: ModuleLocation): Promise<LocationPath>;
            removeLocation(locationPath: LocationPath): Promise<boolean>;
            removeAncestor(): Promise<void>;
            setEditMode(edit: boolean): Promise<void>;
            setDropMode(drop: boolean): Promise<void>;
        }>>;
    };
    settings: {
        locations: {
            default: {
                [locationID: string]: {
                    path: LocationPath;
                    modules: SettingsDataID[];
                };
            };
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
        };
    };
    type: import("@adjust/core/types").ContractID<import("./locationManager.type").LocationManagerContract>;
}, typeof LocationAncestorModule>;
/**
 * The location manager, responsible for keeping track of all locations in the system, and linking them with modules
 */
export default class LocationManagerModule extends LocationManagerModule_base implements LocationManager {
    /** @override */
    protected onPreInit(): Promise<void>;
    /**
     * Retrieves the location ancestor to be used
     * @returns The obtained location ancestor
     */
    protected getAncestor(): Promise<LocationAncestor>;
    /**
     * Retrieves a location path for the given location
     * @param location The module location to get the path for
     * @returns The retrieve location path
     */
    getLocationPath(location: ModuleLocation | string): Promise<LocationPath>;
    /**
     * Updates the location path in the settings
     * @param locationPath The location path to be stored
     */
    protected updateLocationPath(locationPath: LocationPath): void;
    /** @override */
    updateLocation(location: ModuleLocation): Promise<void>;
    /** @override */
    updateModuleLocation(settingsDataID: SettingsDataID, newLocationIDs: string[], oldLocationIDs: string[]): Promise<void>;
    /**
     * General approach:
     * - User enables edit mode
     * - User selects some locationAncestor to move by dragging (which calls setLocationsMoveData)
     * - User selects a target by dropping (which calls getLocationsMoveData and updateLocationsMoveData)
     * - updateMovedLocations to finalize the movement of data
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
    getLocationsAtPath(partialPath: string[]): Promise<ModuleLocation[]>;
    /** @override */
    updateMovedLocations(delay?: number): Promise<void>;
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
    /** @override */
    getModulesAtPath(partialPath: string[]): Promise<ModuleReference[]>;
}
export {};
