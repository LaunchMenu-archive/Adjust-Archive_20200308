Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const windowSelector_type_1 = require("./windowSelector.type");
const core_2 = require("@adjust/core");
const moduleClassCreator_1 = require("../../../module/moduleClassCreator");
const React_1 = require("../../../React");
const locationAncestor_type_1 = require("../locationAncestor/locationAncestor.type");
exports.config = {
    initialState: {},
    settings: {},
    type: windowSelector_type_1.WindowSelectorID,
};
class WindowSelectorModule extends moduleClassCreator_1.createModule(exports.config) {
    constructor() {
        super(...arguments);
        // The name of the window
        this.windowName = "#windowSelector";
    }
    // Window management
    /**
     * Gets the window that's used for this selector, opens it if absent
     * @returns The opened or retrieved window
     */
    async getWindow() {
        if (this.window)
            return this.window;
        return (this.window = core_2.WindowManager.openWindow(this.windowName, this.getID()));
    }
    /**
     * Closes the window if it had been opened already
     */
    async closeWindow() {
        // Check if the window has been opened
        if (this.window) {
            // Close the window
            core_2.WindowManager.closeWindow(this.windowName);
            this.window = null;
        }
    }
    /** @override */
    async onInit(fromReload) {
        const window = await this.getWindow();
        window.hide();
    }
    /** @override */
    async onStop() {
        await this.closeWindow();
    }
    // Interface methods
    /** @override */
    async setWindowNames(windows) { }
    /** @override */
    async setEnabled(enabled) {
        const window = await this.getWindow();
        if (enabled)
            window.show();
        else
            window.hide();
    }
    // Drop methods
    /**
     * Handles dropping of location(s) on the new window button
     */
    async onDropNew() {
        // Retrieve the move data
        const parent = this.getParent();
        const currentData = await parent.getLocationsMoveData();
        // Set all hints to a path pointing at this location
        const path = [Math.floor(Math.random() * Math.pow(10, 10)) + ""];
        currentData.locations.forEach(loc => {
            loc.hints = {
                path,
            };
        });
        // Update the data
        await parent.updateLocationsMoveData(currentData);
    }
}
exports.default = WindowSelectorModule;
class WindowSelectorView extends core_2.createModuleView(WindowSelectorModule) {
    // Drag and drop methods
    /**
     * Checks whether this is valid data for a drop
     * @param event The DOM event of the user dragging data
     */
    onDragOver(event) {
        event.preventDefault(); // Allows for dropping
    }
    /**
     * Handles the dropping of location(s) on the new window button
     * @param event The DOM event of the user dragging data
     */
    onDropNew(event) {
        event.preventDefault(); // Allows for dropping
        const data = event.dataTransfer.getData("text");
        if (data == locationAncestor_type_1.dragAndDropName) {
            this.module.onDropNew();
        }
    }
    // Rendering methods
    /**@override */
    renderView() {
        return (React_1.React.createElement(core_1.Box, { display: "flex", flexDirection: "row", css: { width: "100%", height: "100%" } },
            React_1.React.createElement(core_1.Box, { display: "flex", onDragOver: e => this.onDragOver(e), onDrop: e => this.onDropNew(e) }, "New window")));
    }
}
exports.WindowSelectorView = WindowSelectorView;
//# sourceMappingURL=windowSelector.js.map