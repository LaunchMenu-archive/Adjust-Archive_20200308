var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const locationAncestor_1 = __importDefault(require("../../../locationAncestor/locationAncestor"));
const windowSelector_type_1 = require("./windowSelector/windowSelector.type");
const window_type_1 = require("./window/window.type");
const locationAncestor_type_1 = require("../../locationAncestor.type");
exports.config = {
    initialState: {
        // Keep track of currently opened windows
        windows: {},
        // The window selector to handle windpws that are currently not opened
        windowSelector: null,
    },
    settings: {
        // Keep track of direct child locations
        windows: {
            default: {},
            type: "windows",
        },
    },
    type: locationAncestor_type_1.LocationAncestorID,
};
/**
 * Accepts location hints:
 * - ID: String (The ID of the window to open)
 * - sameAs: String (The ID of a location in the same window)
 */
/**
 * The window manager, responsible for keeping track and opening all windows that are used as locations
 */
class WindowManagerModule extends core_1.createModule(exports.config, locationAncestor_1.default) {
    constructor() {
        super(...arguments);
        // The name of this ancestor type to be used in the location path and hints
        this.ancestorName = "window";
    }
    /** @override */
    async onInit(fromReload) {
        if (!fromReload)
            this.setState({
                windowSelector: await this.request({ type: windowSelector_type_1.WindowSelectorID }),
            });
    }
    // Window module managment
    /**
     * Retrieves the window with a given ID
     * @param windowID The ID of the window to retrieve
     * @param create Whether or not to create the window if not present
     * @returns The window hat was either already loaded, or was just opened
     */
    async getWindow(windowID, create = true) {
        // Check if the window is already opened
        let window = this.state.windows[windowID];
        if (!window && create) {
            // Request the window
            window = this.request({
                type: window_type_1.WindowID,
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
            // Make sure to initialise the correct state
            if (this.state.inEditMode)
                (await window).setEditMode(true);
            if (this.state.inDropMode)
                (await window).setDropMode(true);
            // Set the winodw's name
            (await window).setName("shit");
        }
        // Return the ancestor
        return await window;
    }
    /**
     * Closes the window with a given ID if currently opened
     * @param ancestorID The ID of the window to close
     */
    async closeWindow(ancestorID) {
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
    async changeWindowName(name) {
        // TODO: change window name
    }
    // Location management
    /** @override */
    async createLocation(location) {
        // Get the ID of new window for the module, using the new hints
        let windowID;
        let hints = this.getLocationHints(location);
        if ("sameAs" in hints) {
            const locationPath = await this.getLocationPath(hints["sameAs"]);
            windowID = locationPath.nodes[0];
        }
        else if ("ID" in hints) {
            windowID = hints["ID"];
        }
        // Default to default
        if (!windowID)
            windowID = "default";
        // Obtain the window
        const window = await this.getWindow(windowID);
        // Create the new location path, and return it
        return window.createLocation(location);
    }
    /** @override */
    async removeLocation(locationPath) {
        // Retrieve the window ID
        const { ID, path } = this.getExtractID(locationPath);
        // Obtain the window
        const window = await this.getWindow(ID);
        // Remove the location from the window
        const removed = window.removeLocation(path);
        if (removed) {
            // Check if there are any locations left in this window
            const locationsAtPath = await this.getLocationsAtPath([
                ...this.getData().path,
                ID,
            ]);
            if (locationsAtPath.length == 0) {
                // TODO: Remove data
            }
        }
        // Return whether or not the location existed here, and was removed
        return removed;
    }
    // Module management
    /** @override */
    async openModule(module, locationPath) {
        // Retrieve the window ID
        const { ID, path } = this.getExtractID(locationPath);
        // Obtain the window
        const window = await this.getWindow(ID);
        // Forward opening the module to the window
        return window.openModule(module, path);
    }
    /** @override */
    async closeModule(module, locationPath) {
        // Retrieve the window ID
        const { ID, path } = this.getExtractID(locationPath);
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
                if (modulesAtPath.length == 0)
                    await this.closeWindow(ID);
            }
            return closed;
        }
        return false;
    }
    /** @override */
    async showModule(module, locationPath) {
        // Retrieve the window ID
        const { ID, path } = this.getExtractID(locationPath);
        // Obtain the window if present
        const window = await this.getWindow(ID, false);
        if (window) {
            // Forward closing the module to the window
            return await window.showModule(module, path);
        }
        return false;
    }
    // Edit management
    /**
     * General approach:
     * - User enables edit mode
     * - User selects some locationAncestor to move by dragging (which calls setLocationsMoveData)
     * - User selects a target by dropping (which calls getLocationsMoveData and updateLocationsMoveData)
     * - updateMovedLocations to finalize the movement of data
     */
    /** @override */
    async setDropMode(drop) {
        // Update the state
        await super.setDropMode(drop);
        // Enable or disable the window selector
        this.state.windowSelector.setEnabled(drop);
        // Inform ancestors
        const promises = Object.values(this.state.windows).map(async (ancestor) => {
            (await ancestor).setDropMode(drop);
        });
        await Promise.all(promises);
    }
    /** @override */
    async setEditMode(edit) {
        // Update the state
        await super.setEditMode(edit);
        // Inform ancestors
        const promises = Object.values(this.state.windows).map(async (ancestor) => {
            (await ancestor).setEditMode(edit);
        });
        await Promise.all(promises);
    }
}
exports.default = WindowManagerModule;
//# sourceMappingURL=windowManager.js.map