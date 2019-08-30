Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const SettingsIndexPackage_type_1 = require("./SettingsIndexPackage.type");
const React_1 = require("../../../../../React");
const Box_1 = require("../../../../../components/Box");
const SettingsIndexCategories_type_1 = require("../category/SettingsIndexCategories.type");
const SettingsIndexPackageConfig = moduleClassCreator_1.createConfig({
    state: {
        categories: null,
    },
    settings: {},
    type: SettingsIndexPackage_type_1.SettingsIndexPackageType,
});
class SettingsIndexPackageModule extends moduleClassCreator_1.createModule(SettingsIndexPackageConfig) {
    async onInit(fromReload) {
        this.changeState({
            categories: await Promise.all(Object.values(this.getData().children).map(child => this.request({ type: SettingsIndexCategories_type_1.SettingsIndexCategoriesType, data: child }))),
        });
    }
}
exports.SettingsIndexPackageModule = SettingsIndexPackageModule;
exports.default = SettingsIndexPackageModule;
class SettingsIndexPackageView extends moduleViewClassCreator_1.createModuleView(SettingsIndexPackageModule) {
    /** @override */
    renderView() {
        return (React_1.React.createElement(Box_1.Box, { margin: "xs", className: "package" },
            React_1.React.createElement(Box_1.Box, { display: "flex", flexDirection: "row", background: "neutralLight" },
                React_1.React.createElement(Box_1.Box, { width: 40, height: 40, background: "themeSecondary", marginRight: "xs" }),
                React_1.React.createElement(Box_1.Box, { flexGrow: 1 },
                    React_1.React.createElement(Box_1.Box, { className: "name" }, this.data.name),
                    React_1.React.createElement(Box_1.Box, { className: "description" }, this.data.description))),
            this.state.categories));
    }
}
exports.SettingsIndexPackageView = SettingsIndexPackageView;
//# sourceMappingURL=SettingsIndexPackage.js.map