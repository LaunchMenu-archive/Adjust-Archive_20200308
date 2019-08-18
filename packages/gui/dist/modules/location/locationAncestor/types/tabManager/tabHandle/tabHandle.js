Object.defineProperty(exports, "__esModule", { value: true });
const tabHandle_type_1 = require("./tabHandle.type");
const moduleClassCreator_1 = require("../../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../../module/moduleViewClassCreator");
const React_1 = require("../../../../../../React");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
exports.tabHandleConfig = {
    initialState: {
        selected: false,
        name: "",
    },
    settings: {},
    type: tabHandle_type_1.TabHandleType,
};
class TabHandleModule extends moduleClassCreator_1.createModule(exports.tabHandleConfig) {
    /** @override*/
    async setName(name) {
        this.setState({ name });
    }
    /** @override*/
    async setSelected(selected) {
        this.setState({ selected });
    }
    /** @override*/
    async remove() {
        // No settings that require disposal are saved by the module
    }
    /**
     * Selects this tab in the tabs manager
     */
    async select() {
        this.getParent().selectTab(this.getData().ID);
    }
}
exports.TabHandleModule = TabHandleModule;
exports.default = TabHandleModule;
class TabHandleView extends moduleViewClassCreator_1.createModuleView(TabHandleModule) {
    /** @override */
    renderView() {
        return (React_1.React.createElement(office_ui_fabric_react_1.Pivot, { selectedKey: (this.state.selected ? "0" : null), headersOnly: true, onLinkClick: () => this.module.select(), css: { display: "inline-block" } },
            React_1.React.createElement(office_ui_fabric_react_1.PivotItem, { headerText: this.state.name, itemKey: "0" })));
    }
}
exports.TabHandleView = TabHandleView;
//# sourceMappingURL=tabHandle.js.map