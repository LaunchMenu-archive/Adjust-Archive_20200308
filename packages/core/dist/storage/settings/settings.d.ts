import { DeepReadonly } from "../../utils/_types/standardTypes";
import { SettingsData } from "./_types/settingsData";
import { SettingsPriorityList } from "./_types/settingsPriorityList";
import { ConditionalSetters } from "./_types/conditionalSetters";
import { JsonPartial } from "../_types/jsonPartial";
import { Module, ParameterizedModule } from "../../module/module";
import { SettingsConfig } from "./_types/settingsConfig";
import { SettingsFile } from "./settingsFile";
import { SettingsConditions } from "./settingsConditions";
import { Data } from "../data";
import { EventEmitter } from "../../utils/eventEmitter";
export declare class Settings<C extends SettingsConfig> extends EventEmitter {
    protected settingsFile: SettingsFile<C>;
    protected settingsFileListener: (path: string, value: any, condition: SettingsConditions) => void;
    protected target: ParameterizedModule;
    protected settings: Data<SettingsData<C>>;
    protected settingsPriorities: SettingsPriorityList<C>;
    readonly get: DeepReadonly<SettingsData<C>>;
    readonly set: DeepReadonly<ConditionalSetters<SettingsData<C>>>;
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
    protected loadApplicableSettingsFromFile(): DeepReadonly<SettingsData<C>>;
    /**
     * Adds the necessary listeners to the settings file, to keep the data in this bject synchronised
     */
    protected setupSettingsFileListener(): void;
    /**
     * Properly disposes the object
     */
    destroy(): void;
    /**
     * Creates setter methods for all of the settings
     * @returns A setter object that takes a condition as a second argument
     */
    protected setupSetters(): DeepReadonly<ConditionalSetters<SettingsData<C>>>;
    /**
     * Goes through the initial data in order to map all fields to setter methods on the set object
     * @param object The object for which to create setter functions
     * @param path The path of the given object from the root in this data
     * @returns The mapped object where all values are callable setter functions
     */
    static createSetters<T extends {
        [name: string]: any;
    }>(object: T, change: (path: object, condition?: SettingsConditions) => any, path?: string): ConditionalSetters<T>;
    /**
     * Changes the data for a passed condition
     * @param data The fields to change
     * @param condition The condition to change them fore
     * @returns A promise that resolves when all listeners resolved
     */
    changeData(data: JsonPartial<SettingsData<C>>, condition?: SettingsConditions): Promise<void>;
    /**
     * Checks whether the target of these settings satisfy the passed condition
     * @param condition The condition to check for
     * @returns Whether or not the target satisfies the condition
     */
    protected satisfiesCondition(condition: SettingsConditions): boolean;
    /**
     * Retrieves the data object storing all the applicable settings
     * @returns The settings Data instance
     */
    getSettings(): Data<SettingsData<C>>;
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
