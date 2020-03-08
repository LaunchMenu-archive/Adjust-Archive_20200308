Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const React_1 = require("../../../../../React");
const core_1 = require("@adjust/core");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const SettingsStringInputConfig = moduleClassCreator_1.createConfig({
    state: { value: "" },
    settings: {},
    type: core_1.SettingStringType,
});
class SettingsStringInputModule extends moduleClassCreator_1.createModule(SettingsStringInputConfig) {
    /** @override */
    async setValue(value) {
        // Updates the value
        this.changeState({ value });
    }
    /**
     * Sends the new value to this module's parent
     */
    updateValue() {
        this.getParent().setValue(this.state.value);
    }
    /** @override */
    async setConstraint(constraint) { }
}
exports.SettingsStringInputModule = SettingsStringInputModule;
exports.default = SettingsStringInputModule;
class SettingsModuleSettingsView extends moduleViewClassCreator_1.createModuleView(SettingsStringInputModule) {
    /** @override */
    renderView() {
        return (React_1.React.createElement(office_ui_fabric_react_1.TextField, { label: "Standard", value: this.state.value, onChange: (t, value) => this.module.setValue(value), onBlur: () => this.module.updateValue() }));
    }
}
exports.SettingsModuleSettingsView = SettingsModuleSettingsView;
//# sourceMappingURL=SettingStringInput.js.map