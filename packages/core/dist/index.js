function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Registry classes
__export(require("./registry/registry"));
__export(require("./registry/moduleProviders/instanceModuleProvider"));
__export(require("./registry/moduleProviders/classModuleProvider"));
// State classes
__export(require("./state/programState"));
// Module classes
__export(require("./module/moduleID"));
__export(require("./module/module"));
__export(require("./module/moduleClassCreator"));
__export(require("./module/moduleView"));
__export(require("./module/moduleViewWrapper"));
__export(require("./module/moduleViewClassCreator"));
__export(require("./module/moduleProxy"));
__export(require("./module/remoteModuleProxy"));
// MVC classes
__export(require("./window/windowManager"));
const react_1 = __importDefault(require("react"));
exports.React = react_1.default;
// Utils
__export(require("./utils/isMain"));
__export(require("./utils/extendedObject"));
__export(require("./utils/UUID"));
__export(require("./utils/semver"));
__export(require("./utils/async/AsyncMutualExcluder"));
__export(require("./utils/async/AsyncSequencer"));
__export(require("./utils/packageRetriever"));
// Communication
__export(require("./communication/ipcMain"));
__export(require("./communication/ipcRenderer"));
// Settings class
__export(require("./storage/settings/settingsManager"));
__export(require("./storage/settings/settingsDataID"));
__export(require("./storage/settings/settingsFile"));
__export(require("./storage/settings/settings"));
__export(require("./storage/settings/utils/settingsFormatters"));
__export(require("./storage/settings/settingsConditions/types/functionSettingsConditions"));
__export(require("./storage/settings/settingsConditions/types/dataSettingsConditions"));
__export(require("./storage/settings/settingsConditions/abstractSettingsConditions"));
__export(require("./storage/settings/settingInputTypes/SettingJson.type"));
__export(require("./storage/settings/settingInputTypes/SettingNumber.type"));
__export(require("./storage/settings/settingInputTypes/SettingBoolean.type"));
__export(require("./storage/settings/settingInputTypes/SettingString.type"));
__export(require("./storage/settings/settingInputTypes/SettingColor.type"));
// Modules
__export(require("./modules/contextProvider"));
__export(require("./modules/contextProvider.type"));
__export(require("./modules/viewNotFound"));
__export(require("./modules/viewNotFound.type"));
//# sourceMappingURL=index.js.map