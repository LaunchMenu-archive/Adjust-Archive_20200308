Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Check whether this process is the main process
exports.isMain = electron_1.ipcMain != null;
//# sourceMappingURL=isMain.js.map