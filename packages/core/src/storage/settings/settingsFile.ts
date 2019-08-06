import {DeepReadonly, Json} from "../../utils/_types/standardTypes";
import {ConditionalSettings} from "./_types/conditionalSettings";
import {ConditionalSettingsDataList} from "./_types/conditionalSettingsDataList";
import {Data} from "../data";
import {SettingsManager} from "./settingsManager";
import {SettingsConfig} from "./_types/settingsConfig";
import {SettingsConfigSetData} from "./_types/settingsConfigSetData";
import {EventEmitter} from "../../utils/eventEmitter";
import {ExtendedObject} from "../../utils/extendedObject";
import {SortedList} from "../../utils/sortedList";
import {Shape} from "./_types/shape";
import {SettingsDataID} from "./SettingsDataID";
import {Module} from "../../module/module";
import {SettingsConditionSerializer} from "./settingsConditions/settingsConditionsSerializer";
import {SettingsConditions} from "./settingsConditions/abstractSettingsConditions";
import {SettingsConfigData} from "./_types/settingsConfigData";
import {SettingsConfigSet} from "./_types/settingsConfigSet";
import {StoredSettings} from "./_types/storedSettings";
import {ConditionalSettingsData} from "./_types/conditionalSettingsData";
import {Semver} from "../../utils/semver";

export class SettingsFile<S extends SettingsConfig> extends EventEmitter {
    protected settings: ConditionalSettingsDataList<SettingsConfigData<S>>;
    protected config: SettingsConfig;
    protected path: string;

    // The module class that these are the settings for, may be undefined if not associated with module
    protected moduleClass: typeof Module;

