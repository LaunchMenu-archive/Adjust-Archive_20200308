import { ModuleReference } from "@adjust/core";
import { DragEvent } from "react";
import { LocationPath } from "../_types/LocationPath";
import { LocationAncestor } from "./locationAncestor.type";
import { ModuleLocation } from "../../../module/_types/ModuleLocation";
import LocationAncestorModule from "./locationAncestor";
export declare const config: {
    initialState: {
        locations: {
            [locationID: string]: {
                path: LocationPath;
                modules: {
                    ID: string;
                    module: ModuleReference;
                }[];
            };
        };
        modules: ModuleReference[];
        draggingModule: {
            moduleID: string;
            locationID: string;
            newLocationID: string;
        };
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
                modules: {
                    ID: string;
                    module: ModuleReference;
                }[];
            };
        };
        modules: ModuleReference[];
        draggingModule: {
            moduleID: string;
            locationID: string;
            newLocationID: string;
        };
    };
    getPriority: () => number;
    settings: {
        locations: {
            default: string[];
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./locationAncestor.type").LocationAncestorContract>;
}, typeof LocationAncestorModule>;
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
    setDropMode(drop: boolean): Promise<void>;
    /**
     * Starts moving a module to another location
     * @param locationID The ID of the location of the module being dragged
     * @param moduleID The ID of the module being dragged
     */
    onDragStart(locationID: string, moduleID: string): Promise<void>;
    /**
     * Handles dropping of a module at this location
     */
    onDrop(): Promise<void>;
    /**
     * Moves the locations when the drag ends
     */
    onDragEnd(): Promise<void>;
}
declare const LocationView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof LocationModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig, import("@adjust/core/types").ModuleInterface>, {}>>>;
export declare class LocationView extends LocationView_base {
    /**
     * Starts the dragging of a location
     * @param event The DOM event that starts the dragging
     * @param locationID The location that is dragged from
     * @param module The data of the module being dragged
     */
    protected onDragStart(event: DragEvent, locationID: string, module: {
        ID: string;
        module: JSX.Element;
    }): void;
    /**
     * Checks whether this is valid data for a drop
     * @param event The DOM event of the user dragging data
     */
    protected onDragOver(event: DragEvent): void;
    /**
     * Updates the locations when draging a location finishes
     * @param event The DOM event of the user dragging data
     */
    protected onDragEnd(event: DragEvent): void;
    /**
     * Handles the dropping of data
     * @param event The DOM event of the user dragging data
     */
    protected onDrop(event: DragEvent): void;
    cover: {
        position: any;
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    /**
     * Renders a daragable box for every module in edit mode
     */
    protected renderModuleBoxes(): JSX.Element[];
    /**@override */
    protected renderView(): JSX.Element;
}
export {};
