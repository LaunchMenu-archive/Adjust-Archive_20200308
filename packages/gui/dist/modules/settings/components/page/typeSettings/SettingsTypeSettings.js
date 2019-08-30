Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const SettingsTypeSettings_type_1 = require("./SettingsTypeSettings.type");
const SettingsTypeSettingsConfig = moduleClassCreator_1.createConfig({
    state: {},
    settings: {},
    type: SettingsTypeSettings_type_1.SettingsTypeSettingsType,
});
class SettingsTypeSettingsModule extends moduleClassCreator_1.createModule(SettingsTypeSettingsConfig) {
}
exports.SettingsTypeSettingsModule = SettingsTypeSettingsModule;
exports.default = SettingsTypeSettingsModule;
class SettingsTypeSettingsView extends moduleViewClassCreator_1.createModuleView(SettingsTypeSettingsModule) {
}
exports.SettingsTypeSettingsView = SettingsTypeSettingsView;
//# sourceMappingURL=SettingsTypeSettings.js.map