/// <reference types="react" />
import { ModuleReference } from "@adjust/core";
import { LocationPath } from "../_types/LocationPath";
import { LocationAncestor } from "./locationAncestor.type";
import { ModuleLocation } from "../../../module/_types/ModuleLocation";
export declare const config: {
    initialState: {
        locations: {
            [locationID: string]: {
                path: LocationPath;
                modules: ModuleReference[];
            };
        };
        modules: ModuleReference[];
        editMode: boolean;
        dropMode: boolean;
    };
    getPriority: () => number;
    settings: {
        locations: {
            default: string[];
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./locationAncestor.type").LocationAncestorContract>;
};
declare const LocationModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        locations: {
            [locationID: string]: {
                path: LocationPath;
                modules: ModuleReference[];
            };
        };
        modules: ModuleReference[];
        editMode: boolean;
        dropMode: boolean;
    };
    getPriority: () => number;
    settings: {
        locations: {
            default: string[];
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./locationAncestor.type").LocationAncestorContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").Module, import("@adjust/core").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, {}, import("@adjust/core/types").ModuleInterface>>>;
/**
 * The location class that simply renders a location when requested
 */
export default class LocationModule extends LocationModule_base implements LocationAncestor {
    /** @override*/
    openModule(module: ModuleReference, locationPath: LocationPath): Promise<LocationPath>;
    /** @override*/
    closeModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
    /** @override*/
    showModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
    /** @override */
    createLocation(location: ModuleLocation): Promise<LocationPath>;
    /** @override */
    removeLocation(locationPath: LocationPath): Promise<boolean>;
    /** @override */
    setEditMode(edit: boolean): Promise<void>;
    /** @override */
    setDropMode(drop: boolean): Promise<void>;
}
declare const LocationView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof LocationModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig, import("@adjust/core/types").ModuleInterface>>>>;
export declare class LocationView extends LocationView_base {
    protected renderView(): JSX.Element;
}
export {};
