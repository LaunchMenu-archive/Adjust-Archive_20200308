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
export * from "./module/moduleViewWrapper";
export * from "./module/moduleViewClassCreator";
export * from "./module/moduleProxy";
export * from "./module/remoteModuleProxy";

// MVC classes
export * from "./window/windowManager";
import OrReact from "react";
export const React = OrReact;

// Utils
export * from "./utils/isMain";
export * from "./utils/extendedObject";
export * from "./utils/UUID";
export * from "./utils/semver";
export * from "./utils/async/AsyncMutualExcluder";
export * from "./utils/async/AsyncSequencer";
export * from "./utils/packageRetriever";
export * from "./storage/data";

// Communication
export * from "./communication/ipcMain";
export * from "./communication/ipcRenderer";

// Settings class
export * from "./storage/settings/settingsManager";
export * from "./storage/settings/settingsDataID";
export * from "./storage/settings/settingsFile";
export * from "./storage/settings/settings";
export * from "./storage/settings/utils/settingsFormatters";
export * from "./storage/settings/settingsConditions/types/functionSettingsConditions";
export * from "./storage/settings/settingsConditions/types/dataSettingsConditions";
export * from "./storage/settings/settingsConditions/abstractSettingsConditions";

export * from "./storage/settings/settingInputTypes/SettingJson.type";
export * from "./storage/settings/settingInputTypes/SettingNumber.type";
export * from "./storage/settings/settingInputTypes/SettingBoolean.type";
export * from "./storage/settings/settingInputTypes/SettingString.type";
export * from "./storage/settings/settingInputTypes/SettingColor.type";

// Modules
export * from "./modules/contextProvider";
export * from "./modules/contextProvider.type";
export * from "./modules/viewNotFound";
export * from "./modules/viewNotFound.type";
