var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const data_1 = require("../data");
const settingsManager_1 = require("./settingsManager");
const settingsConditions_1 = require("./settingsConditions");
const eventEmitter_1 = require("../../utils/eventEmitter");
const extendedObject_1 = require("../../utils/extendedObject");
const sortedList_1 = require("../../utils/sortedList");
class SettingsFile extends eventEmitter_1.EventEmitter {
    /**
     * Creates a settingsFile to store settings for a certain module class
     * @param path The path to store the settings at
     * @param config The settings config
     */
    constructor(path, config) {
        super();
        // Store the path
        if (path_1.default.extname(path) == "")
            path += ".json";
        this.path = path;
        this.config = config;
        // Store the structure
        this.shape = this.extractShape(config);
        // Only the provided data will be used if no data is stored yet
        this.reload([
            {
                condition: undefined,
                data: this.extractDefault(config),
            },
        ]);
    }
    // Setup methods
    /**
     * Extracts the default values from a settings config
     * @param config The config of which to extract the default values
     * @returns The default values
     */
    extractDefault(config) {
        const data = {};
        extendedObject_1.ExtendedObject.forEach(config, (key, value) => {
            if (value.default !== undefined)
                data[key] = value.default;
            else
                data[key] = this.extractDefault(value);
        });
        return data;
    }
    /**
     * Extracts the value shape of the settings by mapping all defaults to undefined
     * @param config The config of which to extract the shape
     * @returns The shape of the settings
     */
    extractShape(config) {
        const data = {};
        extendedObject_1.ExtendedObject.forEach(config, (key, value) => {
            if (value.default !== undefined)
                data[key] = undefined;
            else
                data[key] = this.extractShape(value);
        });
        return data;
    }
    // Retrieval methods
    /**
     * Returns all settings and their conditions
     * @return All settings
     */
    getAllSettings() {
        return this.settings;
    }
    /**
     * Returns the shape of the settings data
     * @returns The shape, with all values being undefined
     */
    getStucture() {
        return this.shape;
    }
    /**
     * Gets a Data instance for the given condition
     * @param condition The condition for which to get (or create) a Data instance
     * @returns The retreived or created Data instance
     */
    getConditionData(condition) {
        // Get the settingsSetData if already defined
        let settingsSetData = this.settings
            .get()
            .find(settingSetData => settingSetData.condition.equals(condition));
        // If not previously defined, create it
        if (!settingsSetData) {
            const data = new data_1.Data(this.shape, false);
            data.on("change", this.valueChange.bind(this, condition), "SettingsFile");
            settingsSetData = {
                condition: condition,
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
    get(condition) {
        return this.getConditionData(condition).get;
    }
    // Altering settings
    /**
     * Gets the setter object of a Data instance for a particular condition
     * @param condition The condition for which to get the setter
     * @retursn The setter that was found
     */
    set(condition) {
        return this.getConditionData(condition).set;
    }
    /**
     * Processes events emitted by data objects, and forwards them to listeners (called by the data objects)
     * @param condition The condition of the changed data
     * @param changedProps The changed properties
     * @param previousProps The values that the properties had before
     */
    valueChange(condition, changedProps, previousProps) {
        extendedObject_1.ExtendedObject.forEachPaired([changedProps, previousProps], 
        // Emit all value changes
        (key, [newValue, oldValue], path) => {
            this.emit("change", path, newValue, condition, oldValue);
        }, 
        // Only recurse when we haven't hit a setting value yet
        (key, value, path) => !("default" in extendedObject_1.ExtendedObject.getField(this.config, path)), true);
    }
    // Saving
    /**
     * Saves the current data in the corresponding file
     */
    save() {
        const data = this.settings
            .filter(settingsSet => Object.keys(settingsSet.data.get).length > 0)
            .map(settingsSet => ({
            condition: settingsSet.condition.getData(),
            priority: settingsSet.condition.getPriority(),
            data: settingsSet.data.serialize(),
        }));
        settingsManager_1.SettingsManager.saveFile(this.path, data);
    }
    /**
     * Reloads the settings as are present in the stored file
     * @param initialSettings The settings to load if no file is present
     */
    reload(initialSettings) {
        // TODO: Only fire events of values that actually changed, and track their previous values
        // Load the previously stored data if present
        const storedData = settingsManager_1.SettingsManager.loadFile(this.path);
        // A method to load the specified settings data
        const getSettings = initialSettings => {
            // Create data objects for all of them
            const settingsData = (initialSettings || []).map(settings => {
                const data = new data_1.Data(settings.data);
                data.on("change", this.valueChange.bind(this, settings.condition), "SettingsFile");
                return {
                    condition: new settingsConditions_1.SettingsConditions(settings.condition, settings.priority || 0),
                    data: data,
                };
            });
            // Create a sorted list and store all the settings in it
            const getPriority = (condition) => condition == null ? 0 : condition.getPriority();
            const settings = new sortedList_1.SortedList((a, b) => getPriority(b.condition) - getPriority(a.condition));
            settings.push.apply(settings, settingsData);
            // Return the settings
            return settings;
        };
        // Try loading the stored data, load the defaults on failure
        try {
            if (storedData)
                this.settings = getSettings(storedData);
            else
                this.settings = getSettings(initialSettings);
        }
        catch (e) {
            console.error("Something went wrong while loading the settings", e);
            this.settings = getSettings(initialSettings);
            // TODO: store backup of settings before they are overwritten by defaults
        }
        // Emit change events for all settings
        this.settings.forEach(settings => {
            this.valueChange(settings.condition, settings.data.get, undefined);
        });
    }
    on(type, listener, name) {
        return super.on(type, listener, name);
    }
}
exports.SettingsFile = SettingsFile;
//# sourceMappingURL=settingsFile.js.map