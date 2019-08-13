import ReactDOM from "react-dom";
import React from "react";
import {remote} from "electron";
import {ViewManager} from "./viewManager";
import {IpcRenderer} from "../communication/ipcRenderer";
import {ModuleID} from "../module/moduleID";
import {Registry} from "../registry/registry";
import {ViewWrapper} from "../module/moduleViewWrapper";

/**
 * Rendering methods
 */
// Get the root element to put the contents in
const rootHtmlElement = document.getElementsByClassName("root").item(0);
let providerModuleView: JSX.Element;
let rootModuleView: JSX.Element;
/**
 * Renders the window contents if both the rootmodule and the providers are present
 */
function render() {
    if (!providerModuleView || !rootModuleView) return;

    // Render this element
    ReactDOM.render(
        <ViewWrapper view={providerModuleView}>{rootModuleView}</ViewWrapper>,
        rootHtmlElement
    );
}

// Listen for the assignment of the context provider
IpcRenderer.on("WindowIndex.setContextProvider", (moduleID: string) => {
    // Get the provider element from the path, and try to render
    providerModuleView = ViewManager.createModuleView(moduleID);
    render();
});

// Listen for the main module to be rendered
IpcRenderer.on("WindowIndex.setRoot", (moduleID: string) => {
    // Get the element from the path, and try to render
    rootModuleView = ViewManager.createModuleView(moduleID);
    render();
});

/**
 * Misc setup methods
 */
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

/**
 * Indicate the window has been loaded
 */
// Get a reference to the window to obtain this window's electron ID
const currentWindow = remote.getCurrentWindow();

// Indicate that all js code has finished loading
IpcRenderer.send(`WindowManager.loaded:${currentWindow.id}`);
