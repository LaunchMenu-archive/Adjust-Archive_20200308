import { PublicModuleMethods } from "@adjust/core/types";
import { LocationsMoveData } from "../../../../_types/LocationsMoveData";
/**
 * A type used by the location manager to move a location to a new, or currently not opened window
 */
export declare type WindowSelector = {
    /**
     * Sets the names of available windows
     * @param windows The list of window names
     */
    setWindowNames(windows: string[]): Promise<void>;
    /**
     * Sets whether or not the selector should be visible
     * @param enabled Whether or not the selector is visible
     */
    setEnabled(enabled: boolean): Promise<void>;
} & PublicModuleMethods;
export declare type WindowSelectorParent = {
    /**
     * Updates the data of where teh locations are being moved to, by updating their hints
     * @param data The data, containing the hints for the new location(s)
     * @returns Whether or not the data was successfully set (won't be the case if there is no current data)
     */
    updateLocationsMoveData(data: LocationsMoveData): Promise<boolean>;
    /**
     * Retrieves the current locations move data
     * @returns The currently set locations move data
     */
    getLocationsMoveData(): Promise<LocationsMoveData>;
    /**
     * Updates the name of the window
     * @param name The name that the window wants to have
     * @param windowID The ID of the window whose name to change
     */
    changeWindowName(name: string, windowID: string): Promise<void>;
};
export declare type WindowSelectorContract = {
    parent: WindowSelectorParent;
    child: WindowSelector;
};
export declare const WindowSelectorID: import("@adjust/core/types").InterfaceID<WindowSelectorContract>;
