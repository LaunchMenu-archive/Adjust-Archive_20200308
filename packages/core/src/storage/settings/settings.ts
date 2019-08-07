import {DeepReadonly} from "../../utils/_types/standardTypes";
import {ParameterizedSettingPriorityList} from "./_types/settingPriorityList";
import {ParameterizedConditionValue} from "./_types/conditionalValue";
import {JsonPartial} from "../_types/jsonPartial";

import {Module, ParameterizedModule} from "../../module/module";
import {SettingsConfig} from "./_types/settingsConfig";
import {SettingsFile} from "./settingsFile";
import {Data} from "../data";
import {EventEmitter} from "../../utils/eventEmitter";
import {ExtendedObject} from "../../utils/extendedObject";
import {SortedList} from "../../utils/sortedList";
import {SettingsConditions} from "./settingsConditions/abstractSettingsConditions";
import {SettingsConfigData} from "./_types/settingsConfigData";
import {SettingsConfigPriorityList} from "./_types/settingsConfigPriorityList";

export class Settings<C extends SettingsConfig> extends EventEmitter {
    protected settingsFile: SettingsFile<C>; // The file that stores settings
    protected settingsFileListener: (
        path: string,
        value: any,
        condition: SettingsConditions
    ) => void; // The function that checks for settings changes

    protected target: ParameterizedModule; // The target to track the applicable settings for
    protected settings: Data<SettingsConfigData<C>>; // The top level settings that apply to the target
    protected settingsPriorities: SettingsConfigPriorityList<C>; // The  whole list of settings that apply to the target
    public readonly get: DeepReadonly<SettingsConfigData<C>>; // The getter object for all settings

    /**
     * Creates settings for a specific module instance
     * @param target The module instance to target
     */
    protected constructor(target: Module<any, C, any>) {
        super();

        this.target = target;
    }

    /**
     * Creates settings for a specific module instance
     * @param target The module instance to target
     */
    static async createInstance<C extends SettingsConfig>(target: Module<any, C, any>) {
        const settings = new this(target);
        settings.settingsFile = await target.getClass().getSettingsFile();

        // Load the settings that apply to this target
        // @ts-ignore
        settings.get = settings.loadApplicableSettingsFromFile();

        // Setup the listeners
        settings.setupSettingsFileListener();

        return settings;
    }

    // Setup methods/teardown
    /**
     * Gets the settings from the settings file and loads the ones that apply to this target
     * @returns The getter object for the settings
     */
    protected loadApplicableSettingsFromFile(): DeepReadonly<SettingsConfigData<C>> {
        this.settingsPriorities = {} as SettingsConfigPriorityList<C>;

        // Go through all the settingsSets and their conditions
        this.settingsFile.getAllSettings().forEach(settingsSet => {
            // Check if the conditions apply to this target
            const condition = settingsSet.condition;
            if (this.satisfiesCondition(condition)) {
                // Go through all the settings values
                ExtendedObject.forEach<any>(
                    settingsSet.data.get,
                    (key, value, path, parentPath) => {
                        // Get the list to store the value in
                        const parent = ExtendedObject.getField(
                            this.settingsPriorities,
                            parentPath,
                            true
                        );
                        let field: ParameterizedSettingPriorityList = parent[key];

                        // Create the list if absent
                        if (!field)
                            field = parent[key] = new SortedList<
                                ParameterizedConditionValue
                            >(
                                (a, b) =>
                                    a.condition.getPriority() - b.condition.getPriority()
                            );

                        // Store the value
                        field.push({condition: condition, value: value});
                    },
                    true,
                    true
                );
            }
        });

        // Retrieve all the highest priority settings
        const settings = {};
        ExtendedObject.forEach<ParameterizedSettingPriorityList>(
            this.settingsPriorities as any,
            (key, value, path, parentPath) => {
                // Get the highest priority value, and store it
                const val = value.get(-1).value;
                const parent = ExtendedObject.getField(settings, parentPath, true);
                parent[key] = val;
            },
            true
        );
        this.settings = new Data(settings, false) as Data<SettingsConfigData<C>>;
        return this.settings.get;
    }

