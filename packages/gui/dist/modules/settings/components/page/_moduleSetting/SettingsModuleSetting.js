Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const SettingsModuleSetting_type_1 = require("./SettingsModuleSetting.type");
const SettingsModuleSettingConfig = moduleClassCreator_1.createConfig({
    state: {},
    settings: {},
    type: SettingsModuleSetting_type_1.SettingsModuleSettingType,
});
class SettingsModuleSettingModule extends moduleClassCreator_1.createModule(SettingsModuleSettingConfig) {
}
exports.SettingsModuleSettingModule = SettingsModuleSettingModule;
exports.default = SettingsModuleSettingModule;
class SettingsModuleSettingView extends moduleViewClassCreator_1.createModuleView(SettingsModuleSettingModule) {
}
exports.SettingsModuleSettingView = SettingsModuleSettingView;
//# sourceMappingURL=SettingsModuleSetting.js.map