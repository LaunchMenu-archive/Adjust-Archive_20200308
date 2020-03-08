import {SettingInputContract} from "../settingInputTypes/_types/SettingInput";
import {ISettingPropertyGetters} from "./_types/ISettingPropertyGetters";
import {SettingsFile} from "../settingsFile";
import {SettingsConditions} from "../settingsConditions/abstractSettingsConditions";
import {
    SettingDefinition,
    NormalizedSettingDefinition,
    GetSettingInputConstraints,
} from "../_types/settingDefinition";
import {filterSettingFromSearch} from "./filterSettingFromSearch";
import {SettingProperty} from "./settingProperty";
import {ExtendedObject} from "../../../utils/extendedObject";

export class SettingProperties<V, T extends SettingInputContract<V, any>> {
    // The settings file to get the properties for
    protected settingsFile: SettingsFile<any>;

    // The conditions that these properties are for
    protected conditions: SettingsConditions;

    // The path to the setting
    protected path: string;

    // The object with all the property getters
    protected propertyObject: ISettingPropertyGetters<V, T>;

    // A list of properties created through this object
    protected createdProperties: SettingProperty<any>[] = [];

    /**
     * Creates a new instance for a specified setting
     * @param settingsFile The settings file to create the properties object for
     * @param path The path to the setting to create the properties for
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
        if (!definition || typeof definition != "object" || !("default" in definition))
            throw Error(
                `${this.path} doesn't lead to a definition in the settings config`
            );

        // Get the property object
        this.propertyObject = this.getPropertySettingDefinition(
            this.path,
            definition,
            this.settingsFile,
            this.conditions
        );
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
    ): ISettingPropertyGetters<V, T> {
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
            }) as any;
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

    // Getter methods
    /**
     * Retrieves the property getter functions.
     * These functions create new properties when called the first time, and return the same property on later calls.
     * The argument 'true' can be passed to always create a new instance.
     * @returns The getters object.
     */
    public getProperties(): ISettingPropertyGetters<V, T> {
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
