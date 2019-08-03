var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const React_1 = require("../../../React");
const locationAncestor_type_1 = require("./locationAncestor.type");
const core_2 = require("@material-ui/core");
const locationAncestor_1 = __importDefault(require("./locationAncestor"));
exports.config = {
    initialState: {
        // The modules being displayed
        locations: {},
        modules: [],
        draggingModule: null,
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
class LocationModule extends core_1.createModule(exports.config, locationAncestor_1.default) {
    //TODO: add list of multiple modules, and a request focus system
    // Location management
    /** @override */
    async createLocation(location) {
        // Add the location to the settings
        if (this.settings.locations.indexOf(location.ID) == -1)
            this.setSettings({
                locations: [...this.settings.locations, location.ID],
            }, this.settingsConditions);
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
                // Keep all modules that weren't present in this location
                modules: this.state.modules.filter(m => locData.modules.find(lm => m.equals(lm.module)) == undefined),
                locations: {
                    [locationID]: undefined,
                },
            });
        }
        // Check if the location existed here
        const contained = this.settings.locations.indexOf(locationID) != -1;
        // Remove the location from the settings
        this.setSettings({
            locations: this.settings.locations.filter(ID => ID != locationID),
        }, this.settingsConditions);
        // Return whether or not the location existed here
        return contained;
    }
    /** @override */
    async removeAncestor() {
        this.settingsObject
            .getSettingsFile()
            .removeConditionData(this.settingsConditions);
    }
    // Module management
    /** @override*/
    async openModule(module, locationPath) {
        const locationID = locationPath.location.ID;
        const locData = this.state.locations[locationID];
        this.setState({
            modules: [module, ...this.state.modules],
            locations: {
                [locationID]: {
                    path: locationPath,
                    modules: [
                        { ID: module.toString(), module },
                        ...(locData ? locData.modules : []),
                    ],
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
        const l = this.state.modules.length;
        const contains = this.state.modules.find(m => m.equals(module)) != null;
        this.setState({
            modules: this.state.modules.filter(m => !m.equals(module)),
            locations: {
                [locationID]: {
                    path: locationPath,
                    modules: locData
                        ? locData.modules.filter(m => !m.module.equals(module))
                        : [],
                },
            },
        });
        // Return whether or not the location contained the module
        return contains;
    }
    /** @override*/
    async showModule(module, locationPath) {
        const contains = this.state.modules.find(m => m.equals(module)) != null;
        if (contains) {
            // Bring the module to the top
            this.setState({
                modules: [module, ...this.state.modules.filter(m => !m.equals(module))],
            });
            // Return whether or not the locatin contains the module, and brought it to the front
            return true;
        }
        // Return that the location didn't contain the module
        return false;
    }
    // Drag and drop methods
    /** @override */
    async setDropMode(drop) {
        await super.setDropMode(drop);
        // If we dragged a module that was located here, change its location
        if (!drop && this.state.draggingModule) {
            // Obtain the module from the ID
            const moduleID = new core_1.ModuleID(this.state.draggingModule.moduleID);
            const module = moduleID.getModule();
            // Obtain location data and remove it
            const oldLocationID = this.state.draggingModule.locationID;
            const newLocationID = this.state.draggingModule.newLocationID;
            this.setState({
                draggingModule: null,
            });
            // Obtain the ccondition to change the location for TODO: show a GUI fo rthe user to choose
            const condition = undefined;
            // await new Promise(res => setTimeout(res, 0)); // Emulate something async
            // Change the location for the condition
            const so = module.settingsObject;
            try {
                const data = so.getData(condition);
                let currentLocations = data.get.location;
                if (!(currentLocations instanceof Array))
                    currentLocations = [currentLocations];
                // Replace the dragged location by the new location
                await data.changeData({
                    location: [
                        ...currentLocations.filter(loc => loc != oldLocationID && loc != newLocationID),
                        newLocationID,
                    ],
                });
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    /**
     * Starts moving a module to another location
     * @param locationID The ID of the location of the module being dragged
     * @param moduleID The ID of the module being dragged
     */
    async onDragStart(locationID, moduleID) {
        const newLocationID = core_1.UUID.generate();
        const path = this.getData().path;
        this.getParent().setLocationsMoveData({
            locations: [{ ID: newLocationID, hints: { path: [...path] } }],
        });
        this.setState({
            draggingModule: {
                moduleID,
                locationID,
                newLocationID,
            },
        });
    }
    /**
     * Handles dropping of a module at this location
     */
    async onDrop() {
        // Retrieve the move data
        const parent = this.getParent();
        const currentData = await parent.getLocationsMoveData();
        // Set all hints to a path pointing at this location
        const path = this.getData().path;
        currentData.locations.forEach(loc => {
            loc.hints = {
                path: [...path],
            };
        });
        // Update the data
        await parent.updateLocationsMoveData(currentData);
    }
    /**
     * Moves the locations when the drag ends
     */
    async onDragEnd() {
        this.getParent().updateMovedLocations();
    }
}
exports.default = LocationModule;
class LocationView extends core_1.createModuleView(LocationModule) {
    constructor() {
        super(...arguments);
        // Rendering methods
        this.cover = { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 };
    }
    // Drag and drop methods
    /**
     * Starts the dragging of a location
     * @param event The DOM event that starts the dragging
     * @param locationID The location that is dragged from
     * @param module The data of the module being dragged
     */
    onDragStart(event, locationID, module) {
        event.dataTransfer.setData("text", locationAncestor_type_1.dragAndDropName);
        this.module.onDragStart(locationID, module.ID);
    }
    /**
     * Checks whether this is valid data for a drop
     * @param event The DOM event of the user dragging data
     */
    onDragOver(event) {
        if (this.state.inDropMode)
            event.preventDefault(); // Allows for dropping
    }
    /**
     * Updates the locations when draging a location finishes
     * @param event The DOM event of the user dragging data
     */
    onDragEnd(event) {
        this.module.onDragEnd();
    }
    /**
     * Handles the dropping of data
     * @param event The DOM event of the user dragging data
     */
    onDrop(event) {
        event.preventDefault(); // Allows for dropping
        const data = event.dataTransfer.getData("text");
        if (data == locationAncestor_type_1.dragAndDropName && this.state.inDropMode) {
            this.module.onDrop();
        }
    }
    /**
     * Renders a daragable box for every module in edit mode
     */
    renderModuleBoxes() {
        const boxes = [];
        Object.entries(this.state.locations).forEach(([locationID, location]) => {
            location.modules.forEach(module => {
                boxes.push(React_1.React.createElement(core_2.Box, { mt: 1, width: "100%", height: "30px", bgcolor: "blue", color: "white", key: module.ID, onDragStart: e => this.onDragStart(e, locationID, module), onDragOver: e => this.onDragOver(e), onDrop: e => this.onDrop(e), onDragEnd: e => this.onDragEnd(e), draggable: true },
                    locationID,
                    " ",
                    module.ID));
            });
        });
        return boxes;
    }
    /**@override */
    renderView() {
        return (React_1.React.createElement(core_2.Box, { css: this.cover, bgcolor: "#ffdddd" },
            this.state.inEditMode && (React_1.React.createElement(core_2.Box, { css: this.cover, p: 1, onDragOver: e => this.onDragOver(e), onDrop: e => this.onDrop(e) }, this.renderModuleBoxes())),
            this.state.modules[0],
            Object.keys(this.state.locations).map(key => (React_1.React.createElement("div", { key: key }, key)))));
    }
}
exports.LocationView = LocationView;
//# sourceMappingURL=location.js.map