    /**
     * Adds the necessary listeners to the settings file, to keep the data in this bject synchronised
     */
    protected setupSettingsFileListener(): void {
        this.settingsFileListener = (path, value, condition) => {
            if (this.satisfiesCondition(condition)) {
                // Keep track of whether or not the settings value has to be updated
                let updateValue = false;

                // Get the list to contain the value
                const list: ParameterizedSettingPriorityList = ExtendedObject.getField(
                    this.settingsPriorities,
                    path
                );

                // Check if the value has been remvoed, change or inserted
                if (value === undefined) {
                    // If the value has been removed, remove it from the list
                    const oldIndex = list.pop(item => item.condition.equals(condition));

                    // Check if it was the highest priority element
                    updateValue = list.length == oldIndex;
                } else {
                    // Get the actual array from the sorted list
                    const array = list.get();

                    // Get the item that contains the condition and value
                    let item = array.find(item => item.condition.equals(condition));

                    // Check if the item actually exists
                    if (item) {
                        // If so, change its value
                        item.value = value;
                    } else {
                        // If it didn't exist yet, create it
                        item = {condition: condition, value: value};
                        list.push(item);
                    }

                    // Find the index of the setting
                    const index = array.findIndex(item =>
                        item.condition.equals(condition)
                    );

                    // Check if it was the highest priority element
                    updateValue = index == list.length - 1;
                }

                // If the value updated, emit a change
                if (updateValue) {
                    const value = list.get(-1).value;

                    // Retrieve the current value
                    const oldValue = ExtendedObject.getField(this.settings.get, path);

                    // Replace the setting by the new highest priority element
                    this.settings.changeData(ExtendedObject.translatePathToObject(
                        path,
                        value
                    ) as any);

                    // Send a change event
                    this.emit("change", path, value, oldValue);
                }
            }
        };
        this.settingsFile.on("change", this.settingsFileListener);
    }

    /**
     * Properly disposes the object
     */
    public destroy(): void {
        this.settingsFile.off("change", this.settingsFileListener);
        this.settingsFile.destroy(); // Only destroys if there are no more listeners
    }

    // Data altering methods
    /**
     * Changes the data for a passed condition
     * @param data The fields to change
     * @param condition The condition to change them for
     * @returns A promise that resolves when all listeners resolved
     */
    public async changeData(
        data: JsonPartial<SettingsConfigData<C>>,
        condition?: SettingsConditions
    ): Promise<void> {
        // Change the data on the condition of the settings file
        return this.getData(condition).changeData(data);
    }

    /**
     * Checks whether the target of these settings satisfy the passed condition
     * @param condition The condition to check for
     * @returns Whether or not the target satisfies the condition
     */
    protected satisfiesCondition(condition: SettingsConditions): boolean {
        return !condition || (!condition.isDisabled() && condition.matches(this.target));
    }

    /**
     * Sets the initial data for a given condition,
     * will store the data if the condition currently holds no other data
     * @param data The data to store under this condition
     * @param condition The condition to store the data under
     */
    public async setInitialData(
        data:
            | JsonPartial<SettingsConfigData<C>>
            | (() =>
                  | JsonPartial<SettingsConfigData<C>>
                  | Promise<JsonPartial<SettingsConfigData<C>>>
              ),
        condition?: SettingsConditions
    ): Promise<void> {
        // The currently stored data for these conditions
        const dataObj = this.getData(condition, false);

        // If no data is present, store the passed data
        if (!dataObj)
            this.changeData(data instanceof Function ? await data() : data, condition);
    }

    // Data retrieval methods
    /**
     * Retrieves the settings file storing all the settings
     * @returns The settings file
     */
    public getSettingsFile(): SettingsFile<C> {
        return this.settingsFile;
    }

    /**
     * Retrieves the data object storing all the applicable settings
     * @returns The settings Data instance
     */
    public getSettings(): Data<SettingsConfigData<C>> {
        return this.settings;
    }

    /**
     * Retrieves the data for a passed condition
     * @param condition The condition to retrieve the data for
     * @param create Whether or not to create the conditional data if absent
     * @returns The settings condition data
     */
    public getData(
        condition?: SettingsConditions,
        create: boolean = true
    ): Data<SettingsConfigData<C>> {
        // Check if the condition applies to this target, if not throw an error
        if (!this.satisfiesCondition(condition))
            throw new Error(
                "The target of these settings doesn't satisfy the given condition"
            );

        // Retrieve the data on the condition of the settings file
        return this.settingsFile.getConditionData(condition, create);
    }

    // Events
    /**
     * Adds a listener for the alteration of settings data
     * @param type The type of listener, I.e. settings change
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification
     * @returns The name of the listener (generated if none was supplied
     */
    public on(
        type: "change",
        listener: (prop: string, value: any, oldValue: any) => void | Promise<any>,
        name?: string
    ): string;

    /**
     * Simply registers any event type using EventEmitter
     */
    public on(
        type: string,
        listener: (...args: any) => void | Promise<any>,
        name?: string
    ): string;
    public on(
        type: string,
        listener: (...args: any) => void | Promise<any>,
        name?: string
    ): string {
        return super.on(type, listener, name);
    }
}
