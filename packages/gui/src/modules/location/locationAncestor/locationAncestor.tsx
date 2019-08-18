import {
    createModule as createAdjustCoreModule,
    ModuleReference,
    SettingsConditions,
    DataSettingsConditions,
} from "@adjust/core";
import {LocationPath} from "../_types/LocationPath";
import {
    LocationAncestorType,
    LocationAncestor,
    LocationAncestorParent,
} from "./locationAncestor.type";
import {LocationsMoveData} from "../_types/LocationsMoveData";
import {ModuleLocation} from "../../../module/_types/ModuleLocation";
import {stylingSettings} from "../../../module/module";

export const config = {
    initialState: {
        inEditMode: false,
        inDropMode: false,
    },
    settings: {
        ...stylingSettings,
    },
    type: LocationAncestorType,
    abstract: true, // This is just inteded as module to be extended
};

/**
 * A base class for location ancestors to extend,
 * provides some common methods that location ancestors might use
 * Note that we use adjust core's createModule, since location ancestors shouldn't have any location data themselves
 */
export default class LocationAncestorModule extends createAdjustCoreModule(config)
    implements LocationAncestorParent {
    // The name of the ancestor module
    protected readonly ancestorName: string;

    // The settings conditions to save data under
    protected settingsConditions: SettingsConditions;

    /** @override */
    protected async onInit(fromReload: boolean): Promise<void> {
        await super.onInit(fromReload);

        // Save data under the ID of this ancestor
        this.settingsConditions = new DataSettingsConditions({ID: this.getData().ID}, 1);
    }

    // Location creation related methods
    /**
     * Either gets the next ID from the path, or generates it and stores it in the path
     * @param path The location path to get the ID from
     * @returns the obtained or generated ID as well as the passed or updated path
     */
    protected getExtractID(path: LocationPath): {path: LocationPath; ID: string} {
        let ID = path.nodes[0];

        // If no ID is present, generate and store it
        if (!ID) {
            // ID = Math.round(Math.random() * 1e10) + "";
            ID = "default";
        }

        // Return the path and the id
        return {
            path: {
                ...path,
                nodes: path.nodes.slice(1),
            },
            ID,
        };
    }

    /**
     * Extracts the relevant hints for this ancestor from a module locatio;n
     * @param location The location and its creation hints
     * @returns Any hints that might have been provided
     */
    protected getLocationHints(location: ModuleLocation): object {
        if (location.hints) {
            // If there is a path ID node for this ancestor's child in the hints, return it
            const thisPath = this.getData().path || [];
            if (location.hints.path && location.hints.path.length >= thisPath.length)
                return {ID: location.hints.path[thisPath.length]};

            // Otherwise return the hints targeted to this ancestor type
            return (location.hints[this.ancestorName] as any) || {};
        }

        // If there are no hints, just return an empty object
        return {};
    }

    /**
     * Gets the child location ancestor given a specified location path
     * @param inpPath The path to obtain the child by
     * @returns The ID of the child, as well as the child itself
     */
    protected async getChildLocationAncestorFromPath(
        inpPath: LocationPath
    ): Promise<{ID: string; path: LocationPath; locationAncestor: LocationAncestor}> {
        // Get the ID to open
        const {ID, path} = this.getExtractID(inpPath);

        // Get the ancestor itself
        const locationAncestor = await this.getChildLocationAncestor(ID);

        // Return the data
        return {
            ID,
            path,
            locationAncestor,
        };
    }

    /**
     * Gets the child location ancestor given a specified location path
     * @param ID The ID of the child, may be left out if the child has the same ID
     * Leaving it out would result in this instance and child sharing the same ID and path
     * @returns The child ancestor
     */
    protected async getChildLocationAncestor(ID?: string): Promise<LocationAncestor> {
        // Determine the ID if not present
        const isNewID = ID != undefined;
        if (ID == undefined) ID = this.getData().ID;

        // Obtain this module's path, and child's path
        const path = this.getData().path || [];
        const childPath = isNewID ? [...path, ID] : path;

        // Request the location
        const locationAncestor = (await this.request({
            type: LocationAncestorType,
            use: providers => {
                // Get the index of this module class
                const nextIndex = childPath.length;

                // Get the module with the next (lower priority) index
                const provider = providers[nextIndex].provider;
                return [provider];
            },
            data: {
                ID: ID,
                path: childPath,
            },
        }))[0];

        // Make sure to initialise the correct state
        if (this.state.inEditMode) locationAncestor.setEditMode(true);
        if (this.state.inDropMode) locationAncestor.setDropMode(true);

        // Return the ancestor
        return locationAncestor;
    }

    // State related methods
    /** @override */
    public async setEditMode(edit: boolean): Promise<any> {
        await this.setState({inEditMode: edit});
    }

    /** @override */
    public async setDropMode(drop: boolean): Promise<void> {
        await this.setState({inDropMode: drop});
    }

    // Location moving related methods
    /** @override */
    public async setLocationsMoveData(data: LocationsMoveData): Promise<boolean> {
        return this.getParent().setLocationsMoveData(data);
    }

    /** @override */
    public async updateLocationsMoveData(data: LocationsMoveData): Promise<boolean> {
        return this.getParent().updateLocationsMoveData(data);
    }

    /** @override */
    public async getLocationsMoveData(): Promise<LocationsMoveData> {
        return this.getParent().getLocationsMoveData();
    }

    /** @override */
    public async getLocationsAtPath(partialPath: string[]): Promise<ModuleLocation[]> {
        return this.getParent().getLocationsAtPath(partialPath);
    }

    /** @override */
    public async getModulesAtPath(partialPath: string[]): Promise<ModuleReference[]> {
        return this.getParent().getModulesAtPath(partialPath);
    }

    /** @override */
    public async getLocationPath(location: string): Promise<LocationPath> {
        return this.getParent().getLocationPath(location);
    }

    /** @override */
    public async updateMovedLocations(delay?: number): Promise<void> {
        return this.getParent().updateMovedLocations(delay);
    }
}
