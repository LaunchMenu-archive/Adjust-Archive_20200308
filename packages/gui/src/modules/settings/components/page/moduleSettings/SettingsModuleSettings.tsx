import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {
    SettingsModuleSettings,
    SettingsModuleSettingsType,
} from "./SettingsModuleSettings.type";
import {React} from "../../../../../React";
import {ParameterizedSettingsFile, ExtendedObject, WindowManager} from "@adjust/core";
import {Registry} from "../../../../../registry/registry";
import {
    SettingsConfigSet,
    PropertySettingsSectionConfig,
    ParameterizedPropertySettingDefinition,
} from "@adjust/core/types";
import {SettingsSetProperties} from "@adjust/core/dist/storage/settings/settingsMetaData/settingsSetProperties";
import {SettingProperty} from "@adjust/core/dist/storage/settings/settingsMetaData/settingProperty";
import {
    IModuleSettingsState,
    ISettingState,
    ISectionState,
} from "./_types/IModuleSettingsState";
import {Box} from "../../../../../components/Box";

const SettingsModuleSettingsConfig = createConfig({
    state: {
        conditions: [] as {name: string; id: number}[],
        settings: {} as IModuleSettingsState<SettingsConfigSet>,
        loadingSettings: false as boolean,
    },
    settings: {},
    type: SettingsModuleSettingsType,
});

export class SettingsModuleSettingsModule
    extends createModule(SettingsModuleSettingsConfig)
    implements SettingsModuleSettings {
    // The settings file to display settings for
    protected settingFile: ParameterizedSettingsFile;

    // The settings that are currently selected to be displayed
    protected selectedSettingsProperties: SettingsSetProperties<SettingsConfigSet>;

    /** @override */
    public async onInit(): Promise<void> {
        const moduleClass = await Registry.getModuleClass(this.getData().path);
        this.settingFile = await moduleClass.getSettingsFile();

        this.changeState({
            conditions: this.settingFile
                .getAllSettings()
                .map(value => ({name: value.condition.getName(), id: value.ID})),
        });
        this.selectSettingsSet(0);

        // Open window as a test
        WindowManager.openWindow("orange", this.getID());
    }

    /**
     * Selects the settings set to be displayed on the screen
     * @param conditions The name or index of the conditions for the set to select
     */
    public selectSettingsSet(conditions: number | string): void {
        // Find the conditions object that was selected
        const conditionData = this.state.conditions.find(
            c => c.id === conditions || c.name === conditions
        );
        if (conditionData) {
            const condition = this.settingFile.getCondition(conditionData.id);

            // Dispose the old properties object if present
            if (this.selectedSettingsProperties)
                this.selectedSettingsProperties.destroy();

            // Create the new properties object
            this.selectedSettingsProperties = new SettingsSetProperties(
                this.settingFile,
                condition
            );
            this.setupPropertiesSetListers(this.selectedSettingsProperties);
        }
    }

    /**
     * Adds the properties to the state and registers its listeners
     * @param properties The properties to store
     */
    protected async setupPropertiesSetListers(
        properties: SettingsSetProperties<SettingsConfigSet>
    ): Promise<void> {
        this.changeState({
            settings: {[ExtendedObject.overwrite]: true},
            loadingSettings: true,
        });
        const map = async (props, path) =>
            ExtendedObject.fromEntries(
                (await Promise.all(
                    ExtendedObject.entries(props).map(
                        async ([key, value]: [string, any]) => {
                            const p = (path.length == 0 ? "" : path + ".") + key;
                            if (key == "sectionConfig") {
                                return [key, await this.setupSectionProperties(value, p)];
                            } else {
                                if ("default" in value) {
                                    return [
                                        key,
                                        await this.setupSettingProperties(value, p),
                                    ];
                                } else {
                                    return [key, await map(value, p)];
                                }
                            }
                        }
                    )
                )) as any
            );
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
    protected setupSectionProperties(
        config: PropertySettingsSectionConfig,
        path: string
    ): ISectionState {
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
    protected async setupSettingProperties(
        setting: ParameterizedPropertySettingDefinition,
        path: string
    ): Promise<ISettingState> {
        const settingModule = await this.request({type: setting.type});
        if (settingModule) await settingModule.setConstraint(setting.constraints);
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
            searchExcluded: this.setupProperty(
                setting.searchExcluded(),
                `${path}.searchExcluded`
            ),
            tags: this.setupProperty(setting.tags(), `${path}.tags`),
        };
    }

    /**
     * Sets up a property listener
     * @param property The property
     * @param path The path of the property
     */
    protected setupProperty<V>(property: SettingProperty<V>, path: string): V {
        property.on("change", value => {
            this.changeState(
                ExtendedObject.translatePathToObject(`settings.${path}`, value)
            );
        });
        return property.getValue();
    }
}
export default SettingsModuleSettingsModule;

export class SettingsModuleSettingsView extends createModuleView(
    SettingsModuleSettingsModule
) {
    /**
     * Renders a given setting
     * @param setting The setting to render
     */
    protected renderSetting(setting: ISettingState): JSX.Element {
        return <Box key={setting.path}>{setting.name}</Box>;
    }

    /**
     * Renders a sefic section
     * @param section The section to render
     */
    protected renderSection(section: IModuleSettingsState<any>): JSX.Element {
        const children = Object.entries(section).map(([key, value]) => {
            if (typeof value === "object" && value !== null && key != "sectionConfig")
                if ("default" in value) {
                    return this.renderSetting(value as any);
                } else {
                    return this.renderSection(value as any);
                }
        });
        const config = section.sectionConfig as ISettingState;

        return (
            <Box key={config.path}>
                <Box>{config.name}</Box>
                <Box paddingLeft="s">{children}</Box>
            </Box>
        );
    }

    /** @override */
    public renderView(): JSX.Element {
        console.log(this.state);
        if (this.state.loadingSettings) return <div>hoi</div>;
        return this.renderSection(this.state.settings);
    }
}
