import {LocationManagerID, LocationManager} from "./locationManager.type";
import {
    createModule,
    WindowManager,
    InstanceModuleProvider,
    ModuleReference,
} from "@adjust/core";
import {ModuleLocation} from "../../module/_types/ModuleLocation";
import {Registry} from "../../registry/registry";
import LocationAncestorModule from "./locationAncestor/locationAncestor";
import {LocationPath} from "./_types/LocationPath";
import {LocationAncestor} from "./locationAncestor/locationAncestor.type";

export const config = {
    initialState: {
        locations: {} as {
            [locationAncestorID: string]: LocationAncestor;
        },
    },
    settings: {
        locations: {
            default: {} as {
                [locationID: string]: LocationPath;
            },
            type: "locationPaths",
        },
    },
    type: LocationManagerID,
};

// test: {path: ["test"], location: {id: "test"}}

/**
 * The location manager, whicih is a window manager (all windows are on the same level)
 */
export default class LocationManagerModule
    extends createModule(config, LocationAncestorModule)
    implements LocationManager {
    /** @override */
    protected onInit() {
        Registry.addProvider(
            new InstanceModuleProvider(LocationManagerID, this, () => 2)
        );
    }

    /** @override */
    protected onReloadInit() {
        Registry.addProvider(
            new InstanceModuleProvider(LocationManagerID, this, () => 2)
        );
    }

    /**
     * Retrieves a location path for the given location
     * @param location The module location to get the path for
     * @returns The retrieve location path
     */
    protected getLocationPath(location: ModuleLocation): LocationPath {
        return this.settings.locations[location.id] || {path: [], location: location};
    }

    /**
     * Updates the location path in the settings
     * @param locationPath The location path to be stored
     */
    protected updateLocationPath(locationPath: LocationPath) {
        this.settingsObject.set.locations({
            ...this.settings.locations,
            [locationPath.location.id]: locationPath,
        });
    }

    /** @override */
    public async openModule(module: ModuleReference, location: ModuleLocation) {
        // Retrieve the location path
        const locationPath = this.getLocationPath(location);

        // Obtain the locationAncestor
        let id = this.getPathID(locationPath);
        let locationAncestor = this.state.locations[id];

        if (!locationAncestor) {
            // Get the child location ancestor
            const data = await this.getChildLocationAncestor(locationPath);
            id = data.id;
            locationAncestor = data.locationAncestor;

            // Update the state to contain this location ancestor
            this.setState({
                locations: {
                    [id]: locationAncestor,
                },
            });
        }

        // Open the path in the location ancestor
        const obtainedPath = await locationAncestor.openModule(module, {
            path: locationPath.path.slice(1),
            location: locationPath.location,
        });

        //Update location path
        this.updateLocationPath(obtainedPath);
    }

    /** @override */
    public async closeModule(module: ModuleReference, location: ModuleLocation) {
        WindowManager.closeWindow(location.id);
    }
}
