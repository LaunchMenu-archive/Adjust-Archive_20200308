import {createModule as adjustCreateModule} from "@adjust/core";
import {
    LocationManager,
    LocationManagerID,
} from "../modules/location/locationManager.type";

export const baseConfig = {
    initialState: {},
    settings: {
        location: {
            default: {
                id: "root", // The identifier of the location to open in
                hint: {}, // Hints for the creation of the location if absent
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
export abstract class Module extends adjustCreateModule(baseConfig) {
    // The location manager used to show the view, if used
    protected locationManager: LocationManager;

    /** @override */
    public init(): void {
        super.init();

        // Open the module if it's requested to do so
        if (this.getRequest().openView) this.openView();
    }

    /**
     * Opens the module view using the location manager, according to the module's settings
     */
    protected async openView(): Promise<void> {
        // Make this module has a view to open
        if (!this.getConfig().viewClass) return;

        // Get the location manager to open this module with
        this.locationManager = await this.request({type: LocationManagerID});

        // Get the location from the settings
        const location = this.settings.location;

        // Use the location manager to open this module in the specified location
        this.locationManager.openModule(this.getID(), location);
    }
}
