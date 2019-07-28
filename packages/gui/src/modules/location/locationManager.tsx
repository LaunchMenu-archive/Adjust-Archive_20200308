import {
    createModule,
    InstanceModuleProvider,
    ModuleReference,
    ExtendedObject,
} from "@adjust/core";
import {SettingsDataID} from "@adjust/core";
import {LocationManagerID, LocationManager} from "./locationManager.type";
import {ModuleLocation} from "../../module/_types/ModuleLocation";
import {Registry} from "../../registry/registry";
import LocationAncestorModule from "./locationAncestor/locationAncestor";
import {LocationPath} from "./_types/LocationPath";
import {LocationAncestor} from "./locationAncestor/locationAncestor.type";
import {LocationsMoveData} from "./_types/LocationsMoveData";
import {WindowSelector, WindowSelectorID} from "./windowSelector/windowSelector.type";

export const config = {
    initialState: {
        // Keep track of currently opened child ancestors
        locationAncestors: {} as {
            [locationAncestorID: string]: Promise<LocationAncestor>;
        },
        // Keep track of currently used locations, and modules opened here in this session
        locations: {} as {
            [locationID: string]: {
                modules: ModuleReference[];
            };
        },
        // The data of locations currently being moved
        locationMoveData: null as LocationsMoveData,
        // The window selector to handle windpws that are currently not opened
        windowSelector: null as WindowSelector,
    },
    settings: {
        // Keeps permanent track of all locations and modules that should be opened here
        locations: {
            default: {} as {
                [locationID: string]: {
                    path: LocationPath;
                    modules: SettingsDataID[]; // Setting IDs of the modules that are opened here
                };
            },
            type: "locationPaths",
        },
    },
    type: LocationManagerID,
};

/**
 * Accepts location hints:
 * - ID: String (The ID of the window to open)
 * - sameAs: String (The ID of a location in the same window)
 */

/**
 * The location manager, which in this implementation also is a window manager (all windows are on the same level)
 */
