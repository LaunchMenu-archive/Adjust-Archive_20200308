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
__export(require("./module/moduleViewClassCreator"));
__export(require("./module/moduleProxy"));
__export(require("./module/remoteModuleProxy"));
// MVC classes
__export(require("./state/window/windowManager"));
const react_1 = __importDefault(require("react"));
exports.React = react_1.default;
// Utils
__export(require("./utils/isMain"));
__export(require("./utils/extendedObject"));
// Communication
__export(require("./communication/ipcMain"));
__export(require("./communication/ipcRenderer"));
//# sourceMappingURL=index.js.map