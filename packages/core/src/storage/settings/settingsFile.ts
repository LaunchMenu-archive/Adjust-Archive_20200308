import Path from "path";
import {DeepReadonly} from "../../utils/_types/standardTypes";
import {ConditionalSettings} from "./_types/conditionalSettings";
import {ConditionalSettingsDataList} from "./_types/conditionalSettingsDataList";
import {Data} from "../data";
import {Setters} from "../_types/setters";
import {SettingsManager} from "./settingsManager";
import {SettingsConfig} from "./_types/settingsConfig";
import {SettingsData} from "./_types/settingsData";
import {SettingsConditions} from "./settingsConditions";
import {EventEmitter} from "../../utils/eventEmitter";
import {ExtendedObject} from "../../utils/extendedObject";
import {SortedList} from "../../utils/sortedList";
import {Shape} from "./_types/shape";
import {SettingsDataID} from "./SettingsDataID";
import {Module} from "../../module/module";

export class SettingsFile<S extends SettingsConfig> extends EventEmitter {
    protected settings: ConditionalSettingsDataList<SettingsData<S>>;
    protected config: SettingsConfig;
    protected path: string;

    // The module class that these are the settings for, may be undefined if not associated with module
    protected moduleClass: typeof Module;

    // Used to initialise new instance of SettingsData
    protected shape: Shape<SettingsData<S>>;

    // Whether or not settings have been changed since last save
    protected isDirty: boolean;

    /**
     * Creates a settingsFile to store settings for a certain module class
     * @param module The path to store the settings at
     * @param config The settings config
     */
    protected constructor(path: string, config: S) {
        super();

        // Store the path
        path = SettingsManager.normalizeExtension(path);
        this.path = path;

        this.config = config;

        // Store the structure
        this.shape = this.extractShape(config);
    }

    /**
     * Creates a settingsFile to store settings for a certain module class
     * @param path The path to store the settings at
     * @param config The settings config
     */
    static async createInstance<S extends SettingsConfig>(
        path: string,
        config: S
    ): Promise<SettingsFile<S>>;

    /**
     * Creates a settingsFile to store settings for a certain module class
     * @param moduleClass The module class to create the settings for
     */
    static async createInstance<S extends SettingsConfig>(
        moduleClass: typeof Module
    ): Promise<SettingsFile<S>>;

    /**
     * Creates a settingsFile to store settings for a certain module class
     * @param path The path to store the settings at
     * @param config The settings config
     */
    static async createInstance<S extends SettingsConfig>(
        path: string | typeof Module,
        config?: S
    ): Promise<SettingsFile<S>> {
        // Normalize the data
        let moduleClass: typeof Module;
        if (typeof path == "function") {
            moduleClass = path;
            config = moduleClass.getConfig().settings as S;
            path = moduleClass.getPath();
        }

        //  Create an instance
        const settingsFile = new this(path, config);
        settingsFile.moduleClass = moduleClass;

        // Only the provided data will be used if no data is stored yet
        await settingsFile.reload(() => [
            {
                condition: undefined,
                priority: 0,
                ID: 0,
                data: settingsFile.extractDefault(config),
            },
        ]);

        // Return the settings file
        return settingsFile;
    }

    // Setup/teardown methods
    /**
     * Extracts the default values from a settings config
     * @param config The config of which to extract the default values
     * @returns The default values
     */
    protected extractDefault<C extends SettingsConfig>(config: C): SettingsData<C> {
        const data = {};
        ExtendedObject.forEach(config, (key, value) => {
            if (value.default !== undefined) data[key] = value.default;
            else data[key] = this.extractDefault(value);
        });
        return data as SettingsData<C>;
    }

    /**
     * Extracts the value shape of the settings by mapping all defaults to undefined
     * @param config The config of which to extract the shape
     * @returns The shape of the settings
     */
    protected extractShape<C extends SettingsConfig>(config: C): Shape<SettingsData<S>> {
        const data = {};
        ExtendedObject.forEach(config, (key, value) => {
            if (value.default !== undefined) data[key] = undefined;
            else data[key] = this.extractShape(value);
        });
        return data as Shape<SettingsData<S>>;
    }

