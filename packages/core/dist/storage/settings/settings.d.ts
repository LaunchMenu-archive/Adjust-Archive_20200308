import { DeepReadonly } from "../../utils/_types/standardTypes";
import { DataChange } from "../_types/dataChange";
import { Module, ParameterizedModule } from "../../module/module";
import { SettingsConfig } from "./_types/settingsConfig";
import { SettingsFile } from "./settingsFile";
import { Data } from "../data";
import { EventEmitter } from "../../utils/eventEmitter";
import { SettingsConditions } from "./settingsConditions/abstractSettingsConditions";
import { SettingsConfigData } from "./_types/settingsConfigData";
import { SettingsConfigPriorityList } from "./_types/settingsConfigPriorityList";
export declare class Settings<C extends SettingsConfig> extends EventEmitter {
    protected settingsFile: SettingsFile<C>;
    protected settingsFileListener: (path: string, value: any, condition: SettingsConditions) => void;
    protected target: ParameterizedModule;
    protected settings: Data<SettingsConfigData<C>>;
    protected settingsPriorities: SettingsConfigPriorityList<C>;
    readonly get: DeepReadonly<SettingsConfigData<C>>;
    /**
     * Creates settings for a specific module instance
     * @param target The module instance to target
     */
    protected constructor(target: Module<any, C, any>);
    /**
     * Creates settings for a specific module instance
     * @param target The module instance to target
     */
    static createInstance<C extends SettingsConfig>(target: Module<any, C, any>): Promise<Settings<C>>;
    /**
     * Gets the settings from the settings file and loads the ones that apply to this target
     * @returns The getter object for the settings
     */
    protected loadApplicableSettingsFromFile(): DeepReadonly<SettingsConfigData<C>>;
    /**
     * Adds the necessary listeners to the settings file, to keep the data in this bject synchronised
     */
    protected setupSettingsFileListener(): void;
    /**
     * Properly disposes the object
     */
    destroy(): void;
    /**
     * Changes the data for a passed condition
     * @param data The fields to change
     * @param condition The condition to change them for
     * @returns A promise that resolves when all listeners resolved
     */
    changeData(data: DataChange<SettingsConfigData<C>>, condition?: SettingsConditions): Promise<void>;
    /**
     * Checks whether the target of these settings satisfy the passed condition
     * @param condition The condition to check for
     * @returns Whether or not the target satisfies the condition
     */
    protected satisfiesCondition(condition: SettingsConditions): boolean;
    /**
     * Sets the initial data for a given condition,
     * will store the data if the condition currently holds no other data
     * @param data The data to store under this condition
     * @param condition The condition to store the data under
     */
    setInitialData(data: DataChange<SettingsConfigData<C>> | (() => DataChange<SettingsConfigData<C>> | Promise<DataChange<SettingsConfigData<C>>>), condition?: SettingsConditions): Promise<void>;
    /**
     * Retrieves the settings file storing all the settings
     * @returns The settings file
     */
    getSettingsFile(): SettingsFile<C>;
    /**
     * Retrieves the data object storing all the applicable settings
     * @returns The settings Data instance
     */
    getSettings(): Data<SettingsConfigData<C>>;
    /**
     * Retrieves the data for a passed condition
     * @param condition The condition to retrieve the data for
     * @param create Whether or not to create the conditional data if absent
     * @returns The settings condition data
     */
    getData(condition?: SettingsConditions, create?: boolean): Data<SettingsConfigData<C>>;
    /**
     * Adds a listener for the alteration of settings data
     * @param type The type of listener, I.e. settings change
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification
     * @returns The name of the listener (generated if none was supplied
     */
    on(type: "change", listener: (prop: string, value: any, oldValue: any) => void | Promise<any>, name?: string): string;
    /**
     * Simply registers any event type using EventEmitter
     */
    on(type: string, listener: (...args: any) => void | Promise<any>, name?: string): string;
}
