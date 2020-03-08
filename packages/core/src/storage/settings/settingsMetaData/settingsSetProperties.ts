import {
    SettingsConfigSet,
    PropertySettingsConfigSet,
    SettingsSectionConfig,
    PropertySettingsSectionConfig,
} from "../_types/settingsConfigSet";
import {SettingsFile} from "../settingsFile";
import {ExtendedObject} from "../../../utils/extendedObject";
import {SettingsConditions} from "../settingsConditions/abstractSettingsConditions";
import {SettingProperty} from "./settingProperty";
import {SettingInputContract} from "../settingInputTypes/_types/SettingInput";
import {
    SettingDefinition,
    PropertySettingDefinition,
    NormalizedSettingDefinition,
    GetSettingInputConstraints,
} from "../_types/settingDefinition";
import {filterSettingFromSearch} from "./filterSettingFromSearch";

/**
 * A file to manage the properties of a settings file, for usage in GUI
 */
export class SettingsSetProperties<S extends SettingsConfigSet> {
    // The settings file to get the properties for
    protected settingsFile: SettingsFile<{settings: S; migrators: any; version: any}>;

    // The object with all the property getters
    protected propertyObject: PropertySettingsConfigSet<S>;

    // The conditions that these properties are for
    protected conditions: SettingsConditions;

    // A list of properties created through this object
    protected createdProperties: SettingProperty<any>[] = [];

    /**
     * Creates a new instance for a given settings file
     * @param settingsFile The settings file to create the instance for
     * @param conditions The conditions that this instance is for
     */
    constructor(
        settingsFile: SettingsFile<{settings: S; migrators: any; version: any}>,
        conditions: SettingsConditions
    ) {
        this.settingsFile = settingsFile;
        this.conditions = conditions;
        this.setupPropertyObject();
    }

    /**
     * Creates the property object
     */
    protected setupPropertyObject(): void {
        const map = <P extends SettingsConfigSet>(
            settings: P,
            path: string
        ): PropertySettingsConfigSet<P> => {
            if ("default" in settings) {
                return this.getPropertySettingDefinition(
                    path,
                    settings as any,
                    this.settingsFile,
                    this.conditions
                ) as any;
            } else {
                // Map all settings
                const section = ExtendedObject.map(settings, (value, key) => {
                    if (key == "default") return value; // should be undefined
                    if (key == "sectionConfig") return undefined;

                    // console.log(value);
                    return map(value as any, path ? path + "." + key : key);
                }) as any;

                // Add the section config
                section.sectionConfig = this.getPropertySectionConfig(
                    path,
                    settings.sectionConfig,
                    this.settingsFile,
                    this.conditions
                );
                return section;
            }
        };
        this.propertyObject = map(this.settingsFile.getConfig().settings, "");
    }

    /**
     * Retrieves a normalized version of the passed setting definition
     * @param path The path to the setting
     * @param settingDefiniton A setting definition
     * @returns The normalized version of a setting definition
     */
    public static getNormalizedSettingDefinition<
        V,
        T extends SettingInputContract<V, any>
    >(
        path: string,
        settingDefiniton: SettingDefinition<V, T>
    ): NormalizedSettingDefinition<V, T> {
        return {
            constraints: {} as GetSettingInputConstraints<T>,
            onChange: () => {},
            name: path.split(".").pop(),
            description: null,
            help: null,
            helpLink: null,
            hidden: false,
            advanced: false,
            enabled: true,
            searchExcluded: {
                dependencies: {
                    tags: path + ".tags",
                    name: path + ".name",
                    description: path + ".description",
                },
                searchDependent: true,
                evaluator: filterSettingFromSearch,
            },
            tags: [],
            ...settingDefiniton,
        };
    }

    /**
     * Retrieves a normalized version of the passed setting definition with all evaluators replaced with `SettingProperty` instances
     * @param path The path to the setting
     * @param settingDefiniton A setting definition
     * @param settingsFile The setting file this definition is an instance of
     * @param conditions The condition to get the properties for
     * @returns The normalized version of a setting definition using `SettingProperty` instances
     */
    protected getPropertySettingDefinition<V, T extends SettingInputContract<V, any>>(
        path: string,
        settingDefiniton: SettingDefinition<V, T>,
        settingsFile: SettingsFile<any>,
        conditions: SettingsConditions
    ): PropertySettingDefinition<V, T> {
        const normalized = ExtendedObject.getClass(this).getNormalizedSettingDefinition(
            path,
            settingDefiniton
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
            default: normalized.default as any,
            type: normalized.type as any,
            constraints: getProperty(normalized.constraints) as any,
            onChange: normalized.onChange,
            name: getProperty(normalized.name),
            description: getProperty(normalized.description),
            help: getProperty(normalized.help),
            helpLink: getProperty(normalized.helpLink),
            hidden: getProperty(normalized.hidden),
            advanced: getProperty(normalized.advanced),
            enabled: getProperty(normalized.enabled),
            searchExcluded: getProperty(normalized.searchExcluded),
            tags: getProperty(normalized.tags),
        };
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
    ): PropertySettingsSectionConfig {
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
    public getProperties(): PropertySettingsConfigSet<S> {
        return this.propertyObject;
    }

    // Setter methods
    /**
     * Sets the search value for all of the properties
     * @param search The new search value
     */
    public setSearch(search: string): void {
        this.createdProperties.forEach(property => property.setSearchValue(search));
    }

    // Maintencance methods
    /**
     * Destroys all properties obtained from this instance
     */
    public destroy() {
        this.createdProperties.forEach(property => property.destroy());
    }
}
