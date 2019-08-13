import {
    createModule as adjustCreateModule,
    SettingsConditions,
    SettingsFile,
    Registry,
    SettingsDataID,
} from "@adjust/core";
import {
    LocationManager,
    LocationManagerType,
} from "../modules/location/locationManager.type";

/**
 * A method that syncrhonizes the locations with the location manager when a module's location changes
 * @param newValue The new locations of the module
 * @param condition The condition for which the location changed
 * @param oldValue The old locations of the modulei
 * @param settingsFile An instance of the settings file in which these locations are stored
 */
export const synchronizedLocations = async (
    newValue: string[] | string,
    condition: SettingsConditions,
    oldValue: string[] | string,
    settingsFile: SettingsFile<any>
) => {
    const newLocations =
        newValue instanceof Array ? newValue : newValue ? [newValue] : [];
    const oldLocations =
        oldValue instanceof Array ? oldValue : oldValue ? [oldValue] : [];

    // Obtain the location manager instance
    const locationManager = await Registry.createRoot({type: LocationManagerType});

    // Obtain the ID for these conditions
    const ID = settingsFile.getConditionID(condition);
    const moduleClass = settingsFile.getModuleClass();

    // Shouldn't occure, but in case it does, just cancel stuff
    if (!moduleClass) return;

    // Remove all the old locations
    locationManager.updateModuleLocation(
        new SettingsDataID(ID, moduleClass.getPath()),
        newLocations,
        oldLocations
    );
};

/**
 * The default config for modules, adds location management to the Adjust core modules
 */
export const baseConfig = {
    initialState: {},
    settings: {
        location: {
            default: ["root"] as string[] | string,
            type: "location",
            // Make sure that when a location changes, this is synchronized with the location manager
            onChange: synchronizedLocations,
        },
    },
    type: undefined,
};

/**
 * A class containing data for importing it (its actual file location),
 * a state that can be serialized and deserialized,
 * a settings object that stores settings for this type of component
 */
export abstract class Module extends adjustCreateModule(baseConfig) {
    // The location manager used to show the view, if used
    protected locationManager: LocationManager;

    /** @override */
    public async init(fromReload: boolean): Promise<void> {
        await super.init(fromReload);

        // Open the module if it's requested to do so
        if (this.getRequest().openView) this.openViews();
    }

    /** @override */
    public async stop(): Promise<void> {
        super.stop();

        // Close the module if it was request to open them
        if (this.getRequest().openView) this.closeViews();
    }

    /**
     * Opens the module view(s) using the location manager, according to the module's settings
     */
    protected async openViews(): Promise<void> {
        // Make this module has a view to open
        if (!this.getConfig().viewClass) return;

        // Get the location manager to open this module with
        if (!this.locationManager)
            this.locationManager = await this.request({type: LocationManagerType});

        // Get the location from the settings
        let locations = this.settings.location;
        if (!locations) locations = [];
        else if (!(locations instanceof Array)) locations = [locations];

        // Use the location manager to open this module in all the specified locations
        const openingPromises = locations.map(location =>
            this.locationManager.openModule(this.getID(), location)
        );
        await Promise.all(openingPromises);

        // Setup listeners for location changes
        this.settingsObject.on(
            "change",
            async (prop, value, oldValue) => {
                if (prop == "location") {
                    const newLocations =
                        value instanceof Array ? value : value ? [value] : [];
                    const oldLocations =
                        oldValue instanceof Array ? oldValue : oldValue ? [oldValue] : [];

                    // Close all removed locations
                    const closePromises = oldLocations.map(
                        location =>
                            !newLocations.includes(location) &&
                            this.locationManager.closeModule(this.getID(), location)
                    );

                    // Open all added locations
                    const openPromises = newLocations.map(
                        location =>
                            !oldLocations.includes(location) &&
                            this.locationManager.openModule(this.getID(), location)
                    );

                    // Await all changes
                    await Promise.all([...closePromises, ...openPromises]);
                }
            },
            "openViews"
        );
    }

    /**
     * Closes the module view(s) using the location manager, according tot he module's settings
     */
    protected async closeViews(): Promise<void> {
        // Make this module has a view to open
        if (!this.getConfig().viewClass) return;

        // Make sure there is a location manager to close this module with
        if (!this.locationManager) return;

        // Get the location from the settings
        let locations = this.settings.location;
        if (!locations) locations = [];
        else if (!(locations instanceof Array)) locations = [locations];

        // Use the location manager to close this module in all the specified locations
        const openingPromises = locations.map(location =>
            this.locationManager.closeModule(this.getID(), location)
        );
        await Promise.all(openingPromises);

        // Remove listeners for location changes
        this.settingsObject.off("change", "openViews");
    }

    /**
     * Shows the GUI of this module at its locations
     * @param locations The locations to show this module at (provided it's already opened there)
     */
    protected async show(locations?: string[] | string): Promise<void> {
        // If no locations were passed, load them from the settings
        if (!locations) locations = this.settings.location;

        // Normalize the locations
        if (!locations) locations = [];
        else if (!(locations instanceof Array)) locations = [locations];

        // Only continue if there is a location manager
        if (!this.locationManager) return;

        // Show the module at the locations
        const promises = locations.map(location =>
            this.locationManager.showModule(this.getID(), location)
        );
        await Promise.all(promises);
    }
}
