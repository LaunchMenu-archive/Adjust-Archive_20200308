// Registry classes
export * from "./registry/registry";
export * from "./registry/moduleProviders/instanceModuleProvider";
export * from "./registry/moduleProviders/classModuleProvider";

// State classes
export * from "./state/programState";

// Module classes
export * from "./module/moduleID";
export * from "./module/module";
export * from "./module/moduleClassCreator";
export * from "./module/moduleView";
export * from "./module/moduleViewClassCreator";
export * from "./module/moduleProxy";
export * from "./module/remoteModuleProxy";

// MVC classes
export * from "./state/window/windowManager";
import OrReact from "react";
export const React = OrReact;

// Utils
export * from "./utils/isMain";

// Communication
export * from "./communication/ipcMain";
export * from "./communication/ipcRenderer";
