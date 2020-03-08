import {ModuleDetails, Package} from "@adjust/core/types";
import {SettingProperty} from "@adjust/core/dist/storage/settings/settingsMetaData/settingProperty";

/**
 * Data to represent a module in the index
 */
export type ISettingsIndexModule = {
    type: "module";
    path: string;
    package: Package;
} & ModuleDetails;
