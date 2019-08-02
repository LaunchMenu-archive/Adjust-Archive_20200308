import {createModule, InstanceModuleProvider, ModuleReference} from "@adjust/core";
import {SettingsDataID} from "@adjust/core";
import {LocationManagerID, LocationManager} from "./locationManager.type";
import {ModuleLocation} from "../../module/_types/ModuleLocation";
import {Registry} from "../../registry/registry";
import LocationAncestorModule from "./locationAncestor/locationAncestor";
import {LocationPath} from "./_types/LocationPath";
import {LocationsMoveData} from "./_types/LocationsMoveData";
import {LocationAncestor} from "./locationAncestor/locationAncestor.type";

export const config = {
    initialState: {
        // Keep track of currently used locations, and modules opened here in this session
        locations: {} as {
            [locationID: string]: {
                modules: ModuleReference[];
            };
        },
        // The data of locations currently being moved
        locationMoveData: null as LocationsMoveData,
        // The location ancestor to use
        locationAncestor: null as Promise<LocationAncestor>,
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
 * The location manager, responsible for keeping track of all locations in the system, and linking them with modules
 */
export default class LocationManagerModule
    extends createModule(config, LocationAncestorModule)
    implements LocationManager {
    /** @override */
    protected async onInit(fromReload: boolean): Promise<void> {
        Registry.addProvider(
            new InstanceModuleProvider(LocationManagerID, this, () => 2)
        );
    }

    /**
     * Retrieves the location ancestor to be used
     * @returns The obtained location ancestor
     */
    protected async getAncestor(): Promise<LocationAncestor> {
        if (!this.state.locationAncestor) {
            this.setState({locationAncestor: this.getChildLocationAncestor()});
        }
        return this.state.locationAncestor;
    }

    // Path/locations management
    /**
     * Retrieves a location path for the given location
     * @param location The module location to get the path for
     * @returns The retrieve location path
     */
    public async getLocationPath(
        location: ModuleLocation | string
    ): Promise<LocationPath> {
        // Check whether the passed location was a location or identifier
        if (typeof location == "string") {
            const data = this.settings.locations[location];
            return data && data.path
                ? {nodes: [...data.path.nodes], location: data.path.location}
                : {nodes: [], location: {ID: location, hints: {}}};
        } else {
            const data = this.settings.locations[location.ID];
            return data && data.path
                ? {nodes: [...data.path.nodes], location: data.path.location}
                : {nodes: [], location: location};
        }
    }

    /**
     * Updates the location path in the settings
     * @param locationPath The location path to be stored
     */
    protected updateLocationPath(locationPath: LocationPath): void {
        const current = this.settings.locations[locationPath.location.ID];
        this.setSettings({
            locations: {
                [locationPath.location.ID]: {
                    path: locationPath,
                    modules: current ? current.modules : [],
                },
            },
        });
    }

    /** @override */
    public async updateLocation(location: ModuleLocation): Promise<void> {
        // Remove old
        {
            // Get the location ID and the location's current path
            const path = await this.getLocationPath(location);

            // Retrieve the location ancestor
            const locationAncestor = await this.getAncestor();

            // Temporarily change the nodes of the location to indicate removal
            this.updateLocationPath({nodes: [], location});

            // Remove the location from the ancestor
            await locationAncestor.removeLocation(path);
        }

        // Add new
        {
            // Retrieve the location ancestor
            const locationAncestor = await this.getAncestor();

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
                await this.setSettings({
                    locations: {
                        [oldLocationID]: {
                            path: current.path,
                            modules: current.modules.filter(
                                ms => !settingsDataID.equals(ms)
                            ),
                        },
                    },
                });

                // Check if there are still modules at this location, if not, remove it
                current = this.settings.locations[oldLocationID];
                if (current.modules.length == 0) {
                    // Retrieve the location path and obtain the window
                    const path = await this.getLocationPath(oldLocationID);

                    // Remove the location from the settings
                    await await this.setSettings({
                        locations: {
                            [oldLocationID]: undefined,
                        },
                    });

                    // Retrieve the location ancestor
                    const locationAncestor = await this.getAncestor();

                    // Remove the location
                    await locationAncestor.removeLocation(path);
                }
            }
        });
        await Promise.all(removePromises);

        // Add the module to the new location
        const addPromises = newLocationIDs.map(async newLocationID => {
            // Only remove locations that got removed
            if (oldLocationIDs.includes(newLocationID)) return;

            let current = this.settings.locations[newLocationID];
            await await this.setSettings({
                locations: {
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
                },
            });
        });
        await Promise.all(addPromises);
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

        // Inform ancestor
        const locationAncestor = await this.getAncestor();
        await locationAncestor.setEditMode(edit);

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
        const locationAncestor = await this.getAncestor();
        await locationAncestor.setDropMode(data != null);

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
    public async openModule(module: ModuleReference, location: string): Promise<void> {
        // Retrieve the location path
        const path = await this.getLocationPath(location);

        // Obtain the ancestor
        const locationAncestor = await this.getAncestor();

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
    public async closeModule(module: ModuleReference, location: string): Promise<void> {
        // Retrieve the location path
        const path = await this.getLocationPath(location);

        // Obtain the ancestor
        const locationAncestor = await this.getAncestor();

        // Remove the module at this path
        this.setState({
            locations: {
                [location]: {
                    modules: (
                        this.state.locations[location] || {modules: []}
                    ).modules.filter(m => !m.equals(module)),
                },
            },
        });

        // Open the path in the location ancestor
        await locationAncestor.closeModule(module, path);
    }

    /** @override */
    public async showModule(module: ModuleReference, location: string): Promise<boolean> {
        // Retrieve the location path
        const path = await this.getLocationPath(location);

        // Obtain the ancestor
        const locationAncestor = await this.getAncestor();

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
