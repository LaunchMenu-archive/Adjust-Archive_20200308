import {Grid, Button, Box} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {
    WindowManager,
    createModuleView,
    ModuleReference,
    SettingsManager,
} from "@adjust/core";
import {LocationAncestorID, LocationAncestor} from "../locationAncestor.type";
import {createModule} from "../../../../module/moduleClassCreator";
import LocationAncestorModule from "../locationAncestor";
import {LocationPath} from "../../_types/LocationPath";
import {React} from "../../../../React";
import {ModuleLocation} from "../../../../module/_types/ModuleLocation";
import {LocationManagerID} from "../../locationManager.type";

export const config = {
    initialState: {
        childLocationAncestor: null as Promise<LocationAncestor>,
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
            // Close the window
            WindowManager.closeWindow(this.getData().ID);
            this.window = null;
        }
    }

    /** @override */
    protected async onStop(): Promise<void> {
        await this.closeWindow();
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
            const locationAncestor = this.getChildLocationAncestor();

            // Store child location ancestor
            this.setState({
                childLocationAncestor: locationAncestor,
            });
        }

        return await this.state.childLocationAncestor;
    }

    // Module management
    /** @override */
    public async openModule(
        module: ModuleReference,
        location: LocationPath
    ): Promise<LocationPath> {
        // Open the actual window
        this.openWindow();

        // Obtain the child ancestor
        const child = await this.getChild();

        // Forward opening the module to the child
        return child.openModule(module, location);
    }

    /** @override */
    public async closeModule(
        module: ModuleReference,
        location: LocationPath
    ): Promise<boolean> {
        if (this.window) {
            // Obtain the child ancestor
            const child = await this.getChild();

            // Forward closing the module to the child
            return await child.closeModule(module, location);
        }
        return false;
    }

    /** @override */
    public async showModule(
        module: ModuleReference,
        location: LocationPath
    ): Promise<boolean> {
        if (this.window) {
            // Obtain the child ancestor
            const child = await this.getChild();

            // Forward showing the module to the child
            return child.showModule(module, location);
        }
        return false;
    }

    // Edit magement
    /** @override */
    public async setEditMode(edit: boolean): Promise<void> {
        await super.setEditMode(edit);

        if (this.state.childLocationAncestor) {
            const child = await this.getChild();
            return child.setEditMode(edit);
        }
    }

    /** @override */
    public async setDropMode(drop: boolean): Promise<void> {
        await super.setDropMode(drop);

        if (this.state.childLocationAncestor) {
            const child = await this.getChild();
            return child.setDropMode(drop);
        }
    }

    // Testing TODO: remove this
    public async setEdit(edit: boolean): Promise<void> {
        const LM = await this.request({type: LocationManagerID});
        await LM.setEditMode(edit);
        LM.close();
    }

    public async saveSettings(): Promise<void> {
        SettingsManager.saveAll();
    }
}

export class WindowView extends createModuleView(WindowModule) {
    /**@override */
    public componentWillMount(): void {
        super.componentWillMount();
        document.addEventListener("keydown", e => {
            if (e.key == "e") {
                this.module.setEdit(true);
            }
        });
        document.addEventListener("keyup", e => {
            if (e.key == "e") {
                this.module.setEdit(false);
            }
        });
        document.addEventListener("keyup", e => {
            if (e.key == "s") {
                this.module.saveSettings();
            }
        });
    }

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
                <Grid item>{this.data.ID}</Grid>
            </Grid>
        );
    }

    /**@override */
    protected renderView(): JSX.Element {
        return (
            <Box
                display="flex"
                flexDirection="column"
                css={{width: "100%", height: "100%"}}>
                <Box display="flex">{this.renderHeader()}</Box>
                <Box flex={1} css={{position: "relative" as any}}>
                    {this.state.childLocationAncestor}
                </Box>
            </Box>
        );
    }
}

WindowModule.setViewClass(WindowView);
