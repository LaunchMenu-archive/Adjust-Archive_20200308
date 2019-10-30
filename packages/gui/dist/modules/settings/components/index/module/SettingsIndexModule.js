Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const SettingsIndexModule_type_1 = require("./SettingsIndexModule.type");
const React_1 = require("../../../../../React");
const Box_1 = require("../../../../../components/Box");
const SettingsIndexModuleConfig = moduleClassCreator_1.createConfig({
    state: {},
    settings: {},
    type: SettingsIndexModule_type_1.SettingsIndexModuleType,
});
class SettingsIndexModuleModule extends moduleClassCreator_1.createModule(SettingsIndexModuleConfig) {
}
exports.SettingsIndexModuleModule = SettingsIndexModuleModule;
exports.default = SettingsIndexModuleModule;
class SettingsIndexModuleView extends moduleViewClassCreator_1.createModuleView(SettingsIndexModuleModule) {
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
exports.SettingsIndexModuleView = SettingsIndexModuleView;
//# sourceMappingURL=SettingsIndexModule.js.map