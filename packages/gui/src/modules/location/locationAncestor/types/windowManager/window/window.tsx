import {Grid, Button, Box} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import {
    WindowManager,
    createModuleView,
    ModuleReference,
    SettingsManager,
} from "@adjust/core";
import {LocationAncestor} from "../../../locationAncestor.type";
import {createModule} from "../../../../../../module/moduleClassCreator";
import LocationAncestorModule from "../../../locationAncestor";
import {LocationPath} from "../../../../_types/LocationPath";
import {React} from "../../../../../../React";
import {ModuleLocation} from "../../../../../../module/_types/ModuleLocation";
import {LocationManagerID} from "../../../../locationManager.type";
import {WindowID, Window} from "./window.type";

export const config = {
    initialState: {
        childLocationAncestor: null as Promise<LocationAncestor>,
        windowName: "",
    },
    settings: {
        width: {
            default: 500,
            type: "number",
        },
        height: {
            default: 500,
            type: "number",
        },
        x: {
            default: 0,
            type: "number",
        },
        y: {
            default: 0,
            type: "number",
        },
    },
    type: WindowID,
};

/**
 * type "Window" accepts location hints:
 * - width: Number (The initial width that the window should have)
 * - height: Number (The initial height that the window should have)
 * - x: Number (The initial x coordinate that the window should have)
 * - y: Number (The initial y coordinate that the window should have)
 */

export default class WindowModule extends createModule(config, LocationAncestorModule)
    implements Window {
    // The name of this ancestor type to be used in the location path and hints
    protected ancestorName: string = "window";

    // The window in which this module is shown
    protected window: Promise<Electron.BrowserWindow>;

    /** @override */
    public async onInit(fromReload: boolean): Promise<void> {
        await super.onInit(fromReload);

        // Make sure the window's data is always visible when in preview mode
        if (this.getData().previewMode) await this.getChild();
    }

    // Window management
    /**
     * Opens the window that this module instance represents
     * @returns The opened or retrieved window, or undefined
     */
    protected async openWindow(): Promise<Electron.BrowserWindow> {
        // Don't open an actual window in preview mode
        if (this.getData().previewMode) return;

        // If the window was already requested, return it
        if (this.window) return this.window;

        // Open the window
        this.window = WindowManager.openWindow(this.getData().ID, this.getID());
        const window = await this.window;

        // Set the initial data
        window.setContentBounds({
            x: this.settings.x,
            y: this.settings.y,
            width: this.settings.width,
            height: this.settings.height,
        });

        // Setup bounds listeners
        let moveTimeoutID;
        const updateBounds = event => {
            const bounds = event.sender.getContentBounds();

            // Use a timeout to only update the location once finished dragging
            clearTimeout(moveTimeoutID);
            moveTimeoutID = setTimeout(() => {
                this.saveWindowLocation(bounds.x, bounds.y);
                this.saveWindowSize(bounds.width, bounds.height);
            }, 50);
        };
        window.on("move", updateBounds);
        window.on("resize", updateBounds);

        // Return the window
        return window;
    }

    /**
     * Closes the window if it had been opened already
     */
    protected async closeWindow(): Promise<void> {
        // Check if the window has been opened
        if (this.window) {
            // Close the window
            this.window = null;
            await WindowManager.closeWindow(this.getData().ID);
        }
    }

    /** @override */
    protected async onStop(): Promise<void> {
        await this.closeWindow();
    }

    // Location management
    /** @override */
    public async createLocation(location: ModuleLocation): Promise<LocationPath> {
        // Forward the command to the child ancestor
        const child = await this.getChild();
        const childResponse = child.createLocation(location);

        // Setup inittial settings if required
        this.settingsObject.setInitialData(async () => {
            // Obtain the hints for this window
            const hints = {...this.getLocationHints(location)};

            // If no x or y coordinate was provided, center it
            const screenSize = await WindowManager.getScreenSize();
            if (!("x" in hints))
                hints["x"] =
                    screenSize.width / 2 -
                    (hints["width"] || this.getConfig().settings["width"].default) / 2;
            if (!("y" in hints))
                hints["y"] =
                    screenSize.height / 2 -
                    (hints["height"] || this.getConfig().settings["height"].default) / 2;

            // Build the initial data object
            const out = {};
            ["x", "y", "width", "height"].forEach(prop => {
                if (prop in hints) out[prop] = hints[prop];
            });

            return out;
        }, this.settingsConditions);

        // Return the child's response
        return childResponse;
    }

    /** @override */
    public async removeLocation(locationPath: LocationPath): Promise<boolean> {
        const child = await this.getChild();
        return child.removeLocation(locationPath);
    }

    /** @override */
    public async removeAncestor(): Promise<void> {
        // Remove own data
        this.settingsObject
            .getSettingsFile()
            .removeConditionData(this.settingsConditions);

        // Forward to child
        const child = await this.getChild();
        await child.removeAncestor();

        // Dispose the child
        await this.closeChild();
    }

    // Child management
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

    /**
     * closes the child location ancestor if opened
     */
    protected async closeChild(): Promise<void> {
        // Only dispose the child if present
        if (!this.state.childLocationAncestor) {
            // Get child location ancestor
            const child = await this.state.childLocationAncestor;

            // Remove child location ancestor
            this.setState({
                childLocationAncestor: undefined,
            });

            // Close the child
            await child.close();
        }
    }

    // Module management
    /** @override */
    public async openModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<LocationPath> {
        // Open the actual window
        this.openWindow();

        // Obtain the child ancestor
        const child = await this.getChild();

        // Forward opening the module to the child
        return child.openModule(module, locationPath);
    }

    /** @override */
    public async closeModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        if (this.window) {
            // Obtain the child ancestor
            const child = await this.getChild();

            // Forward closing the module to the child
            return await child.closeModule(module, locationPath);
        }
        return false;
    }

    /** @override */
    public async showModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        if (this.window) {
            // Obtain the child ancestor
            const child = await this.getChild();

            // Forward showing the module to the child
            return child.showModule(module, locationPath);
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

    // Window specific methods
    /** @override */
    public async setName(name: string): Promise<void> {
        this.setState({windowName: name});
    }

    // Window settings methods
    /**
     * Saves the size of the window
     * @param width The width that the window now has
     * @param height The height that the window now has
     */
    public saveWindowSize(width: number, height: number): void {
        this.setSettings({width, height}, this.settingsConditions);
    }

    /**
     * Saves the location of the window
     * @param x The x coordinate of the location
     * @param y The y coordinate of the location
     */
    public saveWindowLocation(x: number, y: number): void {
        this.setSettings({x, y}, this.settingsConditions);
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

        //TODO: remove test methids
        document.body.addEventListener("keydown", e => {
            if (e.key == "e") {
                this.module.setEdit(true);
            }
        });
        document.addEventListener("keyup", e => {
            if (e.key == "e") {
                this.module.setEdit(false);
            }
        });
        document.body.addEventListener("keyup", e => {
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
                <Grid item>
                    {this.data.ID} {this.state.windowName}
                </Grid>
            </Grid>
        );
    }

    /**@override */
    protected renderView(): JSX.Element {
        return (
            <Box
                display="flex"
                flexDirection="column"
                css={{position: "absolute", left: 0, right: 0, top: 0, bottom: 0} as any}>
                <Box>{!this.data.previewMode && this.renderHeader()}</Box>
                <Box flex={1} css={{position: "relative" as any}}>
                    {this.state.childLocationAncestor}
                </Box>
            </Box>
        );
    }
}
