import {SettingsConfigSet, SettingsSectionConfig} from "../_types/settingsConfigSet";
import {
    ISettingsSectionPropertyGetters,
    ISettingsSectionConfigProperties,
} from "./_types/ISettingsSectionPropertyGetters";
import {SettingsFile} from "../settingsFile";
import {SettingsConditions} from "../settingsConditions/abstractSettingsConditions";
import {SettingProperty} from "./settingProperty";
import {SettingsSetProperties} from "./settingsSetProperties";
import {ExtendedObject} from "../../../utils/extendedObject";

export class SettingsSectionProperties<S extends SettingsConfigSet> {
    // The settings file to get the properties for
    protected settingsFile: SettingsFile<any>;

    // The conditions that these properties are for
    protected conditions: SettingsConditions;

    // The path to the settings section
    protected path: string;

    // The object with all the property getters
    protected propertyObject: ISettingsSectionPropertyGetters<S>;

    // A list of properties created through this object
    protected createdProperties: SettingProperty<any>[] = [];

    // A list of created SettingsProperties and SettingsSectionProperties objects
    protected createdChildren: (
        | SettingsSectionProperties<any>
        | SettingsSetProperties<any>
    )[] = [];

    /**
     * Creates a new instance for a specified setting section
     * @param settingsFile The settings file to create the properties object for
     * @param path The path to the setting section to create the properties for
     * @param conditions The conditions that this instance is for
     */
    constructor(
        settingsFile: SettingsFile<any>,
        path: string,
        conditions: SettingsConditions
    ) {
        this.settingsFile = settingsFile;
        this.path = path;
        this.conditions = conditions;
        this.setupPropertyObject();
    }

    /**
     * Creates the property object
     */
    protected setupPropertyObject(): void {
        // Retrieve the field
        const settings = this.settingsFile.getConfig().settings;
        const definition = ExtendedObject.getField(settings, this.path);
        if (!definition || typeof definition != "object" || "default" in definition)
            throw Error(`${this.path} doesn't lead to a section in the settings config`);

        // Get the property object
        this.propertyObject = this.getPropertySectionConfig(
            this.path,
            definition,
            this.settingsFile,
            this.conditions
        );
    }
    /**
     * Retrieves a normalized version of the passed section config
     * @param path The path to the setting
     * @param sectionConfig A section config
     * @returns The normalized version of a section config
     */
    public static getNormalizedSectionConfig(
        path: string,
        sectionConfig: SettingsSectionConfig
    ): SettingsSectionConfig {
        return {
            name: path.split(".").pop(),
            description: null,
            help: null,
            helpLink: null,
            ...sectionConfig,
        };
    }

    /**
     * Retrieves a normalized version of the config data of a settings set with all evaluators replaced with `SettingProperty` instances
     * @param path The path to the setting set
     * @param sectionConfig A setting config
     * @param settingsFile The setting file this definition is an instance of
     * @param conditions The condition to get the properties for
     * @returns The normalized version of a setting definition using `SettingProperty` instances
     */
    protected getPropertySectionConfig(
        path: string,
        sectionConfig: SettingsSectionConfig,
        settingsFile: SettingsFile<any>,
        conditions: SettingsConditions
    ): ISettingsSectionConfigProperties {
        const normalized = ExtendedObject.getClass(this).getNormalizedSectionConfig(
            path,
            sectionConfig
        );
        const getProperty = value => {
            let func = ((createNew = false) => {
                if (createNew || !func.cached) {
                    const prop = new SettingProperty(
                        path,
                        settingsFile,
                        conditions,
                        value
                    );
                    this.createdProperties.push(prop);
                    if (!createNew) func.cached = prop;
                    return prop;
                }
                return func.cached;
            }) as ((createNew: boolean) => SettingProperty<typeof value>) & {
                cached: SettingProperty<typeof value>;
            };
            return func;
        };

        return {
            name: getProperty(normalized.name),
            description: getProperty(normalized.description),
            help: getProperty(normalized.help),
            helpLink: getProperty(normalized.helpLink),
        };
    }

    // Getter methods
    /**
     * Retrieves the property getter functions.
     * These functions create new properties when called the first time, and return the same property on later calls.
     * The argument 'true' can be passed to always create a new instance.
     * @returns The getters object.
     */
    public getProperties(): ISettingsSectionPropertyGetters<S> {
        return this.propertyObject;
    }

    // Setter methods
    /**
     * Sets the search value for all of the properties
     * @param search The new search value
     */
    public setSearch(search: string): void {
        this.createdProperties.forEach(property => property.setSearchValue(search));
        this.createdChildren.forEach(child => child.setSearch(search));
    }

    // Maintencance methods
    /**
     * Destroys all properties obtained from this instance
     */
    public destroy() {
        this.createdProperties.forEach(property => property.destroy());
        this.createdChildren.forEach(child => child.destroy());
    }
}
