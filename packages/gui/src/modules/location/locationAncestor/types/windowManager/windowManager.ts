import {createModule, ModuleReference, UUID} from "@adjust/core";
import {ModuleLocation} from "../../../../../module/_types/ModuleLocation";
import LocationAncestorModule from "../../../locationAncestor/locationAncestor";
import {LocationPath} from "../../../_types/LocationPath";
import {LocationsMoveData} from "../../../_types/LocationsMoveData";
import {WindowSelector, WindowSelectorID} from "./windowSelector/windowSelector.type";
import {Window, WindowID, WindowParent} from "./window/window.type";
import {LocationAncestorID, LocationAncestor} from "../../locationAncestor.type";

export const config = {
    initialState: {
        // Keep track of currently opened windows
        windows: {} as {
            [windowID: string]: Promise<Window>;
        },
        // The window selector to handle windpws that are currently not opened
        windowSelector: null as WindowSelector,
    },
    settings: {
        // Keep track of direct child locations
        windows: {
            default: {} as {
                [windowID: string]: {
                    windowName: string;
                };
            },
            type: "windows",
        },
    },
    type: LocationAncestorID,
};

/**
 * type "Window" Accepts one of location hints:
 * - ID: String (The ID of the window to open)
 * - sameAs: String (The ID of a location in the same window)
 * - new: String (Whether a new window should be created)
 *
 * And if 'new' is set:
 * - windowName: String (The name that any newly created window should have)
 */

/**
 * The window manager, responsible for keeping track and opening all windows that are used as locations
 */
export default class WindowManagerModule
    extends createModule(config, LocationAncestorModule)
    implements LocationAncestor, WindowParent {
    // The name of this ancestor type to be used in the location path and hints
    protected ancestorName: string = "window";

    /** @override */
    protected async onInit(fromReload: boolean): Promise<void> {
        if (!fromReload)
            this.setState({
                windowSelector: await this.request({type: WindowSelectorID}),
            });
    }

    // Window module managment
    /**
     * Retrieves the window with a given ID
     * @param windowID The ID of the window to retrieve
     * @param create Whether or not to create the window if not present
     * @param name THe name of the window
     * @returns The window hat was either already loaded, or was just opened
     */
    protected async getWindow(
        windowID: string,
        create: boolean = true,
        name?: string
    ): Promise<Window> {
        // Check if the window is already opened
        let window = this.state.windows[windowID];

        if (!window && create) {
            // Request the window
            window = this.request({
                type: WindowID,
                data: {
                    ID: windowID,
                    path: [windowID],
                },
            });

            // Update the state to contain this location ancestor
            this.setState({
                windows: {
                    [windowID]: window,
                },
            });

            // Define the window data if absent
            if (!this.settings.windows[windowID])
                await this.setSettings(
                    {
                        windows: {
                            [windowID]: {
                                windowName: name || windowID,
                            },
                        },
                    },
                    this.settingsConditions
                );

            // Make sure to initialise the correct state
            if (this.state.inEditMode) (await window).setEditMode(true);
            if (this.state.inDropMode) (await window).setDropMode(true);

            // Set the window's name
            (await window).setName(this.settings.windows[windowID].windowName);
        }

        // Return the ancestor
        return await window;
    }

    /**
     * Closes the window with a given ID if currently opened
     * @param ancestorID The ID of the window to close
     */
    protected async closeWindow(ancestorID: string): Promise<void> {
        // Get the window if opened
        let window = await this.state.windows[ancestorID];

        if (window) {
            // Remove it from the state
            this.setState({
                windows: {
                    [ancestorID]: undefined,
                },
            });

            // Close it
            await window.close();
        }
    }

    /** @override */
    public async changeWindowName(name: string, windowID: string): Promise<void> {
        await this.setSettings(
            {
                windows: {
                    [windowID]: {
                        windowName: name,
                    },
                },
            },
            this.settingsConditions
        );

        // Rename the window if opened
        const window = await this.getWindow(windowID, false);
        if (window) window.setName(name);
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
        const name = hints["windowName"];
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

            // Remove the entire window when empty (there was 1 location and we removed the last)
            if (locationsAtPath.length == 0) {
                // Remove the ancest
                await window.removeAncestor();

                // Remove the associated data
                await this.setSettings(
                    {
                        windows: {
                            [ID]: undefined,
                        },
                    },
                    this.settingsConditions
                );

                // Close the window
                await this.closeWindow(ID);
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
        const window = await this.getWindow(ID);

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
        const promises = Object.values(this.state.windows).map(async ancestor => {
            (await ancestor).setDropMode(drop);
        });
        await Promise.all(promises);
    }

    /** @override */
    public async setEditMode(edit: boolean): Promise<void> {
        // Update the state
        await super.setEditMode(edit);

        // Inform ancestors
        const promises = Object.values(this.state.windows).map(async ancestor => {
            (await ancestor).setEditMode(edit);
        });
        await Promise.all(promises);
    }
}