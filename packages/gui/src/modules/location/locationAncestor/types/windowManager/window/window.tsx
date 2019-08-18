import {IconButton} from "office-ui-fabric-react";
import {PrimaryButton} from "office-ui-fabric-react/lib-commonjs";
import {Event} from "electron";
import {
    WindowManager,
    ModuleReference,
    SettingsManager,
    createSettings,
} from "@adjust/core";
import {LocationAncestor} from "../../../locationAncestor.type";
import {createModule} from "../../../../../../module/moduleClassCreator";
import LocationAncestorModule from "../../../locationAncestor";
import {LocationPath} from "../../../../_types/LocationPath";
import {React} from "../../../../../../React";
import {ModuleLocation} from "../../../../../../module/_types/ModuleLocation";
import {LocationManagerType} from "../../../../locationManager.type";
import {WindowType, Window} from "./window.type";
import {Box} from "../../../../../../components/Box";
import {createModuleView} from "../../../../../../module/moduleViewClassCreator";

export const windowConfig = {
    initialState: {
        childLocationAncestor: null as Promise<LocationAncestor>,
        windowName: "",
    },
    settings: createSettings(
        {
            width: 500,
            height: 500,
            x: 0,
            y: 0,
        },
        {type: "number"}
    ),
    type: WindowType,
};

/**
 * type "Window" accepts location hints:
 * - width: Number (The initial width that the window should have)
 * - height: Number (The initial height that the window should have)
 * - x: Number (The initial x coordinate that the window should have)
 * - y: Number (The initial y coordinate that the window should have)
 */

export default class WindowModule
    extends createModule(windowConfig, LocationAncestorModule)
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
        this.window = WindowManager.openWindow(this.getData().ID, this.getID(), {
            frame: false,
            transparent: true,
            backgroundColor: "#00000000",
            preloadModules: [this.getClass().getPath()],
        });

        // Indicate that this window is now open to the parent
        this.parent.setWindowVisibility(true, this.getData().ID);

        // Set the initial data
        const window = await this.window;
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

        // Handle window crashes
        window.webContents.on("crashed", (event: Event) => {
            //TODO:
            console.log(event);
            debugger;
        });

        // Return the window
        return window;
    }

    /**
     * Closes the window if it had been opened already
     */
    public async closeWindow(): Promise<void> {
        // Check if the window has been opened
        if (this.window) {
            // Indicate that this window is now open to the parent
            this.parent.setWindowVisibility(false, this.getData().ID);

            // Close the window
            this.window = null;
            await WindowManager.closeWindow(this.getData().ID);
        }
    }

    /** @override */
    protected async onStop(): Promise<void> {
        await this.closeWindow();
    }

    /** @override */
    protected static onFileLoad(isMain: boolean, modulePath: string): void {
        // Add a buffer of windows to increase loading times
        if (isMain)
            WindowManager.createWindowBuffer({
                frame: false,
                preloadModules: [modulePath],
            });
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
     * @param create Whether or not to create the child if abscent
     * @returns The child location ancestor
     */
    protected async getChild(create: boolean = true): Promise<LocationAncestor> {
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
        // Obtain the child ancestor
        const child = await this.getChild(false);

        // Forward closing the module to the child
        if (child) return await child.closeModule(module, locationPath);
        else return false;
    }

    /** @override */
    public async showModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        // Obtain the child ancestor
        const child = await this.getChild();

        if (child) {
            // Forward showing the module to the child
            const shown = child.showModule(module, locationPath);

            // Open the actual window
            if (shown) this.openWindow();

            // Return the result
            return shown;
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
        const LM = await this.request({type: LocationManagerType});
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
            <Box
                display="flex"
                flexDirection="row-reverse"
                css={
                    {
                        WebkitAppRegion: "drag",
                        "& > * ": {
                            WebkitAppRegion: "no-drag",
                        },
                    } as any
                }>
                <Box>
                    <PrimaryButton>Hallo?</PrimaryButton>
                </Box>
                <Box>
                    <IconButton
                        iconProps={{iconName: "close"}}
                        onClick={() => this.module.closeWindow()}
                        title="close"
                        ariaLabel="close"
                    />
                </Box>
                <Box>
                    {this.data.ID} {this.state.windowName}
                </Box>
            </Box>
        );
    }

    /**@override */
    protected renderView(): JSX.Element {
        return (
            <Box
                className="window"
                display="flex"
                background="neutralLight"
                flexDirection="column"
                shadowCustom="rgba(0, 0, 0, 0.36) 0px 3px 7px 0px"
                marginXCustom={7}
                marginTopCustom={4}
                marginBottomCustom={10}
                css={{position: "absolute", left: 0, right: 0, top: 0, bottom: 0} as any}>
                <Box>{!this.data.previewMode && this.renderHeader()}</Box>
                <Box flexGrow={1} css={{position: "relative" as any}}>
                    {this.state.childLocationAncestor}
                </Box>
            </Box>
        );
    }
}
