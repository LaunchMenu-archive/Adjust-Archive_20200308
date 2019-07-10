import { LocationManager } from "./locationManager.type";
import { ModuleReference } from "@adjust/core";
import { ModuleLocation } from "../../module/_types/ModuleLocation";
import LocationAncestorModule from "./locationAncestor/locationAncestor";
import { LocationPath } from "./_types/LocationPath";
import { LocationAncestor } from "./locationAncestor/locationAncestor.type";
export declare const config: {
    initialState: {
        locations: {
            [locationAncestorID: string]: LocationAncestor;
        };
    };
    settings: {
        locations: {
            default: {
                [locationID: string]: LocationPath;
            };
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./locationManager.type").LocationManagerContract>;
};
declare const LocationManagerModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        locations: {
            [locationAncestorID: string]: LocationAncestor;
        };
    };
    settings: {
        locations: {
            default: {
                [locationID: string]: LocationPath;
            };
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./locationManager.type").LocationManagerContract>;
}, typeof LocationAncestorModule>;
/**
 * The location manager, whicih is a window manager (all windows are on the same level)
 */
export default class LocationManagerModule extends LocationManagerModule_base implements LocationManager {
    protected ancestorName: string;
    /** @override */
    protected onInit(): void;
    /** @override */
    protected onReloadInit(): void;
    /**
     * Retrieves a location path for the given location
     * @param location The module location to get the path for
     * @returns The retrieve location path
     */
    protected getLocationPath(location: ModuleLocation): LocationPath;
    /**
     * Updates the location path in the settings
     * @param locationPath The location path to be stored
     */
    protected updateLocationPath(locationPath: LocationPath): void;
    /** @override */
    openModule(module: ModuleReference, location: ModuleLocation): Promise<void>;
    /** @override */
    closeModule(module: ModuleReference, location: ModuleLocation): Promise<void>;
}
export {};