    // Used to initialise new instance of SettingsData
    protected shape: Shape<SettingsConfigData<S>>;

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
        this.shape = this.extractConfigShape(config.settings);
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
            const moduleConfig = moduleClass.getConfig();
            config = {
                version: moduleConfig.version,
                settings: moduleConfig.settings,
                migrators: moduleConfig.settingsMigrators,
            } as S;
            path = moduleClass.getPath();
        }

        //  Create an instance
        const settingsFile = new this(path, config);
        settingsFile.moduleClass = moduleClass;

        // Only the provided data will be used if no data is stored yet
        await settingsFile.reload(() => [
            {
                condition: {type: "constant", priority: 0},
                ID: 0,
                data: settingsFile.extractDefault(config.settings),
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
    protected extractDefault<C extends SettingsConfigSet>(
        configSettings: C
    ): SettingsConfigSetData<C> {
        const data = {};
        ExtendedObject.forEach(configSettings, (key, value) => {
            if (value.default !== undefined) data[key] = value.default;
            else data[key] = this.extractDefault(value as SettingsConfigSet);
        });
        return data as SettingsConfigSetData<C>;
    }

    /**
     * Extracts the value shape of the settings by mapping all defaults to undefined
     * @param config The config of which to extract the shape
     * @returns The shape of the settings
     */
    protected extractConfigShape<C extends SettingsConfigSet>(
        config: C
    ): Shape<SettingsConfigSetData<C>> {
        const data = {};
        ExtendedObject.forEach(config, (key, value) => {
            if (value.default !== undefined) data[key] = undefined;
            else data[key] = this.extractConfigShape(value as SettingsConfigSet);
        });
        return data as Shape<SettingsConfigSetData<C>>;
    }

    /**
     * Extracts the value shape of the settings by mapping all non objects to undefined
     * @param data The data of which to extract the shape
     * @returns The shape of the Data
     */
    protected extractShape<C extends {[name: string]: Json}>(data: C): Shape<C> {
        const out = {};
        ExtendedObject.forEach(data, (key, value) => {
            if (ExtendedObject.isPlainObject(value)) out[key] = this.extractShape(value);
            else out[key] = undefined;
        });
        return out as Shape<C>;
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
    public getAllSettings(): ConditionalSettingsDataList<SettingsConfigData<S>> {
        return this.settings;
    }

    /**
     * Retrieves the shape of the settings data
     * @returns The shape, with all values being undefined
     */
    public getStucture(): Shape<SettingsConfigData<S>> {
        return this.shape;
    }

    /**
     * Gets a Data instance for the given condition
     * @param condition The condition for which to get (or create) a Data instance
     * @param create Whether or not to create the conditional data if absent
     * @returns The retrieved or created Data instance
     */
    public getConditionData(
        condition?: SettingsConditions | SettingsDataID | number,
        create: boolean = true
    ): Data<SettingsConfigData<S>> {
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
            if (!create) return;

            // Create the data
            const data = new Data<SettingsConfigData<S>>(
                (this.shape as unknown) as SettingsConfigData<S>,
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
    public get(condition?: SettingsConditions): DeepReadonly<SettingsConfigData<S>> {
        return this.getConditionData(condition).get;
    }

    // Altering settings
    /**
     * Removes the data associated with a given condition
     * @param condition The condition for which to remove a Data instance
     */
    public removeConditionData(
        condition?: SettingsConditions | SettingsDataID | number
    ): void {
        // Normalize the conditions
        if (!(condition instanceof SettingsConditions) && condition !== undefined)
            condition = this.getCondition(condition);

        // Get the settingsSetData if already defined
        let settingsSetDataIndex = this.settings
            .get()
            .findIndex(settingSetData =>
                settingSetData.condition.equals(condition as SettingsConditions)
            );

        // If the data is present, remove it
        if (settingsSetDataIndex != -1)
            this.settings.get().splice(settingsSetDataIndex, 1);
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
            [changedProps, previousProps, this.config.settings],
            // Emit all value changes
            (key, [newValue, oldValue, config], path) => {
                // Make sure the value is in the config (might not be the cas for arbitraray top level values)
                if (!config) return;

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
            // Only recurse when we haven't hit a setting value yet TODO: check if this can be optimised by extracting the field from "value"
            (key, value, path) =>
                !("default" in ExtendedObject.getField(this.config.settings, path)),
            true
        );

        // Wait for the promises to resolve
        await Promise.all(promises);
    }

    // Saving and loading related methods
    /**
     * Saves the current data in the corresponding file
     */
    public save(): void {
        const settings = this.settings
            .filter(settingsSet => Object.keys(settingsSet.data.get).length > 0)
            .map(
                settingsSet =>
                    ({
                        condition: SettingsConditionSerializer.serialize(
                            settingsSet.condition
                        ),
                        ID: settingsSet.ID,
                        data: settingsSet.data.serialize(),
                    } as ConditionalSettings<any>)
            );
        SettingsManager.saveFile(this.path, {
            version: this.config.version,
            data: settings,
        });
        this.setDirty(false);
    }

    /**
     * Migrates settings data of a previous version to the latest version
     * @param version:The current version of the data
     * @param settings The actual settings currently stored
     * @returns The input data migrated to the format of the latest version
     */
    protected migrateSettings(
        version: string,
        settings: ConditionalSettings<SettingsConfigData<any>>[]
    ): ConditionalSettings<SettingsConfigData<S>>[] {
        if (this.config.migrators instanceof Function) {
            return this.config.migrators(
                version,
                settings,
                this.extractDefault(this.config.settings)
            );
        } else {
            // Find the base data in the settings
            const getBaseData = settings =>
                settings.reduce(
                    (best, {condition: {type, priority}, data}) =>
                        type == "constant" && priority < best.priority
                            ? {priority: priority, data: data}
                            : best,
                    {priority: Infinity, data: {}}
                ).data;
            let baseData;

            // Obtain and sort the migrators
            let migrators = Object.entries(this.config.migrators);
            migrators = migrators.sort(([version1], [version2]) =>
                Semver.isNewer(version1, version2) ? 1 : -1
            );

            // Find the index of the migrator to get to setting's current version
            const prevMigratorIndex = migrators.findIndex(
                ([mVersion]) => version == mVersion
            );

            // Go through all the migrators that have to applied
            for (let index = prevMigratorIndex + 1; index < migrators.length; index++) {
                const migrator = migrators[index][1];

                // Extract the shape of the data for this version
                baseData = getBaseData(settings);
                const dataShape = this.extractShape(baseData);

                // Apply the migrator to all settings conditions
                settings = settings.map(cs => {
                    // Make sure that the data always has the expected shape (by filling abscent data with undefined)
                    let data = ExtendedObject.copyData(
                        dataShape,
                        cs.data,
                        null,
                        true,
                        true,
                        false
                    ) as any;

                    // Migrate the data
                    data = migrator(data);

                    // Return the new data
                    return {
                        ID: cs.ID,
                        condition: cs.condition,
                        data,
                    };
                });
            }

            // Find the base condition, and add the missing default data
            baseData = getBaseData(settings);
            this.migrateSettingsAddDefaults(baseData);

            // Return the result
            return settings;
        }
    }

    /**
     * Adds missing default values to the provided plain data
     * @param data The data to add the default values to
     */
    protected migrateSettingsAddDefaults(data: SettingsConfigData<any>): void {
        // Go through all setting values
        ExtendedObject.forEachPaired(
            [this.config.settings, data],
            (key, [config, dataValue], path, parentPath) => {
                // If no value is present in the data, copy the field from the defaults
                if (dataValue === undefined) {
                    const parent = ExtendedObject.getField(data, parentPath, true);
                    parent[key] = config.default;
                }
            },
            // Only recurse when we haven't hit a setting value yet
            (key, [config]) => !("default" in config),
            true
        );
    }

    /**
     * Reloads the settings as are present in the stored file
     * @param getInitialSettings A getter for the settings to load if no file is present
     * @returns A promise that resolves once all events have resolved
     */
    public async reload(
        getInitialSettings?: () => ConditionalSettings<SettingsConfigData<S>>[]
    ): Promise<void> {
        // TODO: Only fire events of values that actually changed, and track their previous values
        // Load the previously stored data if present
        const storedData = SettingsManager.loadFile(this.path) as StoredSettings<
            SettingsConfigData<S>
        >;

        // A method to load the specified settings data
        const getSettings = (
            initialSettings: ConditionalSettings<SettingsConfigData<S>>[]
        ) => {
            // Create data objects for all of them
            const settingsData = (initialSettings || []).map(settings => {
                const condition = SettingsConditionSerializer.deserialize(
                    settings.condition
                );
                const keepEmpty = condition.equals(undefined); // Only the default settings should keep empty objects, to keep the proper structure
                const data = new Data(settings.data, false, keepEmpty);
                data.on("change", this.valueChange.bind(this, condition), "SettingsFile");
                return {
                    condition: condition,
                    ID: settings.ID,
                    data: data,
                };
            });

            // Create a sorted list and store all the settings in it
            const getPriority = (condition: SettingsConditions) =>
                condition == null ? 0 : condition.getPriority();

            const settings: ConditionalSettingsDataList<
                SettingsConfigData<S>
            > = new SortedList(
                (a, b) => getPriority(b.condition) - getPriority(a.condition)
            );
            settings.push.apply(settings, settingsData);

            // Return the settings
            return settings;
        };

        // Try loading the stored data, load the defaults on failure
        try {
            if (storedData) {
                // Retrieves the data of the settings
                let data = storedData.data;

                // Migrate the settings if necessary
                if (storedData.version != this.config.version)
                    data = this.migrateSettings(storedData.version, data);

                // Transform the data into the proper settings
                this.settings = getSettings(data);
            } else {
                this.settings = getSettings(getInitialSettings());
            }
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
