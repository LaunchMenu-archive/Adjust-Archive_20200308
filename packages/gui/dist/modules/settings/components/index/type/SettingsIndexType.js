Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const SettingsIndexType_type_1 = require("./SettingsIndexType.type");
const React_1 = require("../../../../../React");
const Box_1 = require("../../../../../components/Box");
const SettingsIndexTypeConfig = moduleClassCreator_1.createConfig({
    state: {},
    settings: {},
    type: SettingsIndexType_type_1.SettingsIndexTypeType,
});
class SettingsIndexTypeModule extends moduleClassCreator_1.createModule(SettingsIndexTypeConfig) {
}
exports.SettingsIndexTypeModule = SettingsIndexTypeModule;
exports.default = SettingsIndexTypeModule;
class SettingsIndexTypeView extends moduleViewClassCreator_1.createModuleView(SettingsIndexTypeModule) {
    /** @override */
    renderView() {
        return (React_1.React.createElement(Box_1.Box, { margin: "xs", className: "package" },
            React_1.React.createElement(Box_1.Box, { display: "flex", flexDirection: "row", background: "neutralLight" },
                React_1.React.createElement(Box_1.Box, { width: 40, minWidth: 40, height: 40, background: "themeSecondary", marginRight: "xs" }),
                React_1.React.createElement(Box_1.Box, { flexGrow: 1 },
                    React_1.React.createElement(Box_1.Box, { className: "name" }, this.data.name),
                    React_1.React.createElement(Box_1.Box, { className: "description" }, this.data.description)))));
    }
}
exports.SettingsIndexTypeView = SettingsIndexTypeView;
//# sourceMappingURL=SettingsIndexType.js.map