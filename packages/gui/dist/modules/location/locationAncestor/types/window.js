var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const core_2 = require("@adjust/core");
const locationAncestor_type_1 = require("../locationAncestor.type");
const moduleClassCreator_1 = require("../../../../module/moduleClassCreator");
const locationAncestor_1 = __importDefault(require("../locationAncestor"));
const React_1 = require("../../../../React");
const locationManager_type_1 = require("../../locationManager.type");
exports.config = {
    initialState: {
        childLocationAncestor: null,
    },
    settings: {},
    type: locationAncestor_type_1.LocationAncestorID,
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
        if (this.window)
            return this.window;
        return (this.window = core_2.WindowManager.openWindow(this.getData().ID, this.getID()));
    }
    /**
     * Closes the window if it had been opened already
     */
    async closeWindow() {
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
    async createLocation(location) {
        const child = await this.getChild();
        return child.createLocation(location);
    }
    /** @override */
    async removeLocation(locationPath) {
        const child = await this.getChild();
        return child.removeLocation(locationPath);
    }
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
    // Module management
    /** @override */
    async openModule(module, location) {
        // Open the actual window
        this.openWindow();
        // Obtain the child ancestor
        const child = await this.getChild();
        // Forward opening the module to the child
        return child.openModule(module, location);
    }
    /** @override */
    async closeModule(module, location) {
        return false;
    }
    /** @override */
    async showModule(module, location) {
        return false;
    }
    // Edit magement
    /** @override */
    async setEditMode(edit) {
        if (this.state.childLocationAncestor) {
            const child = await this.getChild();
            child.setEditMode(edit);
        }
    }
    /** @override */
    async setDropMode(drop) {
        if (this.state.childLocationAncestor) {
            const child = await this.getChild();
            child.setDropMode(drop);
        }
    }
    // Testing TODO: remove this
    async setEdit() {
        const LM = await this.request({ type: locationManager_type_1.LocationManagerID });
        LM.setEditMode(true);
    }
}
exports.default = WindowModule;
class WindowView extends core_2.createModuleView(WindowModule) {
    /**@override */
    componentWillMount() {
        super.componentWillMount();
        document.addEventListener("keyup", e => {
            if (e.key == "e") {
                this.module.setEdit();
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
            React_1.React.createElement(core_1.Grid, { item: true }, this.data.ID)));
    }
    /**@override */
    renderView() {
        return (React_1.React.createElement("div", null,
            this.renderHeader(),
            this.state.childLocationAncestor));
    }
}
exports.WindowView = WindowView;
WindowModule.setViewClass(WindowView);
//# sourceMappingURL=window.js.map