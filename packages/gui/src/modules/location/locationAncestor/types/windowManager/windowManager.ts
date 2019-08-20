import {createModule, ModuleReference, UUID, ExtendedObject} from "@adjust/core";
import {ModuleLocation} from "../../../../../module/_types/ModuleLocation";
import LocationAncestorModule from "../../../locationAncestor/locationAncestor";
import {LocationPath} from "../../../_types/LocationPath";
import {WindowSelector, WindowSelectorType} from "./windowSelector/windowSelector.type";
import {Window, WindowType, WindowParent} from "./window/window.type";
import {LocationAncestorType, LocationAncestor} from "../../locationAncestor.type";
import {WindowsData} from "./_types/windowData";

export const windowManagerConfig = {
    initialState: {
        // Keep track of currently opened windows
        windows: {} as {
            [windowID: string]: {
                opened: boolean; // Whether or not the window is visually opened
                window: Promise<Window>;
            };
        },
        // The window selector to handle windpws that are currently not opened
        windowSelector: null as WindowSelector,
    },
    settings: {
        // Keep track of direct child locations
        windows: {
            default: {} as WindowsData,
            type: "windows",
        },
    },
    getPriority: () => 3,
    type: LocationAncestorType,
};

/**
 * type "Window" Accepts one of location hints:
 * - ID: String (The ID of the window to open)
 * - sameAs: String (The ID of a location in the same window)
 * - new: String (Whether a new window should be created)
 *
 * And if 'new' is set:
 * - name: String (The name that any newly created window should have)
 */

/**
 * The window manager, responsible for keeping track and opening all windows that are used as locations
 */
