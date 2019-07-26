var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const locationManager_type_1 = require("./locationManager.type");
const registry_1 = require("../../registry/registry");
const locationAncestor_1 = __importDefault(require("./locationAncestor/locationAncestor"));
exports.config = {
    initialState: {
        locationAncestors: {},
        // Keep track of currently used locations, and modules opened here in this session
        locations: {},
        editMode: false,
        locationMoveData: null,
    },
    settings: {
        // Keeps permanent track of all locations and modules that should be opened here
        locations: {
            default: {},
            type: "locationPaths",
        },
    },
    type: locationManager_type_1.LocationManagerID,
};
/**
 * Accepts location hints:
 * - ID: String (The ID of the window to open)
 * - sameAs: String (The ID of a location in the same window)
 */
/**
 * The location manager, which in this implementation also is a window manager (all windows are on the same level)
 */
class LocationManagerModule extends core_1.createModule(exports.config, locationAncestor_1.default) {
    constructor() {
        //TODO: close location ancestor when no modules are opened in it
        super(...arguments);
        // The name of this ancestor type to be used in the location path and hints
        this.ancestorName = "window";
    }
    /** @override */
    async onInit(fromReload) {
        registry_1.Registry.addProvider(new core_1.InstanceModuleProvider(locationManager_type_1.LocationManagerID, this, () => 2));
    }
    // Path/locations management
    /**
     * Retrieves a location path for the given location
     * @param location The module location to get the path for
     * @returns The retrieve location path
     */
    getLocationPath(location) {
        // Check whether the passed location was a location or identifier
        if (typeof location == "string") {
            const data = this.settings.locations[location];
            return data && data.path
                ? data.path
                : { nodes: [], location: { ID: location, hints: {} } };
        }
        else {
            const data = this.settings.locations[location.ID];
            return data && data.path ? data.path : { nodes: [], location: location };
        }
    }
    /**
     * Updates the location path in the settings
     * @param locationPath The location path to be stored
     */
    updateLocationPath(locationPath) {
        const current = this.settings.locations[locationPath.location.ID];
        this.settingsObject.set.locations(Object.assign({}, this.settings.locations, { [locationPath.location.ID]: {
                path: locationPath,
                modules: current ? current.modules : [],
            } }));
    }
    /**
     * Retrieves the location ancestor with a given ID
     * @param ancestorID The ID of the location ancestor to retrieve
     * @returns The ancestor that was either already loaded, or was just opened
     */
    async getAncestor(ancestorID) {
        // Check if the ancestor is already opened
        let locationAncestor = this.state.locationAncestors[ancestorID];
        if (!locationAncestor) {
            // Get the child location ancestor
            locationAncestor = await this.getChildLocationAncestor(ancestorID);
            // Update the state to contain this location ancestor
            this.setState({
                locationAncestors: {
                    [ancestorID]: locationAncestor,
                },
            });
        }
        // Return the ancestor
        return locationAncestor;
    }
    /** @override */
    async updateLocation(location) {
        // Remove old
        {
            // Get the location ID and the location's current path
            const storedPath = this.getLocationPath(location);
            // Obtain the locationAncestor
            let { ID, path } = this.getExtractID(storedPath);
            const oldLocationAncestor = await this.getAncestor(ID);
            // Remove the location from this ancestor
            await oldLocationAncestor.removeLocation(path);
        }
        // Add new
        {
            // Get the ID of new ancestor for the module, using the new hints
            let windowID;
            let hints = this.getLocationHints(location);
            if ("sameAs" in hints) {
                const locationPath = this.getLocationPath(hints["sameAs"]);
                windowID = locationPath.nodes[0];
            }
            else if ("ID" in hints) {
                windowID = hints["ID"];
            }
            // Default to default
            if (!windowID)
                windowID = "default";
            // Obtain the ancestor
            const locationAncestor = await this.getAncestor(windowID);
            // Create the new location path, and store it
            const locationPath = await locationAncestor.createLocation(location);
            this.updateLocationPath(locationPath);
        }
        // Reopen the modules from this location
        const modules = this.getModulesAtLocation(location.ID);
        const promises = modules.map(moduleReference => this.openModule(moduleReference, location.ID));
        await Promise.all(promises);
    }
    /** @override */
    async updateModuleLocation(settingsDataID, newLocationIDs, oldLocationIDs) {
        // Normalize the location ids
        if (!newLocationIDs)
            newLocationIDs = [];
        if (!oldLocationIDs)
            oldLocationIDs = [];
        // Remove the module from the old location
        const removePromises = oldLocationIDs.map(async (oldLocationID) => {
            // Only remove locations that got removed
            if (newLocationIDs.includes(oldLocationID))
                return;
            let current = this.settings.locations[oldLocationID];
            if (current) {
                this.settingsObject.set.locations(Object.assign({}, this.settings.locations, { [oldLocationID]: {
                        path: current.path,
                        modules: current.modules.filter(ms => !settingsDataID.equals(ms)),
                    } }));
                // Check if there are still modules at this location, if not, remove it
                current = this.settings.locations[oldLocationID];
                if (current.modules.length == 0) {
                    // Retrieve the location path and obtain the locationAncestor
                    const storedPath = this.getLocationPath(oldLocationID);
                    const { ID } = this.getExtractID(storedPath);
                    const locationAncestor = await this.getAncestor(ID);
                    // Remove the location
                    locationAncestor.removeLocation(storedPath);
                }
            }
        });
        await Promise.all(removePromises);
        // Add the module to the new location
        newLocationIDs.forEach(newLocationID => {
            // Only remove locations that got removed
            if (oldLocationIDs.includes(newLocationID))
                return;
            let current = this.settings.locations[newLocationID];
            this.settingsObject.set.locations(Object.assign({}, this.settings.locations, { [newLocationID]: {
                    path: current && current.path,
                    modules: [
                        // Keep everything that is not the new ID to prevent duplicates
                        ...((current && current.modules) || []).filter(ms => !settingsDataID.equals(ms)),
                        // Add the new ID
                        settingsDataID,
                    ],
                } }));
        });
    }
    // Location editing
    /**
     * General approach:
     * - User enables edit mode
     * - User selects some locationAncestor to move by dragging (which calls setLocationsMoveData)
     * - User selects a target by dropping (which calls getLocationsMoveData and updateLocationsMoveData)
     * - updateMovedLocations to finalize the movement of data
     */
    /** @override */
    async setEditMode(edit) {
        if (this.state.editMode == edit)
            return false;
        // Update own state
        this.setState({ editMode: edit });
        // Inform ancestors
        core_1.ExtendedObject.forEach(this.state.locationAncestors, (ID, ancestor) => {
            ancestor.setEditMode(edit);
        });
        // Return that the change was successful
        return true;
    }
    /** @override */
    async setLocationsMoveData(data) {
        // Make sure there is no current data, if replacing it with data
        if (this.state.locationMoveData && data)
            return false;
        // Update own state
        this.setState({ locationMoveData: data });
        // Update whether we are able to drop elements now
        const promises = Object.values(this.state.locationAncestors).map(ancestor => ancestor.setDropMode(data != null));
        await Promise.all(promises);
        // Return that the movement data was successfully set
        return true;
    }
    /** @override */
    async updateLocationsMoveData(data) {
        // Make sure there is current data
        if (!this.state.locationMoveData)
            return false;
        // Update state
        this.setState({ locationMoveData: data });
        // Return that the movement data was successfully updated
        return true;
    }
    /** @override */
    async getLocationsMoveData() {
        return this.state.locationMoveData;
    }
    /** @override */
    async getLocationsAtPath(partialPath) {
        return Object.values(this.settings.locations)
            .filter(location => 
        // Make sure all the parts of the path correspond
        core_1.ExtendedObject.reduce(partialPath, (res, ancestorID, ancestorType) => location[ancestorType] == ancestorID && res, true))
            .map(location => location.path.location);
    }
    /** @override */
    async updateMovedLocations() {
        // Uses own locations move cata to create these new locations
        const moveData = this.state.locationMoveData;
        if (!moveData)
            return;
        // Remove the move data
        await this.setLocationsMoveData(undefined);
        // Create the locations
        moveData.locations.forEach(location => {
            this.updateLocation(location);
        });
    }
    // Opening/closing modules
    /** @override */
    async openModule(module, location) {
        // Retrieve the location path
        const storedPath = this.getLocationPath(location);
        // Obtain the locationAncestor
        const { ID, path } = this.getExtractID(storedPath);
        const locationAncestor = await this.getAncestor(ID);
        // Open the path in the location ancestor
        const obtainedPath = await locationAncestor.openModule(module, path);
        // Update location path
        this.updateLocationPath(obtainedPath);
        // Store the module at this path
        this.setState({
            locations: {
                [location]: {
                    modules: [
                        ...(this.state.locations[location] || { modules: [] }).modules,
                        module,
                    ],
                },
            },
        });
    }
    /** @override */
    async closeModule(module, location) {
        // Retrieve the location path
        const storedPath = this.getLocationPath(location);
        // Obtain the locationAncestor
        const { ID, path } = this.getExtractID(storedPath);
        const locationAncestor = await this.getAncestor(ID);
        // Open the path in the location ancestor
        const closed = await locationAncestor.closeModule(module, path);
        // Store the module at this path
        if (closed)
            this.setState({
                locations: {
                    [location]: {
                        modules: (this.state.locations[location] || { modules: [] }).modules.filter(m => !m.equals(module)),
                    },
                },
            });
    }
    /** @override */
    async showModule(module, location) {
        // TODO:
        return false;
    }
    /** @override */
    async isModuleOpened(module, locationID) {
        return (this.state.locations[locationID].modules.find(m => m.equals(module)) != null);
    }
    /**
     * Retrieves the modules that are opened at a given location
     * @param location The ID of the location to get the opened modules of
     * @returns The modules that are opened at this location in this settions
     */
    getModulesAtLocation(location) {
        const locData = this.state.locations[location];
        return (locData && locData.modules) || [];
    }
}
exports.default = LocationManagerModule;
//# sourceMappingURL=locationManager.js.map