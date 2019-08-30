import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {
    SettingsModuleSetting,
    SettingsModuleSettingType,
} from "./SettingsModuleSetting.type";

const SettingsModuleSettingConfig = createConfig({
    state: {},
    settings: {},
    type: SettingsModuleSettingType,
});

export class SettingsModuleSettingModule extends createModule(SettingsModuleSettingConfig)
    implements SettingsModuleSetting {}
export default SettingsModuleSettingModule;

export class SettingsModuleSettingView extends createModuleView(
    SettingsModuleSettingModule
) {}
