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
    /** @override */
    onInit() {
        // Open the window when it is requested
        core_2.WindowManager.openWindow(this.getData().id, this.getID());
    }
    /** @override */
    onReloadInit() {
        // Open the window when it is requested
        core_2.WindowManager.openWindow(this.getData().id, this.getID());
    }
    /** @override */
    async openModule(module, location) {
        // If this module has no child location ancestor yet, obtain it
        if (!this.state.childLocationAncestor) {
            // Get child location ancestor
            const { locationAncestor, path } = await this.getChildLocationAncestor(location);
            // Store child location ancestor
            this.setState({
                childLocationAncestor: locationAncestor,
            });
            // Open the module in this location with the potentially newly made path
            return this.state.childLocationAncestor.openModule(module, path);
        }
        else {
            // Open the module in this location
            return this.state.childLocationAncestor.openModule(module, location);
        }
    }
    /** @override */
    async closeModule(module, location) {
        return false;
    }
}
exports.default = WindowModule;
class WindowView extends core_2.createModuleView(WindowModule) {
    /**
     * Renders the header with the window's controls
     */
    renderHeader() {
        return (React_1.React.createElement(core_1.Grid, { container: true, direction: "row-reverse" },
            React_1.React.createElement(core_1.Grid, { item: true },
                React_1.React.createElement(core_1.Button, null,
                    React_1.React.createElement(icons_1.Close, null)))));
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