import { ModuleReference } from "@adjust/core";
import { ModuleLocation } from "../../../../../module/_types/ModuleLocation";
import LocationAncestorModule from "../../../locationAncestor/locationAncestor";
import { LocationPath } from "../../../_types/LocationPath";
import { WindowSelector } from "./windowSelector/windowSelector.type";
import { Window, WindowParent } from "./window/window.type";
import { LocationAncestor } from "../../locationAncestor.type";
export declare const config: {
    initialState: {
        windows: {
            [windowID: string]: Promise<Window>;
        };
        windowSelector: WindowSelector;
    };
    settings: {
        windows: {
            default: {
                [windowID: string]: {
                    name: string;
                };
            };
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("../../locationAncestor.type").LocationAncestorContract>;
};
declare const WindowManagerModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        windows: {
            [windowID: string]: Promise<Window>;
        };
        windowSelector: WindowSelector;
    };
    settings: {
        windows: {
            default: {
                [windowID: string]: {
                    name: string;
                };
            };
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("../../locationAncestor.type").LocationAncestorContract>;
}, typeof LocationAncestorModule>;
/**
 * Accepts location hints:
 * - ID: String (The ID of the window to open)
 * - sameAs: String (The ID of a location in the same window)
 */
/**
 * The window manager, responsible for keeping track and opening all windows that are used as locations
 */
export default class WindowManagerModule extends WindowManagerModule_base implements LocationAncestor, WindowParent {
    protected ancestorName: string;
    /** @override */
    protected onInit(fromReload: boolean): Promise<void>;
    /**
     * Retrieves the window with a given ID
     * @param windowID The ID of the window to retrieve
     * @param create Whether or not to create the window if not present
     * @returns The window hat was either already loaded, or was just opened
     */
    protected getWindow(windowID: string, create?: boolean): Promise<Window>;
    /**
     * Closes the window with a given ID if currently opened
     * @param ancestorID The ID of the window to close
     */
    protected closeWindow(ancestorID: string): Promise<void>;
    /** @override */
    changeWindowName(name: string): Promise<void>;
    /** @override */
    createLocation(location: ModuleLocation): Promise<LocationPath>;
    /** @override */
    removeLocation(locationPath: LocationPath): Promise<boolean>;
    /** @override */
    openModule(module: ModuleReference, locationPath: LocationPath): Promise<LocationPath>;
    /** @override */
    closeModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
    /** @override */
    showModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
    /**
     * General approach:
     * - User enables edit mode
     * - User selects some locationAncestor to move by dragging (which calls setLocationsMoveData)
     * - User selects a target by dropping (which calls getLocationsMoveData and updateLocationsMoveData)
     * - updateMovedLocations to finalize the movement of data
     */
    /** @override */
    setDropMode(drop: boolean): Promise<void>;
    /** @override */
    setEditMode(edit: boolean): Promise<void>;
}
export {};