    /**
     * Destroys this settings file instance, if there are no more listeners
     */
    public destroy(): void {
        if (this.listeners["change"] && this.listeners["change"].length == 0)
            SettingsManager.removeSettingsFile(this.path, this);
    }

    // Condition related methods
    /**
     * Retrieves the settings conditions from the ID it has
     * @param ID The ID of the settings conditions within these settings
     * @returns The settings conditions that match this ID
     */
    public getCondition(ID: SettingsDataID | number): SettingsConditions {
        if (typeof ID == "object") ID = ID.settingsID;
        const set = this.settings.get().find(set => set.ID == ID);
        return set && set.condition;
    }

    /**
     * Retrieves the settings conditions' ID within these settings
     * @param condition The conditions to retrieve the ID of
     * @returns The ID that could be found matching
     */
    public getConditionID(condition: SettingsConditions): number {
        const set = this.settings.get().find(set => set.condition.equals(condition));
        return set && set.ID;
    }

    // Retrieval methods
    /**
     * Retrieves the module class that these settings are for if any
     * @returns The associated module class
     */
    public getModuleClass(): typeof Module {
        return this.moduleClass;
    }

    /**
     * Retrieves all settings and their conditions
     * @return All settings
     */
    public getAllSettings(): ConditionalSettingsDataList<SettingsData<S>> {
        return this.settings;
    }

    /**
     * Retrieves the shape of the settings data
     * @returns The shape, with all values being undefined
     */
    public getStucture(): Shape<SettingsData<S>> {
        return this.shape;
    }

    /**
     * Gets a Data instance for the given condition
     * @param condition The condition for which to get (or create) a Data instance
     * @returns The retrieved or created Data instance
     */
    public getConditionData(
        condition?: SettingsConditions | SettingsDataID | number
    ): Data<SettingsData<S>> {
        // Normalize the conditions
        if (!(condition instanceof SettingsConditions) && condition !== undefined)
            condition = this.getCondition(condition);

        // Get the settingsSetData if already defined
        let settingsSetData = this.settings
            .get()
            .find(settingSetData =>
                settingSetData.condition.equals(condition as SettingsConditions)
            );

        // If not previously defined, create it
        if (!settingsSetData) {
            const data = new Data<SettingsData<S>>(
                (this.shape as unknown) as SettingsData<S>,
                false
            );

            // Setup a listener
            data.on("change", this.valueChange.bind(this, condition), "SettingsFile");

            // Create the settings set data
            const settingsDataID =
                this.settings.get().reduce((cur, set) => Math.max(set.ID, cur), 0) + 1;
            settingsSetData = {
                condition: condition as SettingsConditions,
                ID: settingsDataID,
                data: data,
            };
            this.settings.push(settingsSetData);
        }

        // Return the data
        return settingsSetData.data;
    }

    /**
     * Gets the getter object of a Data instance for a particular condition
     * @param condition The condition for which to get the getter
     * @retursn The getter that was found
     */
    public get(condition?: SettingsConditions): DeepReadonly<SettingsData<S>> {
        return this.getConditionData(condition).get;
    }

    // Altering settings
    /**
     * Gets the setter object of a Data instance for a particular condition
     * @param condition The condition for which to get the setter
     * @retursn The setter that was found
     */
    public set(condition?: SettingsConditions): DeepReadonly<Setters<SettingsData<S>>> {
        return this.getConditionData(condition).set;
    }

