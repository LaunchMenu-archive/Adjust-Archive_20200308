Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const locationManager_type_1 = require("../modules/location/locationManager.type");
/**
 * A method that syncrhonizes the locations with the location manager when a module's location changes
 * @param newValue The new locations of the module
 * @param condition The condition for which the location changed
 * @param oldValue The old locations of the modulei
 * @param settingsFile An instance of the settings file in which these locations are stored
 */
exports.synchronizedLocations = async (newValue, condition, oldValue, settingsFile) => {
    const newLocations = newValue instanceof Array ? newValue : newValue ? [newValue] : [];
    const oldLocations = oldValue instanceof Array ? oldValue : oldValue ? [oldValue] : [];
    // Obtain the location manager instance
    const locationManager = await core_1.Registry.createRoot({ type: locationManager_type_1.LocationManagerID });
    // Obtain the ID for these conditions
    const ID = settingsFile.getConditionID(condition);
    const moduleClass = settingsFile.getModuleClass();
    // Shouldn't occure, but in case it does, just cancel stuff
    if (!moduleClass)
        return;
    // Remove all the old locations
    locationManager.updateModuleLocation(new core_1.SettingsDataID(ID, moduleClass.getPath()), newLocations, oldLocations);
};
/**
 * The default config for modules, adds location management to the Adjust core modules
 */
exports.baseConfig = {
    initialState: {},
    settings: {
        location: {
            default: ["root"],
            type: "location",
            // Make sure that when a location changes, this is synchronized with the location manager
            onChange: exports.synchronizedLocations,
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
    async init() {
        await super.init();
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
        let locations = this.settings.location;
        if (!locations)
            locations = [];
        else if (!(locations instanceof Array))
            locations = [locations];
        // Use the location manager to open this module in all the specified locations
        const openingPromises = locations.map(location => this.locationManager.openModule(this.getID(), location));
        await Promise.all(openingPromises);
        // Setup listeners for location changes
        this.settingsObject.on("change", async (prop, value, oldValue) => {
            if (prop == "location") {
                const newLocations = value instanceof Array ? value : value ? [value] : [];
                const oldLocations = oldValue instanceof Array ? oldValue : oldValue ? [oldValue] : [];
                // Close all removed locations
                const closePromises = oldLocations.map(location => !newLocations.includes(location) &&
                    this.locationManager.closeModule(this.getID(), location));
                // Open all added locations
                const openPromises = newLocations.map(location => !oldLocations.includes(location) &&
                    this.locationManager.openModule(this.getID(), location));
                // Await all changes
                await Promise.all([...closePromises, ...openPromises]);
            }
        });
    }
}
exports.Module = Module;
//# sourceMappingURL=module.js.map