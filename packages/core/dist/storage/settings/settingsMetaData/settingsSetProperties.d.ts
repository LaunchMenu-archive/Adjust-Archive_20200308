import { SettingsConfigSet, PropertySettingsConfigSet, SettingsSectionConfig, PropertySettingsSectionConfig } from "../_types/settingsConfigSet";
import { SettingsFile } from "../settingsFile";
import { SettingsConditions } from "../settingsConditions/abstractSettingsConditions";
import { SettingProperty } from "./settingProperty";
import { SettingInputContract } from "../settingInputTypes/_types/SettingInput";
import { SettingDefinition, PropertySettingDefinition, NormalizedSettingDefinition } from "../_types/settingDefinition";
/**
 * A file to manage the properties of a settings file, for usage in GUI
 */
export declare class SettingsSetProperties<S extends SettingsConfigSet> {
    protected settingsFile: SettingsFile<{
        settings: S;
        migrators: any;
        version: any;
    }>;
    protected propertyObject: PropertySettingsConfigSet<S>;
    protected conditions: SettingsConditions;
    protected createdProperties: SettingProperty<any>[];
    /**
     * Creates a new instance for a given settings file
     * @param settingsFile The settings file to create the instance for
     * @param conditions The conditions that this instance is for
     */
    constructor(settingsFile: SettingsFile<{
        settings: S;
        migrators: any;
        version: any;
    }>, conditions: SettingsConditions);
    /**
     * Creates the property object
     */
    protected setupPropertyObject(): void;
    /**
     * Retrieves a normalized version of the passed setting definition
     * @param path The path to the setting
     * @param settingDefiniton A setting definition
     * @returns The normalized version of a setting definition
     */
    static getNormalizedSettingDefinition<V, T extends SettingInputContract<V, any>>(path: string, settingDefiniton: SettingDefinition<V, T>): NormalizedSettingDefinition<V, T>;
    /**
     * Retrieves a normalized version of the passed setting definition with all evaluators replaced with `SettingProperty` instances
     * @param path The path to the setting
     * @param settingDefiniton A setting definition
     * @param settingsFile The setting file this definition is an instance of
     * @param conditions The condition to get the properties for
     * @returns The normalized version of a setting definition using `SettingProperty` instances
     */
    protected getPropertySettingDefinition<V, T extends SettingInputContract<V, any>>(path: string, settingDefiniton: SettingDefinition<V, T>, settingsFile: SettingsFile<any>, conditions: SettingsConditions): PropertySettingDefinition<V, T>;
    /**
     * Retrieves a normalized version of the passed section config
     * @param path The path to the setting
     * @param sectionConfig A section config
     * @returns The normalized version of a section config
     */
    static getNormalizedSectionConfig(path: string, sectionConfig: SettingsSectionConfig): SettingsSectionConfig;
    /**
     * Retrieves a normalized version of the config data of a settings set with all evaluators replaced with `SettingProperty` instances
     * @param path The path to the setting set
     * @param sectionConfig A setting config
     * @param settingsFile The setting file this definition is an instance of
     * @param conditions The condition to get the properties for
     * @returns The normalized version of a setting definition using `SettingProperty` instances
     */
    protected getPropertySectionConfig(path: string, sectionConfig: SettingsSectionConfig, settingsFile: SettingsFile<any>, conditions: SettingsConditions): PropertySettingsSectionConfig;
    /**
     * Retrieves the property getter functions.
     * These functions create new properties when called the first time, and return the same property on later calls.
     * The argument 'true' can be passed to always create a new instance.
     * @returns The getters object.
     */
    getProperties(): PropertySettingsConfigSet<S>;
    /**
     * Sets the search value for all of the properties
     * @param search The new search value
     */
    setSearch(search: string): void;
    /**
     * Destroys all properties obtained from this instance
     */
    destroy(): void;
}
