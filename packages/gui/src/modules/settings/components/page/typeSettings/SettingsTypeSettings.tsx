import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {
    SettingsTypeSettings,
    SettingsTypeSettingsType,
} from "./SettingsTypeSettings.type";

const SettingsTypeSettingsConfig = createConfig({
    state: {},
    settings: {},
    type: SettingsTypeSettingsType,
});

export class SettingsTypeSettingsModule extends createModule(SettingsTypeSettingsConfig)
    implements SettingsTypeSettings {}
export default SettingsTypeSettingsModule;

export class SettingsTypeSettingsView extends createModuleView(
    SettingsTypeSettingsModule
) {}
