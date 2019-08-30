import {createConfig, createModule} from "../../../module/moduleClassCreator";
import {createModuleView} from "../../../module/moduleViewClassCreator";
import {SettingsSearchBar, SettingsSearchBarType} from "./SettingsSearchBar.type";

const SettingsSearchBarConfig = createConfig({
    state: {},
    settings: {},
    type: SettingsSearchBarType,
});

export class SettingsSearchBarModule extends createModule(SettingsSearchBarConfig)
    implements SettingsSearchBar {}
export default SettingsSearchBarModule;

export class SettingsSearchBarView extends createModuleView(SettingsSearchBarModule) {}
