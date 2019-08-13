import ReactDOM from "react-dom";
import {remote} from "electron";
import {ViewManager} from "./viewManager";
import {IpcRenderer} from "../communication/ipcRenderer";
import {ModuleID} from "../module/moduleID";
import {Registry} from "../registry/registry";

// Get the root element to put the contents in
const rootElement = document.getElementsByClassName("root").item(0);

// Listen for the main module to be rendered
IpcRenderer.on("WindowIndex.setRoot", (moduleID: string) => {
    // Get the element from the path
    const element = ViewManager.createModuleView(moduleID);

    // Render this element
    ReactDOM.render(element, rootElement);
});

// Listen for the assignment of a view not found module
IpcRenderer.on("WindowIndex.setViewNotFound", (moduleID: string) => {
    ViewManager.setViewNotFoundID(new ModuleID(moduleID));
});

// Listen for the assignment of a window ID
IpcRenderer.once("WindowIndex.setWindowID", (windowID: string) => {
    // @ts-ignore;
    window.windowID = windowID;
});

// Listen whether a module is requested to be loaded (in order to speed up loading later)
IpcRenderer.on("WindowIndex.preloadModule", (moduelePath: string) => {
    Registry.getModuleClass(moduelePath);
});

// Get a reference to the window to obtain this window's electron ID
const currentWindow = remote.getCurrentWindow();

// Indicate that all js code has finished loading
IpcRenderer.send(`WindowManager.loaded:${currentWindow.id}`);
