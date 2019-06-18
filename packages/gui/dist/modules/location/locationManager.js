var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locationManager_type_1 = require("./locationManager.type");
const core_1 = require("@adjust/core");
const registry_1 = require("../../registry/registry");
const locationAncestor_1 = __importDefault(require("./locationAncestor/locationAncestor"));
exports.config = {
    initialState: {
        locations: {},
    },
    settings: {
        locations: {
            default: {},
            type: "locationPaths",
        },
    },
    type: locationManager_type_1.LocationManagerID,
};
// test: {path: ["test"], location: {id: "test"}}
/**
 * The location manager, whicih is a window manager (all windows are on the same level)
 */
class LocationManagerModule extends core_1.createModule(exports.config, locationAncestor_1.default) {
    /** @override */
    onInit() {
        registry_1.Registry.addProvider(new core_1.InstanceModuleProvider(locationManager_type_1.LocationManagerID, this, () => 2));
    }
    /** @override */
    onReloadInit() {
        registry_1.Registry.addProvider(new core_1.InstanceModuleProvider(locationManager_type_1.LocationManagerID, this, () => 2));
    }
    /**
     * Retrieves a location path for the given location
     * @param location The module location to get the path for
     * @returns The retrieve location path
     */
    getLocationPath(location) {
        return this.settings.locations[location.id] || { path: [], location: location };
    }
    /**
     * Updates the location path in the settings
     * @param locationPath The location path to be stored
     */
    updateLocationPath(locationPath) {
        this.settingsObject.set.locations(Object.assign({}, this.settings.locations, { [locationPath.location.id]: locationPath }));
    }
    /** @override */
    async openModule(module, location) {
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
    async closeModule(module, location) {
        core_1.WindowManager.closeWindow(location.id);
    }
}
exports.default = LocationManagerModule;
//# sourceMappingURL=locationManager.js.map