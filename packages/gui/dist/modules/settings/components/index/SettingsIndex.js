Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../module/moduleViewClassCreator");
const SettingsIndex_type_1 = require("./SettingsIndex.type");
const SettingsIndexPackage_type_1 = require("./package/SettingsIndexPackage.type");
const React_1 = require("../../../../React");
const Box_1 = require("../../../../components/Box");
const SettingsIndexConfig = moduleClassCreator_1.createConfig({
    state: {
        types: [],
        modules: [],
    },
    settings: {},
    type: SettingsIndex_type_1.SettingsIndexType,
});
class SettingsIndexModule extends moduleClassCreator_1.createModule(SettingsIndexConfig) {
    /** @override */
    async setData(index) {
        // Dispose of the old data
        const disposalPromises = [];
        disposalPromises.push(...this.state.types.map(async (type) => (await type).close()));
        disposalPromises.push(...this.state.modules.map(async (modules) => (await modules).close()));
        // Get the new data
        this.changeState({
            types: Object.values(index.typesTree).map(async (packag) => {
                return this.request({ type: SettingsIndexPackage_type_1.SettingsIndexPackageType, data: packag });
            }),
            modules: Object.values(index.modulesTree).map(async (packag) => {
                return this.request({ type: SettingsIndexPackage_type_1.SettingsIndexPackageType, data: packag });
            }),
        });
        // Await the closing
        await Promise.all(disposalPromises);
    }
    /** @override */
    async setSearch(search) { }
}
exports.SettingsIndexModule = SettingsIndexModule;
exports.default = SettingsIndexModule;
class SettingsIndexView extends moduleViewClassCreator_1.createModuleView(SettingsIndexModule) {
    /** @override */
    renderView() {
        return (React_1.React.createElement(Box_1.Box, { className: "settingsIndex" },
            React_1.React.createElement(Box_1.Box, { className: "modules" }, this.state.modules),
            React_1.React.createElement(Box_1.Box, { className: "types", borderTopStyle: "solid", borderTop: "xs", borderTopColor: "themeDarker" }, this.state.types)));
    }
}
exports.SettingsIndexView = SettingsIndexView;
//# sourceMappingURL=SettingsIndex.js.map