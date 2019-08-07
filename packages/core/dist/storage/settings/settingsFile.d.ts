import { DeepReadonly, Json } from "../../utils/_types/standardTypes";
import { ConditionalSettings } from "./_types/conditionalSettings";
import { ConditionalSettingsDataList } from "./_types/conditionalSettingsDataList";
import { Data } from "../data";
import { SettingsConfig } from "./_types/settingsConfig";
import { SettingsConfigSetData } from "./_types/settingsConfigSetData";
import { EventEmitter } from "../../utils/eventEmitter";
import { Shape } from "./_types/shape";
import { SettingsDataID } from "./SettingsDataID";
import { Module } from "../../module/module";
import { SettingsConditions } from "./settingsConditions/abstractSettingsConditions";
import { SettingsConfigData } from "./_types/settingsConfigData";
import { SettingsConfigSet } from "./_types/settingsConfigSet";
import { SettingsMigrators } from "./_types/settingsMigrator";
export declare class SettingsFile<S extends SettingsConfig> extends EventEmitter {
    protected settings: ConditionalSettingsDataList<SettingsConfigData<S>>;
    protected config: SettingsConfig;
    protected path: string;
    protected moduleClass: typeof Module;
    protected shape: Shape<SettingsConfigData<S>>;
    protected isDirty: boolean;
    /**
     * Creates a settingsFile to store settings for a certain module class
     * @param module The path to store the settings at
     * @param config The settings config
     */
    protected constructor(path: string, config: S);
    /**
     * Creates a settingsFile to store settings for a certain module class
     * @param path The path to store the settings at
     * @param config The settings config
     */
    static createInstance<S extends SettingsConfig>(path: string, config: S): Promise<SettingsFile<S>>;
    /**
     * Creates a settingsFile to store settings for a certain module class
     * @param moduleClass The module class to create the settings for
     */
    static createInstance<S extends SettingsConfig>(moduleClass: typeof Module): Promise<SettingsFile<S>>;
    /**
     * Extracts the default values from a settings config
     * @param config The config of which to extract the default values
     * @returns The default values
     */
    protected extractDefault<C extends SettingsConfigSet>(configSettings: C): SettingsConfigSetData<C>;
    /**
     * Extracts the value shape of the settings by mapping all defaults to undefined
     * @param config The config of which to extract the shape
     * @returns The shape of the settings
     */
    protected extractConfigShape<C extends SettingsConfigSet>(config: C): Shape<SettingsConfigSetData<C>>;
    /**
     * Extracts the value shape of the settings by mapping all non objects to undefined
     * @param data The data of which to extract the shape
     * @returns The shape of the Data
     */
    protected extractShape<C extends {
        [name: string]: Json;
    }>(data: C): Shape<C>;
    /**
     * Destroys this settings file instance, if there are no more listeners
     */
    destroy(): void;
    /**
     * Retrieves the settings conditions from the ID it has
     * @param ID The ID of the settings conditions within these settings
     * @returns The settings conditions that match this ID
     */
    getCondition(ID: SettingsDataID | number): SettingsConditions;
    /**
     * Retrieves the settings conditions' ID within these settings
     * @param condition The conditions to retrieve the ID of
     * @returns The ID that could be found matching
     */
    getConditionID(condition: SettingsConditions): number;
    /**
     * Retrieves the module class that these settings are for if any
     * @returns The associated module class
     */
    getModuleClass(): typeof Module;
    /**
     * Retrieves all settings and their conditions
     * @return All settings
     */
    getAllSettings(): ConditionalSettingsDataList<SettingsConfigData<S>>;
    /**
     * Retrieves the shape of the settings data
     * @returns The shape, with all values being undefined
     */
    getStucture(): Shape<SettingsConfigData<S>>;
    /**
     * Gets a Data instance for the given condition
     * @param condition The condition for which to get (or create) a Data instance
     * @param create Whether or not to create the conditional data if absent
     * @returns The retrieved or created Data instance
     */
    getConditionData(condition?: SettingsConditions | SettingsDataID | number, create?: boolean): Data<SettingsConfigData<S>>;
    /**
     * Gets the getter object of a Data instance for a particular condition
     * @param condition The condition for which to get the getter
     * @retursn The getter that was found
     */
    get(condition?: SettingsConditions): DeepReadonly<SettingsConfigData<S>>;
    /**
     * Removes the data associated with a given condition
     * @param condition The condition for which to remove a Data instance
     */
    removeConditionData(condition?: SettingsConditions | SettingsDataID | number): void;
    /**
     * Processes events emitted by data objects, and forwards them to listeners (called by the data objects)
     * @param condition The condition of the changed data
     * @param changedProps The changed properties
     * @param previousProps The values that the properties had before
     * @param fromLoad Whether the value changed by loading it the first time this session
     */
    protected valueChange(condition: SettingsConditions, changedProps: object, previousProps: object, fromLoad?: boolean): Promise<void>;
    /**
     * Saves the current data in the corresponding file
     */
    save(): void;
    /**
     * Migrates settings data of a previous version to the latest version
     * @param version:The current version of the data
     * @param settings The actual settings currently stored
     * @param migrators The migrators to use for the migration
     * @returns The input data migrated to the format of the latest version
     */
    protected migrateSettings(version: string, settings: ConditionalSettings<SettingsConfigData<any>>[], migrators?: SettingsMigrators): ConditionalSettings<SettingsConfigData<any>>[];
    /**
     * Adds missing default values to the provided plain data
     * @param data The data to add the default values to
     */
    protected migrateSettingsAddDefaults(data: SettingsConfigData<any>): void;
    /**
     * Reloads the settings as are present in the stored file
     * @param getInitialSettings A getter for the settings to load if no file is present
     * @returns A promise that resolves once all events have resolved
     */
    reload(getInitialSettings?: () => ConditionalSettings<SettingsConfigData<S>>[]): Promise<void>;
    /**
     * Changes whether or not this file is dirty
     * @param dirty Whether or not this file is dirty
     */
    setDirty(dirty: boolean): void;
    /**
     * Adds a listener for the alteration of settings data
     * @param type The type of listener, I.e. settings change
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification
     * @returns The name of the listener (generated if none was supplied
     */
    on(type: "change", listener: (path: string, value: any, condition: SettingsConditions, previousValue: any) => void | Promise<any>, name?: string): string;
    /**
     * Simply registers any event type using EventEmitter
     */
    on(type: string, listener: (...args: any) => void | Promise<any>, name?: string): string;
}
export declare type ParameterizedSettingsFile = SettingsFile<SettingsConfig>;