export default class LocationManagerModule
    extends createModule(config, LocationAncestorModule)
    implements LocationManager {
    //TODO: close location ancestor when no modules are opened in it

    // The name of this ancestor type to be used in the location path and hints
    protected ancestorName: string = "window";

    /** @override */
    protected async onInit(fromReload: boolean): Promise<void> {
        Registry.addProvider(
            new InstanceModuleProvider(LocationManagerID, this, () => 2)
        );

        // Load the window selector
        if (!fromReload)
            this.setState({
                windowSelector: await this.request({type: WindowSelectorID}),
            });
    }

    // Path/locations management
    /**
     * Retrieves a location path for the given location
     * @param location The module location to get the path for
     * @returns The retrieve location path
     */
    protected getLocationPath(location: ModuleLocation | string): LocationPath {
        // Check whether the passed location was a location or identifier
        if (typeof location == "string") {
            const data = this.settings.locations[location];
            return data && data.path
                ? data.path
                : {nodes: [], location: {ID: location, hints: {}}};
        } else {
            const data = this.settings.locations[location.ID];
            return data && data.path ? data.path : {nodes: [], location: location};
        }
    }

    /**
     * Updates the location path in the settings
     * @param locationPath The location path to be stored
     */
    protected updateLocationPath(locationPath: LocationPath): void {
        const current = this.settings.locations[locationPath.location.ID];
        this.settingsObject.set.locations({
            ...this.settings.locations,
            [locationPath.location.ID]: {
                path: locationPath,
                modules: current ? current.modules : [],
            },
        });
    }

    /**
     * Retrieves the location ancestor with a given ID
     * @param ancestorID The ID of the location ancestor to retrieve
     * @returns The ancestor that was either already loaded, or was just opened
     */
    protected async getAncestor(ancestorID: string): Promise<LocationAncestor> {
        // Check if the ancestor is already opened
        let locationAncestor = this.state.locationAncestors[ancestorID];

        if (!locationAncestor) {
            // Get the child location ancestor
            locationAncestor = this.getChildLocationAncestor(ancestorID);

            // Update the state to contain this location ancestor
            this.setState({
                locationAncestors: {
                    [ancestorID]: locationAncestor,
                },
            });
        }

        // Return the ancestor
        return await locationAncestor;
    }

    /**
     * Closes the location ancestor with a given ID if currently opened
     * @param ancestorID The ID of the location ancestor to close
     */
    protected async closeAncestor(ancestorID: string): Promise<void> {
        // Get the ancestor if opened
        let locationAncestor = await this.state.locationAncestors[ancestorID];

        if (locationAncestor) {
            // Remove it from the state
            this.setState({
                locationAncestors: {
                    [ancestorID]: undefined,
                },
            });

            // Close it
            await locationAncestor.close();
        }
    }

    /** @override */
    public async updateLocation(location: ModuleLocation): Promise<void> {
        // Remove old
        {
            // Get the location ID and the location's current path
            const storedPath = this.getLocationPath(location);

            // Obtain the locationAncestor
            let {ID, path} = this.getExtractID(storedPath);
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
            } else if ("ID" in hints) {
                windowID = hints["ID"];
            }

            // Default to default
            if (!windowID) windowID = "default";

            // Obtain the ancestor
            const locationAncestor = await this.getAncestor(windowID);

            // Create the new location path, and store it
            const locationPath = await locationAncestor.createLocation(location);
            this.updateLocationPath(locationPath);
        }

        // Reopen the modules from this location
        const modules = this.getModulesAtLocation(location.ID);
        const promises = modules.map(moduleReference =>
            this.openModule(moduleReference, location.ID)
        );
        await Promise.all(promises);
    }

    /** @override */
    public async updateModuleLocation(
        settingsDataID: SettingsDataID,
        newLocationIDs: string[],
        oldLocationIDs: string[]
    ): Promise<void> {
        // Normalize the location ids
        if (!newLocationIDs) newLocationIDs = [];
        if (!oldLocationIDs) oldLocationIDs = [];

        // Remove the module from the old location
        const removePromises = oldLocationIDs.map(async oldLocationID => {
            // Only remove locations that got removed
            if (newLocationIDs.includes(oldLocationID)) return;

            let current = this.settings.locations[oldLocationID];
            if (current) {
                this.settingsObject.set.locations({
                    ...this.settings.locations,
                    [oldLocationID]: {
                        path: current.path,
                        modules: current.modules.filter(ms => !settingsDataID.equals(ms)),
                    },
                });

                // Check if there are still modules at this location, if not, remove it
                current = this.settings.locations[oldLocationID];
                if (current.modules.length == 0) {
                    // Retrieve the location path and obtain the locationAncestor
                    const storedPath = this.getLocationPath(oldLocationID);
                    const {ID} = this.getExtractID(storedPath);
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
            if (oldLocationIDs.includes(newLocationID)) return;

            let current = this.settings.locations[newLocationID];
            this.settingsObject.set.locations({
                ...this.settings.locations,
                [newLocationID]: {
                    path: current && current.path,
                    modules: [
                        // Keep everything that is not the new ID to prevent duplicates
                        ...((current && current.modules) || []).filter(
                            ms => !settingsDataID.equals(ms)
                        ),

                        // Add the new ID
                        settingsDataID,
                    ],
                },
            });
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
    public async setEditMode(edit: boolean): Promise<boolean> {
        if (this.state.inEditMode == edit) return false;

        // Update the state
        await super.setEditMode(edit);

        // Inform ancestors
        const promises = Object.values(this.state.locationAncestors).map(
            async ancestor => {
                (await ancestor).setEditMode(edit);
            }
        );
        await Promise.all(promises);

        // Return that the change was successful
        return true;
    }

    /** @override */
    public async setLocationsMoveData(data: LocationsMoveData): Promise<boolean> {
        // Make sure there is no current data, if replacing it with data
        if (this.state.locationMoveData && data) return false;

        // Update own state
        this.setState({locationMoveData: data});

        // Update whether we are able to drop elements now
        const promises = Object.values(this.state.locationAncestors).map(async ancestor =>
            (await ancestor).setDropMode(data != null)
        );
        await Promise.all(promises);

        // Enable or disable the window selector
        this.state.windowSelector.setEnabled(data != null);

        // Return that the movement data was successfully set
        return true;
    }

    /** @override */
    public async updateLocationsMoveData(data: LocationsMoveData): Promise<boolean> {
        // Make sure there is current data
        if (!this.state.locationMoveData) return false;

        // Update state
        this.setState({locationMoveData: data});

        // Return that the movement data was successfully updated
        return true;
    }

    /** @override */
    public async getLocationsMoveData(): Promise<LocationsMoveData> {
        return this.state.locationMoveData;
    }

    /** @override */
    public async getLocationsAtPath(partialPath: string[]): Promise<ModuleLocation[]> {
        return Object.values(this.settings.locations)
            .filter(location =>
                // Make sure all the parts of the path correspond
                partialPath.reduce(
                    (res, ancestorID, index) =>
                        location.path && location.path.nodes[index] == ancestorID && res,
                    true as boolean
                )
            )
            .map(location => location.path.location);
    }

    /** @override */
    public async updateMovedLocations(delay: number = 100): Promise<void> {
        // Uses own locations move cata to create these new locations
        const moveData = this.state.locationMoveData;
        if (!moveData) return;

        // Give some time for ancestors to register their moved locations updates
        await new Promise(r => setTimeout(r, delay));

        // Create the locations
        const promises = moveData.locations.map(location =>
            this.updateLocation(location)
        );
        await Promise.all(promises);

        // Remove the move data
        await this.setLocationsMoveData(undefined);
    }

    // Opening/closing modules
    /** @override */
    public async openModule(module: ModuleReference, location: string) {
        // Retrieve the location path
        const storedPath = this.getLocationPath(location);

        // Obtain the locationAncestor
        const {ID, path} = this.getExtractID(storedPath);
        const locationAncestor = await this.getAncestor(ID);

        // Store the module at this path
        this.setState({
            locations: {
                [location]: {
                    modules: [
                        ...(this.state.locations[location] || {modules: []}).modules,
                        module,
                    ],
                },
            },
        });

        // Open the path in the location ancestor
        const obtainedPath = await locationAncestor.openModule(module, path);

        // Update location path
        this.updateLocationPath(obtainedPath);
    }

    /** @override */
    public async closeModule(module: ModuleReference, location: string) {
        // Retrieve the location path
        const storedPath = this.getLocationPath(location);

        // Obtain the locationAncestor
        const {ID, path} = this.getExtractID(storedPath);
        const locationAncestor = await this.getAncestor(ID);
        // Open the path in the location ancestor
        const closed = await locationAncestor.closeModule(module, path);

        // Store the module at this path
        if (closed) {
            this.setState({
                locations: {
                    [location]: {
                        modules: (
                            this.state.locations[location] || {modules: []}
                        ).modules.filter(m => !m.equals(module)),
                    },
                },
            });

            // Close the window if there are no more modules opened in it
            if ((await this.getModulesAtPath([ID])).length == 0)
                await this.closeAncestor(ID);
        }
    }

    /** @override */
    public async showModule(module: ModuleReference, location: string): Promise<boolean> {
        // Retrieve the location path
        const storedPath = this.getLocationPath(location);

        // Obtain the locationAncestor
        const {ID, path} = this.getExtractID(storedPath);
        const locationAncestor = await this.getAncestor(ID);

        // Attempt to show the module
        return locationAncestor.showModule(module, path);
    }

    /** @override */
    public async isModuleOpened(
        module: ModuleReference,
        locationID: string
    ): Promise<boolean> {
        return (
            this.state.locations[locationID].modules.find(m => m.equals(module)) != null
        );
    }

    /**
     * Retrieves the modules that are opened at a given location
     * @param location The ID of the location to get the opened modules of
     * @returns The modules that are opened at this location in this settions
     */
    protected getModulesAtLocation(location: string): ModuleReference[] {
        const locData = this.state.locations[location];
        return (locData && locData.modules) || [];
    }

    /** @override */
    public async getModulesAtPath(partialPath: string[]): Promise<ModuleReference[]> {
        // Define the modules to retrieve
        const modules = [];

        // Get all locations, and retriev its modules
        (await this.getLocationsAtPath(partialPath)).forEach(location => {
            modules.push(...this.getModulesAtLocation(location.ID));
        });

        // Return all modules
        return modules;
    }
}
