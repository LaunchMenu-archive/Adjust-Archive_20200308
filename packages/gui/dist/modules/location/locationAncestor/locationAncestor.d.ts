import { ModuleReference } from "@adjust/core";
import { LocationPath } from "../_types/LocationPath";
import { LocationAncestor, LocationAncestorParent } from "./locationAncestor.type";
import { LocationsMoveData } from "../_types/LocationsMoveData";
import { ModuleLocation } from "../../../module/_types/ModuleLocation";
export declare const config: {
    initialState: {
        inEditMode: boolean;
        inDropMode: boolean;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./locationAncestor.type").LocationAncestorContract>;
    abstract: boolean;
};
declare const LocationAncestorModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        inEditMode: boolean;
        inDropMode: boolean;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./locationAncestor.type").LocationAncestorContract>;
    abstract: boolean;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core/dist/module/module").Module, import("@adjust/core/dist/module/module").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, {}, import("@adjust/core/types").ModuleInterface>>>;
/**
 * A base class for location ancestors to extend,
 * provides some common methods that location ancestors might use
 * Note that we use adjust core's createModule, since location ancestors shouldn't have any location data themselves
 */
export default class LocationAncestorModule extends LocationAncestorModule_base implements LocationAncestorParent {
    protected ancestorName: string;
    /**
     * Either gets the next ID from the path, or generates it and stores it in the path
     * @param path The location path to get the ID from
     * @returns the obtained or generated ID as well as the passed or updated path
     */
    protected getExtractID(path: LocationPath): {
        path: LocationPath;
        ID: string;
    };
    /**
     * Extracts the relevant hints for this ancestor from a module locatio;n
     * @param location The location and its creation hints
     * @returns Any hints that might have been provided
     */
    protected getLocationHints(location: ModuleLocation): object;
    /**
     * Gets the child location ancestor given a specified location path
     * @param inpPath The path to obtain the child by
     * @returns The ID of the child, as well as the child itself
     */
    protected getChildLocationAncestorFromPath(inpPath: LocationPath): Promise<{
        ID: string;
        path: LocationPath;
        locationAncestor: LocationAncestor;
    }>;
    /**
     * Gets the child location ancestor given a specified location path
     * @param ID The ID of the child, may be left out if the child has the same ID
     * Leaving it out would result in this instance and child sharing the same ID and path
     * @returns The child ancestor
     */
    protected getChildLocationAncestor(ID?: string): Promise<LocationAncestor>;
    /**
     * The settings condition to target the settings with the correct ID
     */
    settingsConditions: any;
    /** @override */
    setEditMode(edit: boolean): Promise<any>;
    /** @override */
    setDropMode(drop: boolean): Promise<void>;
    /** @override */
    setLocationsMoveData(data: LocationsMoveData): Promise<boolean>;
    /** @override */
    updateLocationsMoveData(data: LocationsMoveData): Promise<boolean>;
    /** @override */
    getLocationsMoveData(): Promise<LocationsMoveData>;
    /** @override */
    getLocationsAtPath(partialPath: string[]): Promise<ModuleLocation[]>;
    /** @override */
    getModulesAtPath(partialPath: string[]): Promise<ModuleReference[]>;
    /** @override */
    getLocationPath(location: string): Promise<LocationPath>;
    /** @override */
    updateMovedLocations(delay?: number): Promise<void>;
}
export {};
