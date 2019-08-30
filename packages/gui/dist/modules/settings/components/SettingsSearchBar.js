Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../module/moduleViewClassCreator");
const SettingsSearchBar_type_1 = require("./SettingsSearchBar.type");
const SettingsSearchBarConfig = moduleClassCreator_1.createConfig({
    state: {},
    settings: {},
    type: SettingsSearchBar_type_1.SettingsSearchBarType,
});
class SettingsSearchBarModule extends moduleClassCreator_1.createModule(SettingsSearchBarConfig) {
}
exports.SettingsSearchBarModule = SettingsSearchBarModule;
exports.default = SettingsSearchBarModule;
class SettingsSearchBarView extends moduleViewClassCreator_1.createModuleView(SettingsSearchBarModule) {
}
exports.SettingsSearchBarView = SettingsSearchBarView;
//# sourceMappingURL=SettingsSearchBar.js.map