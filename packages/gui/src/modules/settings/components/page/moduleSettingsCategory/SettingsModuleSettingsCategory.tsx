import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {
    SettingsModuleSettingsCategory,
    SettingsModuleSettingsCategoryType,
} from "./SettingsModuleSettingsCategory.type";

const SettingsModuleSettingsCategoryConfig = createConfig({
    state: {},
    settings: {},
    type: SettingsModuleSettingsCategoryType,
});

export class SettingsModuleSettingsCategoryModule
    extends createModule(SettingsModuleSettingsCategoryConfig)
    implements SettingsModuleSettingsCategory {}
export default SettingsModuleSettingsCategoryModule;

export class SettingsModuleSettingsCategoryView extends createModuleView(
    SettingsModuleSettingsCategoryModule
) {}
