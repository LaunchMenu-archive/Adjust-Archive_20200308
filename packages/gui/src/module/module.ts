import {
    createModule as coreCreateModule,
    SettingsConditions,
    SettingsFile,
    Registry,
    SettingsDataID,
    SettingBooleanType,
    SettingJsonType,
} from "@adjust/core";
import {
    LocationManager,
    LocationManagerType,
} from "../modules/location/locationManager.type";
import {themeSettingsEmpty} from "../modules/theming/themeSettings";
import {Json} from "@adjust/core/types";

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
 * The settings that apply to styling
 */
export const stylingSettings = {
    styleOverride: {
        theme: themeSettingsEmpty,
        resetTheme: {
            default: false,
            type: SettingBooleanType,
        },
        css: {
            default: null as Json,
            type: SettingJsonType,
        },
    },
};

/**
 * The default config for modules, adds location management to the Adjust core modules
 */
export const baseConfig = {
    state: {},
    settings: {
        location: {
            default: ["root"] as string[] | string,
            type: SettingJsonType,
            // Make sure that when a location changes, this is synchronized with the location manager
            onChange: synchronizedLocations,
        },
        ...stylingSettings,
    },
    type: undefined,
};

/**
 * The base class to build your app using adjust gui
 *
 * Takes care of the following tasks:
 * -    Tracking module file location for importing it
 * -    Storing a serializable state
 * -    Storing settings that can be altered by the user
 * -    Allow for theming by the user
 * -    Integrating the location system to show the module's view
 *
 */
export abstract class Module extends coreCreateModule(baseConfig) {
    // The location manager used to show the view, if used
    protected locationManager: LocationManager;

    /** @override */
    public async init(): Promise<void> {
        await super.init();

        // Open the module if it's requested to do so
        if (this.getRequest().openView) this.openViews();
    }

    /** @override */
    public async stop(): Promise<void> {
        // Close the module if it was request to open them
        if (this.getRequest().openView) this.closeViews();

        await super.stop();
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
        this.getSettingsObject().on(
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
        this.getSettingsObject().off("change", "openViews");
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
