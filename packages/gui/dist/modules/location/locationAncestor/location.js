Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const React_1 = require("../../../React");
const locationAncestor_type_1 = require("./locationAncestor.type");
exports.config = {
    initialState: {
        // The modules being displayed
        locations: {},
        modules: [],
        editMode: false,
        dropMode: false,
    },
    getPriority: () => 0.1,
    settings: {
        locations: {
            default: [],
            type: "locations",
        },
    },
    type: locationAncestor_type_1.LocationAncestorID,
};
/**
 * The location class that simply renders a location when requested
 */
class LocationModule extends core_1.createModule(exports.config) {
    //TODO: add list of multiple modules, and a request focus system
    /** @override*/
    async openModule(module, locationPath) {
        const locationID = locationPath.location.ID;
        const locData = this.state.locations[locationID];
        this.setState({
            modules: [module, ...this.state.modules],
            locations: {
                [locationID]: {
                    path: locationPath,
                    modules: [module, ...(locData ? locData.modules : [])],
                },
            },
        });
        // Create the location permamantly if it didn't exist already
        return this.createLocation(locationPath.location);
    }
    /** @override*/
    async closeModule(module, locationPath) {
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
    async showModule(module, locationPath) {
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
    async createLocation(location) {
        // Add the location to the settings
        if (this.settings.locations.indexOf(location.ID) == -1)
            this.settingsObject.changeData({
                locations: [...this.settings.locations, location.ID],
            });
        // Return the path just including this module
        return {
            nodes: this.getData().path,
            location: location,
        };
    }
    /** @override */
    async removeLocation(locationPath) {
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
    async setEditMode(edit) {
        return this.setState({ editMode: edit });
    }
    /** @override */
    async setDropMode(drop) {
        return this.setState({ dropMode: drop });
    }
}
exports.default = LocationModule;
class LocationView extends core_1.createModuleView(LocationModule) {
    renderView() {
        if (this.state.editMode)
            return React_1.React.createElement("div", null, "Shiit");
        return React_1.React.createElement("div", null, this.state.modules[0]);
    }
}
exports.LocationView = LocationView;
//# sourceMappingURL=location.js.map