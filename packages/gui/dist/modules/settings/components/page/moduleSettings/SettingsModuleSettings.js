Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const SettingsModuleSettings_type_1 = require("./SettingsModuleSettings.type");
const SettingsModuleSettingsConfig = moduleClassCreator_1.createConfig({
    state: {},
    settings: {},
    type: SettingsModuleSettings_type_1.SettingsModuleSettingsType,
});
class SettingsModuleSettingsModule extends moduleClassCreator_1.createModule(SettingsModuleSettingsConfig) {
}
exports.SettingsModuleSettingsModule = SettingsModuleSettingsModule;
exports.default = SettingsModuleSettingsModule;
class SettingsModuleSettingsView extends moduleViewClassCreator_1.createModuleView(SettingsModuleSettingsModule) {
}
exports.SettingsModuleSettingsView = SettingsModuleSettingsView;
//# sourceMappingURL=SettingsModuleSettings.js.map