import {Registry} from "@adjust/core";
import {PublicModuleMethods} from "@adjust/core/types";
import {LocationsMoveData} from "../_types/LocationsMoveData";
import {ModuleLocation} from "../../../module/_types/ModuleLocation";

/**
 * A type used by the location manager to move a location to a new, or currently not opened window
 */
export type WindowSelector = {
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
export type WindowSelectorParent = {
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
};
export type WindowSelectorContract = {
    parent: WindowSelectorParent;
    child: WindowSelector;
};

// Export the windowSelectorID type
export const WindowSelectorID = Registry.createInterfaceID<WindowSelectorContract>(
    __filename
);
