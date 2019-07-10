import {createModule, ModuleReference, createModuleView} from "@adjust/core";
import {React} from "../../../React";
import {LocationPath} from "../_types/LocationPath";
import {LocationAncestorID, LocationAncestor} from "./locationAncestor.type";
import {ModuleLocation} from "../../../module/_types/ModuleLocation";

export const config = {
    initialState: {
        // The modules being displayed
        locations: {} as {
            [locationID: string]: {
                path: LocationPath;
                modules: ModuleReference[];
            };
        },
        modules: [] as ModuleReference[], // The opened modules in order
        editMode: false,
        dropMode: false,
    },
    getPriority: () => 0.1,
    settings: {
        locations: {
            default: [] as string[],
            type: "locations",
        },
    },
    type: LocationAncestorID,
};

/**
 * The location class that simply renders a location when requested
 */
export default class LocationModule extends createModule(config)
    implements LocationAncestor {
    //TODO: add list of multiple modules, and a request focus system

    /** @override*/
    public async openModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<LocationPath> {
        const locationID = locationPath.location.ID;
        const locData = this.state.locations[locationID];
        this.setState({
            modules: [module, ...this.state.modules],
            locations: {
                [locationID]: {
                    path: locationPath,
                    modules: [module, ...(locData ? locData.modules : null)],
                },
            },
        });

        // Create the location permamantly if it didn't exist already
        return this.createLocation(locationPath.location);
    }

    /** @override*/
    public async closeModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        const locationID = locationPath.location.ID;
        const locData = this.state.locations[locationID];
        const contains = this.state.modules.indexOf(module) != -1;
        this.setState({
            modules: this.state.modules.filter(m => m != module),
            locations: {
                [locationID]: {
                    path: locationPath,
                    modules: locData ? locData.modules.filter(m => m != module) : [],
                },
            },
        });

        // Return whether or not the location contained the module
        return contains;
    }

    /** @override*/
    public async showModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        const contains = this.state.modules.indexOf(module) != -1;
        if (contains) {
            // Bring the module to the top
            this.setState({
                modules: [module, ...this.state.modules.filter(m => m != module)],
            });

            // Return whether or not the locatin contains the module, and brought it to the front
            return true;
        }

        // Return that the location didn't contain the module
        return false;
    }

    /** @override */
    public async createLocation(location: ModuleLocation): Promise<LocationPath> {
        // Add the location to the settings
        if (this.settings.locations.indexOf(location.ID) == -1)
            this.settingsObject.changeData({
                locations: [...this.settings.locations, location.ID],
            });

        // Return the path just including this module
        return {
            ancestors: {location: this.getData().id},
            location: location,
        };
    }

    /** @override */
    public async removeLocation(locationPath: LocationPath): Promise<boolean> {
        const locationID = locationPath.location.ID;
        const locData = this.state.locations[locationID];

        // Remove the data from the state if present
        if (locData) {
            this.setState({
                modules: this.state.modules.filter(m => locData.modules.indexOf(m) == -1),
                locations: {
                    [locationID]: undefined,
                },
            });
        }

        // Check if the location existed here
        const contained = this.settings.locations.indexOf(locationID) != -1;

        // Remove the location from the settings
        this.settingsObject.changeData({
            locations: this.settings.locations.filter(ID => ID != locationID),
        });

        // Return whether or not tyh e location existed here
        return contained;
    }

    /** @override */
    public async setEditMode(edit: boolean): Promise<void> {
        return this.setState({editMode: edit});
    }

    /** @override */
    public async setDropMode(drop: boolean): Promise<void> {
        return this.setState({dropMode: drop});
    }
}

export class LocationView extends createModuleView(LocationModule) {
    protected renderView(): JSX.Element {
        return <div>{this.state.modules[0]}</div>;
    }
}