    /**
     * Processes events emitted by data objects, and forwards them to listeners (called by the data objects)
     * @param condition The condition of the changed data
     * @param changedProps The changed properties
     * @param previousProps The values that the properties had before
     * @param fromLoad Whether the value changed by loading it the first time this session
     */
    protected async valueChange(
        condition: SettingsConditions,
        changedProps: object,
        previousProps: object,
        fromLoad: boolean = false
    ): Promise<void> {
        if (!fromLoad)
            // Indicate that the file is dirty now
            this.setDirty(true);

        // Call all listeners
        const promises = [];
        ExtendedObject.forEachPaired(
            [changedProps, previousProps, this.config],
            // Emit all value changes
            (key, [newValue, oldValue, config], path) => {
                // If the config described a change event, fire it and add it to promises to wait for
                if (config.onChange)
                    promises.push(
                        config.onChange(newValue, condition, oldValue, this, fromLoad)
                    );

                // Emit the change event, and add it to promises to wait for
                promises.push(
                    this.emitAsync("change", path, newValue, condition, oldValue)
                );
            },
            // Only recurse when we haven't hit a setting value yet
            (key, value, path) =>
                !("default" in ExtendedObject.getField(this.config, path)),
            true
        );

        // Wait for the promises to resolve
        await Promise.all(promises);
    }

    // Saving
    /**
     * Saves the current data in the corresponding file
     */
    public save(): void {
        const data = this.settings
            .filter(settingsSet => Object.keys(settingsSet.data.get).length > 0)
            .map(
                settingsSet =>
                    ({
                        condition: settingsSet.condition.getData(),
                        priority: settingsSet.condition.getPriority(),
                        ID: settingsSet.ID,
                        data: settingsSet.data.serialize(),
                    } as ConditionalSettings<any>)
            );
        SettingsManager.saveFile(this.path, data);
        this.setDirty(false);
    }

    /**
     * Reloads the settings as are present in the stored file
     * @param getInitialSettings A getter for the settings to load if no file is present
     * @returns A promise that resolves once all events have resolved
     */
    public async reload(
        getInitialSettings?: () => ConditionalSettings<SettingsData<S>>[]
    ): Promise<void> {
        // TODO: Only fire events of values that actually changed, and track their previous values
        // Load the previously stored data if present
        const storedData = SettingsManager.loadFile(this.path);

        // A method to load the specified settings data
        const getSettings = initialSettings => {
            // Create data objects for all of them
            const settingsData = (initialSettings || []).map(settings => {
                const data = new Data(settings.data);
                data.on(
                    "change",
                    this.valueChange.bind(this, settings.condition),
                    "SettingsFile"
                );
                return {
                    condition: new SettingsConditions(
                        settings.condition,
                        settings.priority || 0
                    ),
                    ID: settings.ID,
                    data: data,
                };
            });

            // Create a sorted list and store all the settings in it
            const getPriority = (condition: SettingsConditions) =>
                condition == null ? 0 : condition.getPriority();

            const settings: ConditionalSettingsDataList<SettingsData<S>> = new SortedList(
                (a, b) => getPriority(b.condition) - getPriority(a.condition)
            );
            settings.push.apply(settings, settingsData);

            // Return the settings
            return settings;
        };

        // Try loading the stored data, load the defaults on failure
        try {
            if (storedData) this.settings = getSettings(storedData);
            else this.settings = getSettings(getInitialSettings());
        } catch (e) {
            console.error("Something went wrong while loading the settings", e);
            this.settings = getSettings(getInitialSettings());
            // TODO: store backup of settings before they are overwritten by defaults
        }

        // Emit change events for all settings
        this.setDirty(false);
        const promises = this.settings.map(settings =>
            this.valueChange(settings.condition, settings.data.get, undefined, true)
        );
        await Promise.all(promises);
    }

    /**
     * Changes whether or not this file is dirty
     * @param dirty Whether or not this file is dirty
     */
    public setDirty(dirty: boolean): void {
        if (this.isDirty != dirty) {
            this.isDirty = dirty;
            SettingsManager.setDirty(this, dirty);
        }
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
        listener: (
            path: string,
            value: any,
            condition: SettingsConditions,
            previousValue: any
        ) => void | Promise<any>,
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

export type ParameterizedSettingsFile = SettingsFile<SettingsConfig>;
