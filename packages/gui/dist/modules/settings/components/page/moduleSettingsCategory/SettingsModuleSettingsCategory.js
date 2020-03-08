Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const SettingsModuleSettingsCategory_type_1 = require("./SettingsModuleSettingsCategory.type");
const SettingsModuleSettingsCategoryConfig = moduleClassCreator_1.createConfig({
    state: {},
    settings: {},
    type: SettingsModuleSettingsCategory_type_1.SettingsModuleSettingsCategoryType,
});
class SettingsModuleSettingsCategoryModule extends moduleClassCreator_1.createModule(SettingsModuleSettingsCategoryConfig) {
}
exports.SettingsModuleSettingsCategoryModule = SettingsModuleSettingsCategoryModule;
exports.default = SettingsModuleSettingsCategoryModule;
class SettingsModuleSettingsCategoryView extends moduleViewClassCreator_1.createModuleView(SettingsModuleSettingsCategoryModule) {
}
exports.SettingsModuleSettingsCategoryView = SettingsModuleSettingsCategoryView;
//# sourceMappingURL=SettingsModuleSettingsCategory.js.map