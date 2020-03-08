Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const SettingsModuleSettings_type_1 = require("./SettingsModuleSettings.type");
const React_1 = require("../../../../../React");
const core_1 = require("@adjust/core");
const registry_1 = require("../../../../../registry/registry");
const settingsSetProperties_1 = require("@adjust/core/dist/storage/settings/settingsMetaData/settingsSetProperties");
const Box_1 = require("../../../../../components/Box");
const SettingsModuleSettingsConfig = moduleClassCreator_1.createConfig({
    state: {
        conditions: [],
        settings: {},
        loadingSettings: false,
    },
    settings: {},
    type: SettingsModuleSettings_type_1.SettingsModuleSettingsType,
});
class SettingsModuleSettingsModule extends moduleClassCreator_1.createModule(SettingsModuleSettingsConfig) {
    /** @override */
    async onInit() {
        const moduleClass = await registry_1.Registry.getModuleClass(this.getData().path);
        this.settingFile = await moduleClass.getSettingsFile();
        this.changeState({
            conditions: this.settingFile
                .getAllSettings()
                .map(value => ({ name: value.condition.getName(), id: value.ID })),
        });
        this.selectSettingsSet(0);
        // Open window as a test
        core_1.WindowManager.openWindow("orange", this.getID());
    }
    /**
     * Selects the settings set to be displayed on the screen
     * @param conditions The name or index of the conditions for the set to select
     */
    selectSettingsSet(conditions) {
        // Find the conditions object that was selected
        const conditionData = this.state.conditions.find(c => c.id === conditions || c.name === conditions);
        if (conditionData) {
            const condition = this.settingFile.getCondition(conditionData.id);
            // Dispose the old properties object if present
            if (this.selectedSettingsProperties)
                this.selectedSettingsProperties.destroy();
            // Create the new properties object
            this.selectedSettingsProperties = new settingsSetProperties_1.SettingsSetProperties(this.settingFile, condition);
            this.setupPropertiesSetListers(this.selectedSettingsProperties);
        }
    }
    /**
     * Adds the properties to the state and registers its listeners
     * @param properties The properties to store
     */
    async setupPropertiesSetListers(properties) {
        this.changeState({
            settings: { [core_1.ExtendedObject.overwrite]: true },
            loadingSettings: true,
        });
        const map = async (props, path) => core_1.ExtendedObject.fromEntries((await Promise.all(core_1.ExtendedObject.entries(props).map(async ([key, value]) => {
            const p = (path.length == 0 ? "" : path + ".") + key;
            if (key == "sectionConfig") {
                return [key, await this.setupSectionProperties(value, p)];
            }
            else {
                if ("default" in value) {
                    return [
                        key,
                        await this.setupSettingProperties(value, p),
                    ];
                }
                else {
                    return [key, await map(value, p)];
                }
            }
        }))));
        this.changeState({
            settings: await map(properties.getProperties(), ""),
            loadingSettings: false,
        });
    }
    /**
     * Setup properties of a section
     * @param config The section config
     * @param path The path to the section config
     */
    setupSectionProperties(config, path) {
        return {
            path,
            name: this.setupProperty(config.name(), `${path}.name`),
            description: this.setupProperty(config.description(), `${path}.description`),
            help: this.setupProperty(config.help(), `${path}.help`),
            helpLink: this.setupProperty(config.helpLink(), `${path}.helpLink`),
        };
    }
    /**
     * Setup properties of a setting
     * @param setting The setting object
     * @param path The path to the setting
     */
    async setupSettingProperties(setting, path) {
        const settingModule = await this.request({ type: setting.type });
        if (settingModule)
            await settingModule.setConstraint(setting.constraints);
        return {
            path,
            default: true,
            valueModule: settingModule,
            name: this.setupProperty(setting.name(), `${path}.name`),
            description: this.setupProperty(setting.description(), `${path}.description`),
            help: this.setupProperty(setting.help(), `${path}.help`),
            helpLink: this.setupProperty(setting.helpLink(), `${path}.helpLink`),
            hidden: this.setupProperty(setting.hidden(), `${path}.hidden`),
            advanced: this.setupProperty(setting.advanced(), `${path}.advanced`),
            enabled: this.setupProperty(setting.enabled(), `${path}.enabled`),
            searchExcluded: this.setupProperty(setting.searchExcluded(), `${path}.searchExcluded`),
            tags: this.setupProperty(setting.tags(), `${path}.tags`),
        };
    }
    /**
     * Sets up a property listener
     * @param property The property
     * @param path The path of the property
     */
    setupProperty(property, path) {
        property.on("change", value => {
            this.changeState(core_1.ExtendedObject.translatePathToObject(`settings.${path}`, value));
        });
        return property.getValue();
    }
}
exports.SettingsModuleSettingsModule = SettingsModuleSettingsModule;
exports.default = SettingsModuleSettingsModule;
class SettingsModuleSettingsView extends moduleViewClassCreator_1.createModuleView(SettingsModuleSettingsModule) {
    /**
     * Renders a given setting
     * @param setting The setting to render
     */
    renderSetting(setting) {
        return React_1.React.createElement(Box_1.Box, { key: setting.path }, setting.name);
    }
    /**
     * Renders a sefic section
     * @param section The section to render
     */
    renderSection(section) {
        const children = Object.entries(section).map(([key, value]) => {
            if (typeof value === "object" && value !== null && key != "sectionConfig")
                if ("default" in value) {
                    return this.renderSetting(value);
                }
                else {
                    return this.renderSection(value);
                }
        });
        const config = section.sectionConfig;
        return (React_1.React.createElement(Box_1.Box, { key: config.path },
            React_1.React.createElement(Box_1.Box, null, config.name),
            React_1.React.createElement(Box_1.Box, { paddingLeft: "s" }, children)));
    }
    /** @override */
    renderView() {
        console.log(this.state);
        if (this.state.loadingSettings)
            return React_1.React.createElement("div", null, "hoi");
        return this.renderSection(this.state.settings);
    }
}
exports.SettingsModuleSettingsView = SettingsModuleSettingsView;
//# sourceMappingURL=SettingsModuleSettings.js.map