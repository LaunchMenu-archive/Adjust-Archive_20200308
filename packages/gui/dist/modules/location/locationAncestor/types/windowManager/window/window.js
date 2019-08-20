var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const core_1 = require("@adjust/core");
const moduleClassCreator_1 = require("../../../../../../module/moduleClassCreator");
const locationAncestor_1 = __importDefault(require("../../../locationAncestor"));
const React_1 = require("../../../../../../React");
const locationManager_type_1 = require("../../../../locationManager.type");
const window_type_1 = require("./window.type");
const Box_1 = require("../../../../../../components/Box");
const moduleViewClassCreator_1 = require("../../../../../../module/moduleViewClassCreator");
exports.windowConfig = {
    initialState: {
        childLocationAncestor: null,
        windowName: "",
    },
    settings: core_1.createSettings({
        width: 500,
        height: 500,
        x: 0,
        y: 0,
    }, { type: "number" }),
    type: window_type_1.WindowType,
};
/**
 * type "Window" accepts location hints:
 * - width: Number (The initial width that the window should have)
 * - height: Number (The initial height that the window should have)
 * - x: Number (The initial x coordinate that the window should have)
 * - y: Number (The initial y coordinate that the window should have)
 */
class WindowModule extends moduleClassCreator_1.createModule(exports.windowConfig, locationAncestor_1.default) {
    constructor() {
        super(...arguments);
        // The name of this ancestor type to be used in the location path and hints
        this.ancestorName = "window";
    }
    /** @override */
    async onInit(fromReload) {
        await super.onInit(fromReload);
        // Make sure the window's data is always visible when in preview mode
        if (this.getData().previewMode)
            await this.getChild();
    }
    // Window management
    /**
     * Opens the window that this module instance represents
     * @returns The opened or retrieved window, or undefined
     */
    async openWindow() {
        // Don't open an actual window in preview mode
        if (this.getData().previewMode)
            return;
        // If the window was already requested, return it
        if (this.window)
            return this.window;
        // Open the window
        this.window = core_1.WindowManager.openWindow(this.getData().ID, this.getID(), {
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
        window.webContents.on("crashed", (event) => {
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
    async closeWindow() {
        // Check if the window has been opened
        if (this.window) {
            // Indicate that this window is now open to the parent
            this.parent.setWindowVisibility(false, this.getData().ID);
            // Close the window
            this.window = null;
            await core_1.WindowManager.closeWindow(this.getData().ID);
        }
    }
    /** @override */
    async onStop() {
        await this.closeWindow();
    }
    /** @override */
    static onFileLoad(isMain, modulePath) {
        // Add a buffer of windows to increase loading times
        if (isMain)
            core_1.WindowManager.createWindowBuffer({
                frame: false,
                preloadModules: [modulePath],
            });
    }
    // Location management
    /** @override */
    async createLocation(location) {
        // Forward the command to the child ancestor
        const child = await this.getChild();
        const childResponse = child.createLocation(location);
        // Setup inittial settings if required
        this.settingsObject.setInitialData(async () => {
            // Obtain the hints for this window
            const hints = Object.assign({}, this.getLocationHints(location));
            // If no x or y coordinate was provided, center it
            const screenSize = await core_1.WindowManager.getScreenSize();
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
                if (prop in hints)
                    out[prop] = hints[prop];
            });
            return out;
        }, this.settingsConditions);
        // Return the child's response
        return childResponse;
    }
    /** @override */
    async removeLocation(locationPath) {
        const child = await this.getChild();
        return child.removeLocation(locationPath);
    }
    /** @override */
    async removeAncestor() {
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
    async getChild(create = true) {
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
    async closeChild() {
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
    async openModule(module, locationPath) {
        // Open the actual window
        this.openWindow();
        // Obtain the child ancestor
        const child = await this.getChild();
        // Forward opening the module to the child
        return child.openModule(module, locationPath);
    }
    /** @override */
    async closeModule(module, locationPath) {
        // Obtain the child ancestor
        const child = await this.getChild(false);
        // Forward closing the module to the child
        if (child)
            return await child.closeModule(module, locationPath);
        else
            return false;
    }
    /** @override */
    async showModule(module, locationPath) {
        // Obtain the child ancestor
        const child = await this.getChild();
        if (child) {
            // Forward showing the module to the child
            const shown = child.showModule(module, locationPath);
            // Open the actual window
            if (shown)
                this.openWindow();
            // Return the result
            return shown;
        }
        return false;
    }
    // Edit magement
    /** @override */
    async setEditMode(edit) {
        await super.setEditMode(edit);
        if (this.state.childLocationAncestor) {
            const child = await this.getChild();
            return child.setEditMode(edit);
        }
    }
    /** @override */
    async setDropMode(drop) {
        await super.setDropMode(drop);
        if (this.state.childLocationAncestor) {
            const child = await this.getChild();
            return child.setDropMode(drop);
        }
    }
    // Window specific methods
    /** @override */
    async setName(name) {
        this.setState({ windowName: name });
    }
    // Window settings methods
    /**
     * Saves the size of the window
     * @param width The width that the window now has
     * @param height The height that the window now has
     */
    saveWindowSize(width, height) {
        this.setSettings({ width, height }, this.settingsConditions);
    }
    /**
     * Saves the location of the window
     * @param x The x coordinate of the location
     * @param y The y coordinate of the location
     */
    saveWindowLocation(x, y) {
        this.setSettings({ x, y }, this.settingsConditions);
    }
    // Testing TODO: remove this
    async setEdit(edit) {
        const LM = await this.request({ type: locationManager_type_1.LocationManagerType });
        await LM.setEditMode(edit);
        LM.close();
    }
    async saveSettings() {
        core_1.SettingsManager.saveAll();
    }
}
exports.default = WindowModule;
class WindowView extends moduleViewClassCreator_1.createModuleView(WindowModule) {
    /**@override */
    componentWillMount() {
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
    renderHeader() {
        return (React_1.React.createElement(Box_1.Box, { display: "flex", flexDirection: "row-reverse", css: {
                WebkitAppRegion: "drag",
                "& > * ": {
                    WebkitAppRegion: "no-drag",
                },
            } },
            React_1.React.createElement(Box_1.Box, null,
                React_1.React.createElement(office_ui_fabric_react_1.PrimaryButton, null, "Hallo?")),
            React_1.React.createElement(Box_1.Box, null,
                React_1.React.createElement(office_ui_fabric_react_1.IconButton, { iconProps: { iconName: "close" }, onClick: () => this.module.closeWindow(), title: "close", ariaLabel: "close" })),
            React_1.React.createElement(Box_1.Box, null,
                this.data.ID,
                " ",
                this.state.windowName)));
    }
    /**@override */
    renderView() {
        return (React_1.React.createElement(Box_1.Box, { className: "window", display: "flex", background: "neutralLight", flexDirection: "column", shadowCustom: "rgba(0, 0, 0, 0.36) 0px 3px 7px 0px", marginXCustom: 7, marginTopCustom: 4, marginBottomCustom: 10, css: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } },
            React_1.React.createElement(Box_1.Box, null, !this.data.previewMode && this.renderHeader()),
            React_1.React.createElement(Box_1.Box, { flexGrow: 1, css: { position: "relative" } }, this.state.childLocationAncestor)));
    }
}
exports.WindowView = WindowView;
//# sourceMappingURL=window.js.map