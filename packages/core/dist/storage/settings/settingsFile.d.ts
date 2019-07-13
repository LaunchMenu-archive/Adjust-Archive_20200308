import { DeepReadonly } from "../../utils/_types/standardTypes";
import { ConditionalSettings } from "./_types/conditionalSettings";
import { ConditionalSettingsDataList } from "./_types/conditionalSettingsDataList";
import { Data } from "../data";
import { Setters } from "../_types/setters";
import { SettingsConfig } from "./_types/settingsConfig";
import { SettingsData } from "./_types/settingsData";
import { SettingsConditions } from "./settingsConditions";
import { EventEmitter } from "../../utils/eventEmitter";
import { Shape } from "./_types/shape";
import { SettingsDataID } from "./_types/SettingsDataID";
export declare class SettingsFile<S extends SettingsConfig> extends EventEmitter {
    protected settings: ConditionalSettingsDataList<SettingsData<S>>;
    protected config: SettingsConfig;
    protected path: string;
    protected shape: Shape<SettingsData<S>>;
    protected isDirty: boolean;
    /**
     * Creates a settingsFile to store settings for a certain module class
     * @param path The path to store the settings at
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
     * Extracts the default values from a settings config
     * @param config The config of which to extract the default values
     * @returns The default values
     */
    protected extractDefault<C extends SettingsConfig>(config: C): SettingsData<C>;
    /**
     * Extracts the value shape of the settings by mapping all defaults to undefined
     * @param config The config of which to extract the shape
     * @returns The shape of the settings
     */
    protected extractShape<C extends SettingsConfig>(config: C): Shape<SettingsData<S>>;
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
     * Returns all settings and their conditions
     * @return All settings
     */
    getAllSettings(): ConditionalSettingsDataList<SettingsData<S>>;
    /**
     * Returns the shape of the settings data
     * @returns The shape, with all values being undefined
     */
    getStucture(): Shape<SettingsData<S>>;
    /**
     * Gets a Data instance for the given condition
     * @param condition The condition for which to get (or create) a Data instance
     * @returns The retrieved or created Data instance
     */
    getConditionData(condition?: SettingsConditions | SettingsDataID | number): Data<SettingsData<S>>;
    /**
     * Gets the getter object of a Data instance for a particular condition
     * @param condition The condition for which to get the getter
     * @retursn The getter that was found
     */
    get(condition?: SettingsConditions): DeepReadonly<SettingsData<S>>;
    /**
     * Gets the setter object of a Data instance for a particular condition
     * @param condition The condition for which to get the setter
     * @retursn The setter that was found
     */
    set(condition?: SettingsConditions): DeepReadonly<Setters<SettingsData<S>>>;
    /**
     * Processes events emitted by data objects, and forwards them to listeners (called by the data objects)
     * @param condition The condition of the changed data
     * @param changedProps The changed properties
     * @param previousProps The values that the properties had before
     */
    protected valueChange(condition: SettingsConditions, changedProps: object, previousProps: object): Promise<void>;
    /**
     * Saves the current data in the corresponding file
     */
    save(): void;
    /**
     * Reloads the settings as are present in the stored file
     * @param initialSettings The settings to load if no file is present
     * @returns A promise that resolves once all events have resolved
     */
    reload(initialSettings?: ConditionalSettings<SettingsData<S>>[]): Promise<void>;
    /**
     * Changes whether or not this file is dirty
     * @param dirty Whether or not this file is dirty
     */
    protected setDirty(dirty: boolean): void;
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
