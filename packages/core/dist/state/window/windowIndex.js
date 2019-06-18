var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_dom_1 = __importDefault(require("react-dom"));
const electron_1 = require("electron");
const viewManager_1 = require("./viewManager");
const ipcRenderer_1 = require("../../communication/ipcRenderer");
const moduleID_1 = require("../../module/moduleID");
// Get the root element to put the contents in
const rootElement = document.getElementsByClassName("root").item(0);
// Listen for the main module to be rendered
ipcRenderer_1.IpcRenderer.on("WindowIndex.setRoot", (moduleID) => {
    // Get the element from the path
    const element = viewManager_1.ViewManager.createModuleView(moduleID);
    // Render this element
    react_dom_1.default.render(element, rootElement);
});
// Listen for the assignment of a view not found module
ipcRenderer_1.IpcRenderer.on("WindowIndex.setViewNotFound", (moduleID) => {
    viewManager_1.ViewManager.setViewNotFoundID(new moduleID_1.ModuleID(moduleID));
});
// Get a reference to the window to obtain this window's ID
const currentWindow = electron_1.remote.getCurrentWindow();
// @ts-ignore;
window.windowID = currentWindow.customID;
// Indicate that all js code has finished loading
ipcRenderer_1.IpcRenderer.send(`WindowManager.loaded:${windowID}`);
//# sourceMappingURL=windowIndex.js.map