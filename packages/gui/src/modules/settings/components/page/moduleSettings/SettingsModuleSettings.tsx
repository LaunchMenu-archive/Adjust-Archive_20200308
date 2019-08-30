import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {
    SettingsModuleSettings,
    SettingsModuleSettingsType,
} from "./SettingsModuleSettings.type";

const SettingsModuleSettingsConfig = createConfig({
    state: {},
    settings: {},
    type: SettingsModuleSettingsType,
});

export class SettingsModuleSettingsModule
    extends createModule(SettingsModuleSettingsConfig)
    implements SettingsModuleSettings {}
export default SettingsModuleSettingsModule;

export class SettingsModuleSettingsView extends createModuleView(
    SettingsModuleSettingsModule
) {}
