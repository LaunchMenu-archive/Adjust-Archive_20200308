Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const locationManager_type_1 = require("../modules/location/locationManager.type");
exports.baseConfig = {
    initialState: {},
    settings: {
        location: {
            default: {
                id: "root",
                hint: {},
            },
            type: "location",
        },
    },
    type: undefined,
};
/**
 * A class containing data for importing it (its actual file location),
 * a state that can be serialized and deserialized,
 * a settings object that stores settings for this type of component
 */
class Module extends core_1.createModule(exports.baseConfig) {
    /** @override */
    init() {
        super.init();
        // Open the module if it's requested to do so
        if (this.getRequest().openView)
            this.openView();
    }
    /**
     * Opens the module view using the location manager, according to the module's settings
     */
    async openView() {
        // Make this module has a view to open
        if (!this.getConfig().viewClass)
            return;
        // Get the location manager to open this module with
        this.locationManager = await this.request({ type: locationManager_type_1.LocationManagerID });
        // Get the location from the settings
        const location = this.settings.location;
        // Use the location manager to open this module in the specified location
        this.locationManager.openModule(this.getID(), location);
    }
}
exports.Module = Module;
//# sourceMappingURL=module.js.map