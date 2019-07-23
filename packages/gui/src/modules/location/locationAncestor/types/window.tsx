import {Grid, Button} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {WindowManager, createModuleView, ModuleReference} from "@adjust/core";
import {LocationAncestorID, LocationAncestor} from "../locationAncestor.type";
import {createModule} from "../../../../module/moduleClassCreator";
import LocationAncestorModule from "../locationAncestor";
import {LocationPath} from "../../_types/LocationPath";
import {React} from "../../../../React";
import {ModuleLocation} from "../../../../module/_types/ModuleLocation";

export const config = {
    initialState: {
        childLocationAncestor: null as LocationAncestor,
    },
    settings: {},
    type: LocationAncestorID,
};

export default class WindowModule extends createModule(config, LocationAncestorModule)
    implements LocationAncestor {
    // The name of this ancestor type to be used in the location path and hints
    protected ancestorName: string = "window";

    // The window in which this module is shown
    protected window: Promise<Electron.BrowserWindow>;

    // /** @override */
    // public async onInit(): Promise<void> {
    //     // Open the window when it is requested
    //     WindowManager.openWindow(this.getData().id, this.getID());
    // }

    // /** @override */
    // public async onReloadInit(): Promise<void> {
    //     // Open the window when it is requested
    //     WindowManager.openWindow(this.getData().id, this.getID());
    // }

    // Window management
    /**
     * Opens the window that this module instance represents
     * @returns The opened or retrieved window
     */
    protected async openWindow(): Promise<Electron.BrowserWindow> {
        if (this.window) return this.window;
        return (this.window = WindowManager.openWindow(this.getData().ID, this.getID()));
    }

    /**
     * Closes the window if it had been opened already
     */
    protected async closeWindow(): Promise<void> {
        // Check if the window has been opened
        if (this.window) {
            const window = await this.window;

            // Close the window
            window.close();
            this.window = null;
        }
    }

    // Location management
    /** @override */
    public async createLocation(location: ModuleLocation): Promise<LocationPath> {
        const child = await this.getChild();
        return child.createLocation(location);
    }

    /** @override */
    public async removeLocation(locationPath: LocationPath): Promise<boolean> {
        const child = await this.getChild();
        return child.removeLocation(locationPath);
    }

    /**
     * Opens the child location ancestor and returns it
     * @returns The child location ancestor
     */
    protected async getChild(): Promise<LocationAncestor> {
        // If this module has no child location ancestor yet, obtain it
        if (!this.state.childLocationAncestor) {
            // Get child location ancestor
            const locationAncestor = await this.getChildLocationAncestor();

            // Store child location ancestor
            this.setState({
                childLocationAncestor: locationAncestor,
            });
        }
        return this.state.childLocationAncestor;
    }

    // Module management
    /** @override */
    public async openModule(
        module: ModuleReference,
        location: LocationPath
    ): Promise<LocationPath> {
        // Open the actual window
        this.openWindow();

        // If this module has no child location ancestor yet, obtain it
        if (!this.state.childLocationAncestor) {
            // Get child location ancestor
            const {locationAncestor, path} = await this.getChildLocationAncestorFromPath(
                location
            );

            // Store child location ancestor
            this.setState({
                childLocationAncestor: locationAncestor,
            });

            // Open the module in this location with the potentially newly made path
            return this.state.childLocationAncestor.openModule(module, path);
        } else {
            // Open the module in this location
            return this.state.childLocationAncestor.openModule(module, location);
        }
    }

    /** @override */
    public async closeModule(
        module: ModuleReference,
        location: LocationPath
    ): Promise<boolean> {
        return false;
    }

    /** @override */
    public async showModule(
        module: ModuleReference,
        location: LocationPath
    ): Promise<boolean> {
        return false;
    }

    // Edit magement
    /** @override */
    public async setEditMode(edit: boolean): Promise<void> {}

    /** @override */
    public async setDropMode(drop: boolean): Promise<void> {}
}

export class WindowView extends createModuleView(WindowModule) {
    /**
     * Renders the header with the window's controls
     */
    protected renderHeader(): JSX.Element {
        return (
            <Grid container direction="row-reverse">
                <Grid item>
                    <Button>
                        <Close />
                    </Button>
                </Grid>
            </Grid>
        );
    }

    /**@override */
    protected renderView(): JSX.Element {
        return (
            <div>
                {this.renderHeader()}
                {this.state.childLocationAncestor}
            </div>
        );
    }
}

WindowModule.setViewClass(WindowView);
