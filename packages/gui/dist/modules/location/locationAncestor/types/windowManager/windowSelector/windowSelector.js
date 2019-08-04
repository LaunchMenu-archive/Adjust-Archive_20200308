var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const windowSelector_type_1 = require("./windowSelector.type");
const core_2 = require("@adjust/core");
const moduleClassCreator_1 = require("../../../../../../module/moduleClassCreator");
const React_1 = require("../../../../../../React");
const locationAncestor_type_1 = require("../../../locationAncestor.type");
const inputPrompt_type_1 = require("../../../../../prompts/inputPrompt.type");
const window_type_1 = require("../window/window.type");
const locationAncestor_1 = __importDefault(require("../../../locationAncestor"));
const sizes = {
    barHeight: 40,
    windowHeight: 500,
};
exports.config = {
    initialState: {
        closedWindows: {},
        windowModule: null,
    },
    settings: {},
    type: windowSelector_type_1.WindowSelectorID,
};
class WindowSelectorModule extends moduleClassCreator_1.createModule(exports.config, locationAncestor_1.default) {
    constructor() {
        super(...arguments);
        // The name of the window
        this.windowID = "#windowSelector";
    }
    // Window management
    /**
     * Gets the window that's used for this selector, opens it if absent
     * @returns The opened or retrieved window
     */
    async getWindow() {
        if (this.window)
            return this.window;
        return (this.window = core_2.WindowManager.openWindow(this.windowID, this.getID(), {
            useContentSize: true,
            height: sizes.barHeight,
        }));
    }
    /**
     * Closes the window if it had been opened already
     */
    async closeWindow() {
        // Check if the window has been opened
        if (this.window) {
            // Close the window
            core_2.WindowManager.closeWindow(this.windowID);
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
    /** @override fowards the data to the selector's parent */
    async changeWindowName(name, windowID) {
        await this.parent.changeWindowName(name, windowID);
    }
    /** @override fowards the data to the selector's parent */
    async setWindowVisibility(visible, windowID) {
        await this.parent.setWindowVisibility(visible, windowID);
    }
    // Interface methods
    /** @override */
    async setWindows(closed, opened) {
        await this.setState({
            // @ts-ignore
            closedWindows: Object.assign({}, closed, { 
                // Make sure to remove previous window data
                [core_2.ExtendedObject.overwrite]: true }),
        });
    }
    /** @override */
    async setEnabled(enabled) {
        const window = await this.getWindow();
        if (enabled)
            window.show();
        else {
            window.hide();
            this.showWindow(null);
        }
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
        const ID = core_2.UUID.generateShort();
        const path = [ID];
        currentData.locations.forEach(loc => {
            loc.hints = {
                path,
            };
        });
        // Update the data
        const movePromise = parent.updateLocationsMoveData(currentData);
        // Allow the user to rename the window
        const renamePromise = new Promise(async (res) => {
            // Obtain the name prompt
            const namePrompt = await this.request({ type: inputPrompt_type_1.InputPromptID, openView: true });
            // Prompt the user for a name
            const name = await namePrompt.prompt("string", {
                title: "Window Name",
                description: "Please enter the name that the window should have",
                maxLength: 40,
                defaultValue: ID,
            });
            // If a name was passed, set it
            if (name)
                await this.parent.changeWindowName(name, ID);
            // Close the prompt
            await namePrompt.close();
        });
        // Await the promises
        await Promise.all([movePromise, renamePromise]);
    }
    /**
     * Shows the window contents of the window with the given ID
     * @param windowID The ID of the window to show, or undefined to hide
     */
    async showWindow(windowID) {
        // Close the current window
        if (this.state.windowModule) {
            const windowModule = await this.state.windowModule;
            // Remove the window
            this.setState({ windowModule: undefined });
            // Close the window
            windowModule.close();
            // Update the window size
            const window = await this.getWindow();
            window.setContentSize(window.getContentSize()[0], sizes.barHeight);
        }
        // Open the new window
        if (windowID) {
            // Obtain the new window
            this.setState({
                windowModule: this.request({
                    type: window_type_1.WindowID,
                    data: {
                        ID: windowID,
                        path: [...this.getData().path, windowID],
                        previewMode: true,
                    },
                }),
            });
            const windowModule = await this.state.windowModule;
            // Set the window to edit mode and drop mode
            await windowModule.setEditMode(true);
            await windowModule.setDropMode(true);
            // If the window module is still visible, expand the window size
            if (this.state.windowModule) {
                const window = await this.getWindow();
                window.setContentSize(window.getContentSize()[0], sizes.windowHeight);
            }
        }
    }
}
exports.default = WindowSelectorModule;
class WindowSelectorView extends core_2.createModuleView(WindowSelectorModule) {
    /** @override */
    componentWillMount() {
        super.componentWillMount();
        // Setup event listeners to trigger onDragLeave,
        // inspiration: https://www.tutorialspoint.com/How-to-detect-the-dragleave-event-in-Firefox-when-draggingoutside-the-window-with-HTML
        const collection = new Set();
        window.addEventListener("dragenter", ev => {
            collection.add(ev.target);
        });
        window.addEventListener("dragleave", ev => {
            collection.delete(ev.target);
            if (collection.size === 0)
                this.onDragLeave();
        });
        window.addEventListener("drop", ev => {
            collection.delete(ev.target);
            if (collection.size === 0)
                this.onDragLeave();
        });
    }
    /**
     * Gets called when data is dragged to outside this window
     */
    onDragLeave() {
        this.module.showWindow(null);
    }
    // Drag and drop methods
    /**
     * Handles showing the window for this name
     * @param windowID The ID of the window to show
     * @param event The DOM event of the user dragging data
     */
    onDragEnterWindow(windowID, event) {
        event.preventDefault(); // Allows for dropping
        this.module.showWindow(windowID);
    }
    /**
     * Allows for a drop here
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
    /**
     * Renders the selected window
     */
    renderWindow() {
        return this.state.windowModule;
    }
    /**
     * Renders the window names
     */
    renderWindowNames() {
        return Object.entries(this.state.closedWindows).map(([ID, data]) => {
            return (React_1.React.createElement(core_1.Box, { onDragEnter: e => this.onDragEnterWindow(ID, e), bgcolor: "orange", m: 1, key: ID }, data.name));
        });
    }
    /**@override */
    renderView() {
        return (React_1.React.createElement(core_1.Box, { display: "flex", flexDirection: "column", css: { width: "100%", height: "100%" } },
            React_1.React.createElement(core_1.Box, { className: "selector", display: "flex", flexDirection: "row", css: { width: "100%", height: sizes.barHeight } },
                this.renderWindowNames(),
                React_1.React.createElement(core_1.Box, { bgcolor: "orange", m: 1, onDragOver: e => this.onDragOver(e), onDrop: e => this.onDropNew(e) }, "New window")),
            React_1.React.createElement(core_1.Box, { className: "window", flexGrow: 1, css: { position: "relative" } }, this.renderWindow())));
    }
}
exports.WindowSelectorView = WindowSelectorView;
//# sourceMappingURL=windowSelector.js.map