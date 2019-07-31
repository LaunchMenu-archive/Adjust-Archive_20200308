var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const core_2 = require("@adjust/core");
const moduleClassCreator_1 = require("../../../../../../module/moduleClassCreator");
const locationAncestor_1 = __importDefault(require("../../../locationAncestor"));
const React_1 = require("../../../../../../React");
const locationManager_type_1 = require("../../../../locationManager.type");
const window_type_1 = require("./window.type");
exports.config = {
    initialState: {
        childLocationAncestor: null,
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
    type: window_type_1.WindowID,
};
class WindowModule extends moduleClassCreator_1.createModule(exports.config, locationAncestor_1.default) {
    constructor() {
        super(...arguments);
        // The name of this ancestor type to be used in the location path and hints
        this.ancestorName = "window";
    }
    // Window management
    /**
     * Opens the window that this module instance represents
     * @returns The opened or retrieved window
     */
    async openWindow() {
        // If the window was already requested, return it
        if (this.window)
            return this.window;
        // Open the window
        this.window = core_2.WindowManager.openWindow(this.getData().ID, this.getID());
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
    async closeWindow() {
        // Check if the window has been opened
        if (this.window) {
            // Close the window
            core_2.WindowManager.closeWindow(this.getData().ID);
            this.window = null;
        }
    }
    /** @override */
    async onStop() {
        await this.closeWindow();
    }
    // Location management
    /** @override */
    async createLocation(location) {
        const child = await this.getChild();
        return child.createLocation(location);
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
     * @returns The child location ancestor
     */
    async getChild() {
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
        if (this.window) {
            // Obtain the child ancestor
            const child = await this.getChild();
            // Forward closing the module to the child
            return await child.closeModule(module, locationPath);
        }
        return false;
    }
    /** @override */
    async showModule(module, locationPath) {
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
        this.settingsObject.set.width(width, this.settingsConditions);
        this.settingsObject.set.height(height, this.settingsConditions);
    }
    /**
     * Saves the location of the window
     * @param x The x coordinate of the location
     * @param y The y coordinate of the location
     */
    saveWindowLocation(x, y) {
        this.settingsObject.set.x(x, this.settingsConditions);
        this.settingsObject.set.y(y, this.settingsConditions);
    }
    // Testing TODO: remove this
    async setEdit(edit) {
        const LM = await this.request({ type: locationManager_type_1.LocationManagerID });
        await LM.setEditMode(edit);
        LM.close();
    }
    async saveSettings() {
        core_2.SettingsManager.saveAll();
    }
}
exports.default = WindowModule;
class WindowView extends core_2.createModuleView(WindowModule) {
    /**@override */
    componentWillMount() {
        super.componentWillMount();
        //TODO: remove test methids
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
    renderHeader() {
        return (React_1.React.createElement(core_1.Grid, { container: true, direction: "row-reverse" },
            React_1.React.createElement(core_1.Grid, { item: true },
                React_1.React.createElement(core_1.Button, null,
                    React_1.React.createElement(icons_1.Close, null))),
            React_1.React.createElement(core_1.Grid, { item: true }, this.state.windowName)));
    }
    /**@override */
    renderView() {
        return (React_1.React.createElement(core_1.Box, { display: "flex", flexDirection: "column", css: { width: "100%", height: "100%" } },
            React_1.React.createElement(core_1.Box, { display: "flex" }, this.renderHeader()),
            React_1.React.createElement(core_1.Box, { flex: 1, css: { position: "relative" } }, this.state.childLocationAncestor)));
    }
}
exports.WindowView = WindowView;
WindowModule.setViewClass(WindowView);
//# sourceMappingURL=window.js.map