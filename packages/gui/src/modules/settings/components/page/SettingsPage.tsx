import {createConfig, createModule} from "../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../module/moduleViewClassCreator";
import {SettingsPage, SettingsPageType} from "./SettingsPage.type";

const SettingsPageConfig = createConfig({
    state: {},
    settings: {},
    type: SettingsPageType,
});

export class SettingsPageModule extends createModule(SettingsPageConfig)
    implements SettingsPage {}
export default SettingsPageModule;

export class SettingsPageView extends createModuleView(SettingsPageModule) {}
