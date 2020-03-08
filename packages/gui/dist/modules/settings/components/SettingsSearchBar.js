Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../module/moduleClassCreator");
const React_1 = require("../../../React");
const moduleViewClassCreator_1 = require("../../../module/moduleViewClassCreator");
const SettingsSearchBar_type_1 = require("./SettingsSearchBar.type");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const SettingsSearchBarConfig = moduleClassCreator_1.createConfig({
    state: { search: "" },
    settings: {},
    type: SettingsSearchBar_type_1.SettingsSearchBarType,
});
class SettingsSearchBarModule extends moduleClassCreator_1.createModule(SettingsSearchBarConfig) {
    /**
     * Updates the current search value, and informs the parent after some debounce delay
     * @param search The new search value
     */
    setSearch(search) {
        this.changeState({ search });
    }
    /**
     * Sends the new search value to the parent
     */
    updateSearch() {
        this.getParent().updateSearch(this.state.search);
    }
}
exports.SettingsSearchBarModule = SettingsSearchBarModule;
exports.default = SettingsSearchBarModule;
class SettingsSearchBarView extends moduleViewClassCreator_1.createModuleView(SettingsSearchBarModule) {
    renderView() {
        return (React_1.React.createElement(office_ui_fabric_react_1.SearchBox, { placeholder: "Search", value: this.state.search, onChange: e => this.module.setSearch(e.target.value), onSearch: () => this.module.updateSearch(), onBlur: () => this.module.updateSearch(), underlined: true, iconProps: { iconName: "Search" } }));
    }
}
exports.SettingsSearchBarView = SettingsSearchBarView;
//# sourceMappingURL=SettingsSearchBar.js.map