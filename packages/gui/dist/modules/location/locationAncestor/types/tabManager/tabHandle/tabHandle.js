Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const tabHandle_type_1 = require("./tabHandle.type");
const moduleClassCreator_1 = require("../../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../../module/moduleViewClassCreator");
const React_1 = require("../../../../../../React");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const locationAncestor_type_1 = require("../../../locationAncestor.type");
const Box_1 = require("../../../../../../components/Box");
exports.tabHandleConfig = moduleClassCreator_1.createConfig({
    details: {
        name: "Tab Handle",
        description: "The handle of a tab",
    },
    state: {
        inEditMode: false,
        inDropMode: false,
        index: 0,
        selected: false,
    },
    settings: {
        name: {
            default: "John",
            type: core_1.SettingStringType,
        },
    },
    type: tabHandle_type_1.TabHandleType,
});
class TabHandleModule extends moduleClassCreator_1.createModule(exports.tabHandleConfig) {
    /** @override */
    async onInit(fromReload) {
        await super.onInit(fromReload);
        // Save data under the ID of this ancestor
        this.settingsConditions = new core_1.DataSettingsConditions({ path: this.getData().path }, 1);
    }
    /** @override*/
    async setIndex(index) {
        this.changeState({ index });
    }
    /** @override*/
    async setInitialData(data) {
        this.getSettingsObject().setInitialData({ name: data.name }, this.settingsConditions);
    }
    /** @override */
    async setEditMode(edit) {
        this.changeState({ inEditMode: edit });
    }
    /** @override */
    async setDropMode(drop) {
        this.changeState({ inDropMode: drop });
    }
    /** @override*/
    async setSelected(selected) {
        this.changeState({ selected });
    }
    /** @override*/
    async remove() {
        this.getSettingsObject().removeConditionData(this.settingsConditions);
    }
    /**
     * Selects this tab in the tabs manager
     */
    async select() {
        this.getParent().selectTab(this.getData().ID);
    }
    // Drag and drop methods
    /**
     * Starts moving the locations elsewhere
     */
    async onDragStart() {
        this.getParent().onDragStart(this.getData().ID, { name: this.settings.name });
    }
    /**
     * Moves the locations when the drag ends
     */
    async onDragEnd() {
        this.getParent().onDragEnd(this.getData().ID);
    }
}
exports.TabHandleModule = TabHandleModule;
exports.default = TabHandleModule;
class TabHandleView extends moduleViewClassCreator_1.createModuleView(TabHandleModule) {
    // Drag and drop methods
    /**
     * Starts the dragging of a location
     * @param event The DOM event that starts the dragging
     */
    onDragStart(event) {
        if (this.state.inEditMode) {
            event.dataTransfer.setData("text", locationAncestor_type_1.dragAndDropName);
            this.module.onDragStart();
        }
    }
    /**
     * Updates the locations when draging a location finishes
     * @param event The DOM event of the user dragging data
     */
    onDragEnd(event) {
        if (this.state.inEditMode)
            this.module.onDragEnd();
    }
    // Rendering methods
    renderLoader() {
        return React_1.React.createElement("span", null);
    }
    /** @override */
    renderView() {
        return (React_1.React.createElement(Box_1.Box, { display: "inline-block", onDragStart: e => this.onDragStart(e), elRef: el => {
                // Use the element's ondragend, since react's ondragend doesn't trigger once the element has unmounted
                if (el)
                    el.ondragend = e => this.onDragEnd(e);
            }, draggable: this.state.inEditMode },
            React_1.React.createElement(office_ui_fabric_react_1.Pivot, { selectedKey: (this.state.selected ? "0" : null), headersOnly: true, onLinkClick: () => this.module.select(), onDragOver: () => this.module.select(), css: { display: "inline-block" } },
                React_1.React.createElement(office_ui_fabric_react_1.PivotItem, { headerText: this.settings.name, itemKey: "0" }))));
    }
}
exports.TabHandleView = TabHandleView;
//# sourceMappingURL=tabHandle.js.map