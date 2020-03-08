Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../module/moduleViewClassCreator");
const SettingsPage_type_1 = require("./SettingsPage.type");
const SettingsPageConfig = moduleClassCreator_1.createConfig({
    state: {},
    settings: {},
    type: SettingsPage_type_1.SettingsPageType,
});
class SettingsPageModule extends moduleClassCreator_1.createModule(SettingsPageConfig) {
}
exports.SettingsPageModule = SettingsPageModule;
exports.default = SettingsPageModule;
class SettingsPageView extends moduleViewClassCreator_1.createModuleView(SettingsPageModule) {
}
exports.SettingsPageView = SettingsPageView;
//# sourceMappingURL=SettingsPage.js.map