export class WindowManagerModule
    extends createModule(windowManagerConfig, LocationAncestorModule)
    implements LocationAncestor, WindowParent {
    // The name of this ancestor type to be used in the location path and hints
    protected ancestorName: string = "window";

    /** @override */
    protected async onInit(fromReload: boolean): Promise<void> {
        await super.onInit(fromReload);

        if (!fromReload)
            this.setState({
                windowSelector: await this.request({
                    type: WindowSelectorType,
                    data: {path: this.getData().path},
                }),
            });
    }

    // Window module managment
    /**
     * Retrieves the window with a given ID, or creates it if absent and open is true
     * @param windowID The ID of the window to retrieve
     * @param open Whether or not to open the window if not present
     * @param name THe name of the window
     * @returns The window hat was either already loaded, or was just opened
     */
    protected async getWindow(
        windowID: string,
        open: boolean = true,
        name?: string
    ): Promise<Window> {
        // Check if the window is already opened
        let windowData = this.state.windows[windowID];

        if (!windowData && open) {
            // Request the window
            windowData = {
                window: this.request({
                    type: WindowType,
                    data: {
                        ID: windowID,
                        path: [windowID],
                    },
                }),
                opened: false,
            };
            const window = windowData.window;

            // Update the state to contain this location ancestor
            this.setState({
                windows: {
                    [windowID]: windowData,
                },
            });

            // Define the window data if absent
            if (!this.settings.windows[windowID])
                await this.setSettings(
                    {
                        windows: {
                            [windowID]: {
                                name: name || windowID,
                            },
                        },
                    },
                    this.settingsConditions
                );

            // Make sure to initialise the correct state
            if (this.state.inEditMode) (await window).setEditMode(true);
            if (this.state.inDropMode) (await window).setDropMode(true);

            // Send updated data to the window selector
            await this.updateWindowSelectorData();

            // Set the window's name
            (await window).setName(this.settings.windows[windowID].name);
        }

        // Return the window
        return windowData && (await windowData.window);
    }

    /**
     * Closes the window with a given ID if currently opened
     * @param windowID The ID of the window to close
     */
    protected async closeWindow(windowID: string): Promise<void> {
        // Get the window if opened
        let windowData = this.state.windows[windowID];

        if (windowData) {
            const window = await windowData.window;

            // Remove it from the state
            this.setState({
                windows: {
                    [windowID]: undefined,
                },
            });

            // Close it
            await window.close();

            // Send updated data to the window selector
            await this.updateWindowSelectorData();
        }
    }

    /**
     * Removes all the associated data of a window
     * @param windowID The ID of the window to remove
     */
    protected async removeWindow(windowID: string): Promise<void> {
        // Retrieve the window in order to remove all its data
        const window = await this.getWindow(windowID);

        // Remove the window completely
        if (window) await window.removeAncestor();

        // Remove the associated data
        await this.setSettings(
            {
                windows: {
                    [windowID]: undefined,
                },
            },
            this.settingsConditions
        );

        // Close the window
        await this.closeWindow(windowID);
    }

    /** @override */
    public async changeWindowName(name: string, windowID: string): Promise<void> {
        await this.setSettings(
            {
                windows: {
                    [windowID]: {
                        name: name,
                    },
                },
            },
            this.settingsConditions
        );

        // Rename the window if opened
        const window = await this.getWindow(windowID, false);
        if (window) window.setName(name);

        // Send updated data to the window selector
        await this.updateWindowSelectorData();
    }

    /** @override */
    public async setWindowVisibility(visible: boolean, windowID: string): Promise<void> {
        // Make sure we haven't fully removed the window already
        if (this.state.windows[windowID]) {
            await this.setState({
                windows: {
                    [windowID]: {
                        opened: visible,
                    },
                },
            });

            // Send updated data to the window selector
            await this.updateWindowSelectorData();
        }
    }

    /**
     * Passes the updated window data to the window selector
     */
    protected async updateWindowSelectorData(): Promise<void> {
        // Collect which windows are closed and which are opened
        const closed = ExtendedObject.filter(
            this.settings.windows,
            (data, ID) => !this.state.windows[ID] || !this.state.windows[ID].opened
        );
        const opened = ExtendedObject.filter(
            this.settings.windows,
            (data, ID) => this.state.windows[ID] && this.state.windows[ID].opened
        );

        // Pass the data to the window selector
        await this.state.windowSelector.setWindows(closed, opened);
    }

    // Location management
    /** @override */
    public async createLocation(location: ModuleLocation): Promise<LocationPath> {
        // Get the ID of new window for the module, using the new hints
        let windowID;
        let hints = this.getLocationHints(location);
        if (hints["new"]) {
            windowID = UUID.generateShort();
        } else if ("sameAs" in hints) {
            const locationPath = await this.getLocationPath(hints["sameAs"]);
            windowID = locationPath.nodes[0];
        } else if ("ID" in hints) {
            windowID = hints["ID"];
        }

        // Default to default
        if (!windowID) windowID = "default";

        // Obtain the window
        const name = hints["name"];
        const window = await this.getWindow(windowID, true, name);

        // Create the new location path, and return it
        return window.createLocation(location);
    }

    /** @override */
    public async removeLocation(locationPath: LocationPath): Promise<boolean> {
        // Retrieve the window ID
        const {ID, path} = this.getExtractID(locationPath);

        // Obtain the window
        const window = await this.getWindow(ID);

        // Remove the location from the window
        const removed = await window.removeLocation(path);
        if (removed) {
            // Check if there are any locations left in this window
            const locationsAtPath = await this.getLocationsAtPath([
                ...this.getData().path,
                ID,
            ]);

            // Remove the entire window when empty
            if (locationsAtPath.length == 0) {
                // Remove all of the window data
                await this.removeWindow(ID);
            }
        }

        // Return whether or not the location existed here, and was removed
        return removed;
    }

    /** @override (probably wont ever be called) */
    public async removeAncestor(): Promise<void> {
        const promises = Object.entries(this.settings.windows).map(async ([ID, data]) => {
            // Obtain the window
            const window = await this.getWindow(ID);

            // Dispose the window
            await window.removeAncestor();

            // Close the window
            window.close();
        });

        // Await all the windows disposals
        await Promise.all(promises);

        // Clear the settings
        await this.setSettings({windows: undefined}, this.settingsConditions);
        await this.setSettings({windows: {}}, this.settingsConditions);

        // Send updated data to the window selector
        await this.updateWindowSelectorData();
    }

    // Module management
    /** @override */
    public async openModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<LocationPath> {
        // Retrieve the window ID
        const {ID, path} = this.getExtractID(locationPath);

        // Obtain the window
        const window = await this.getWindow(ID, true);

        // Forward opening the module to the window
        return window.openModule(module, path);
    }

    /** @override */
    public async closeModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        // Retrieve the window ID
        const {ID, path} = this.getExtractID(locationPath);

        // Obtain the window if present
        const window = await this.getWindow(ID, false);
        if (window) {
            // Forward closing the module to the window
            const closed = await window.closeModule(module, path);

            if (closed) {
                // Close the window if there are no more modules opened in it
                const modulesAtPath = await this.getModulesAtPath([
                    ...this.getData().path,
                    ID,
                ]);
                if (modulesAtPath.length == 0) await this.closeWindow(ID);
            }

            return closed;
        }

        return false;
    }

    /** @override */
    public async showModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        // Retrieve the window ID
        const {ID, path} = this.getExtractID(locationPath);

        // Obtain the window if present
        const window = await this.getWindow(ID, false);
        if (window) {
            // Forward closing the module to the window
            return await window.showModule(module, path);
        }

        return false;
    }

    // Edit management
    /** @override */
    public async setDropMode(drop: boolean): Promise<void> {
        // Update the state
        await super.setDropMode(drop);

        // Enable or disable the window selector
        this.state.windowSelector.setEnabled(drop);

        // Inform ancestors
        const promises = Object.values(this.state.windows).map(async windowData =>
            (await windowData.window).setDropMode(drop)
        );
        await Promise.all(promises);
    }

    /** @override */
    public async setEditMode(edit: boolean): Promise<void> {
        // Update the state
        await super.setEditMode(edit);

        // Inform ancestors
        const promises = Object.values(this.state.windows).map(async windowData =>
            (await windowData.window).setEditMode(edit)
        );
        await Promise.all(promises);
    }
}
export default WindowManagerModule;
