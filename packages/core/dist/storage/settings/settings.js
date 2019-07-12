Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
const eventEmitter_1 = require("../../utils/eventEmitter");
const extendedObject_1 = require("../../utils/extendedObject");
const sortedList_1 = require("../../utils/sortedList");
class Settings extends eventEmitter_1.EventEmitter {
    /**
     * Creates settings for a specific module instance
     * @param target The module instance to target
     */
    constructor(target) {
        super();
        this.target = target;
    }
    /**
     * Creates settings for a specific module instance
     * @param target The module instance to target
     */
    static async createInstance(target) {
        const settings = new this(target);
        settings.settingsFile = await target.getClass().getSettingsFile();
        // Load the settings that apply to this target
        // @ts-ignore
        settings.get = settings.loadApplicableSettingsFromFile();
        // Setup the listeners
        settings.setupSettingsFileListener();
        // Create the setters object
        // @ts-ignore
        settings.set = settings.setupSetters();
        return settings;
    }
    // Disposal
    /**
     * Properly disposes the object
     */
    destroy() {
        this.settingsFile.off("change", this.settingsFileListener);
    }
    // Setup methods
    /**
     * Gets the settings from the settings file and loads the ones that apply to this target
     * @returns The getter object for the settings
     */
    loadApplicableSettingsFromFile() {
        this.settingsPriorities = {};
        // Go through all the settingsSets and their conditions
        this.settingsFile.getAllSettings().forEach(settingsSet => {
            // Check if the conditions apply to this target
            const condition = settingsSet.condition;
            if (this.satisfiesCondition(condition)) {
                // Go through all the settings values
                extendedObject_1.ExtendedObject.forEach(settingsSet.data.get, (key, value, path, parentPath) => {
                    // Get the list to store the value in
                    const parent = extendedObject_1.ExtendedObject.getField(this.settingsPriorities, parentPath, true);
                    let field = parent[key];
                    // Create the list if absent
                    if (!field)
                        field = parent[key] = new sortedList_1.SortedList((a, b) => a.condition.getPriority() - b.condition.getPriority());
                    // Store the value
                    field.push({ condition: condition, value: value });
                }, true, true);
            }
        });
        // Retrieve all the highest priority settings
        const settings = {};
        extendedObject_1.ExtendedObject.forEach(this.settingsPriorities, (key, value, path, parentPath) => {
            // Get the highest priority value, and store it
            const val = value.get(-1).value;
            const parent = extendedObject_1.ExtendedObject.getField(settings, parentPath, true);
            parent[key] = val;
        }, true);
        this.settings = new data_1.Data(settings);
        return this.settings.get;
    }
    /**
     * Adds the necessary listeners to the settings file, to keep the data in this bject synchronised
     */
    setupSettingsFileListener() {
        this.settingsFileListener = (path, value, condition) => {
            if (this.satisfiesCondition(condition)) {
                // Keep track of whether or not the settings value has to be updated
                let updateValue = false;
                // Get the list to contain the value
                const list = extendedObject_1.ExtendedObject.getField(this.settingsPriorities, path);
                // Check if the value has been remvoed, change or inserted
                if (value === undefined) {
                    // If the value has been removed, remove it from the list
                    const oldIndex = list.pop(item => item.condition.equals(condition));
                    // Check if it was the highest priority element
                    updateValue = list.length == oldIndex;
                }
                else {
                    // Get the actual array from the sorted list
                    const array = list.get();
                    // Get the item that contains the condition and value
                    let item = array.find(item => item.condition.equals(condition));
                    // Check if the item actually exists
                    if (item) {
                        // If so, change its value
                        item.value = value;
                    }
                    else {
                        // If it didn't exist yet, create it
                        item = { condition: condition, value: value };
                        list.push(item);
                    }
                    // Find the index of the setting
                    const index = array.findIndex(item => item.condition.equals(condition));
                    // Check if it was the highest priority element
                    updateValue = index == list.length - 1;
                }
                // If the value updated, emit a change
                if (updateValue) {
                    const value = list.get(-1).value;
                    // Retrieve the current value
                    const oldValue = extendedObject_1.ExtendedObject.getField(this.settings.get, path);
                    // Replace the setting by the new highest priority element
                    this.settings.changeData(extendedObject_1.ExtendedObject.translatePathToObject(path, value));
                    // Send a change event
                    this.emit("change", path, value, oldValue);
                }
            }
        };
        this.settingsFile.on("change", this.settingsFileListener);
    }
    // Altering settings setup methods
    /**
     * Creates setter methods for all of the settings
     * @returns A setter object that takes a condition as a second argument
     */
    setupSetters() {
        // Get the class
        const Class = this.__proto__.constructor;
        // Perform the static method 'createSetters' to turn the data structure intoa setters structure
        return Class.createSetters(this.settingsFile.getStucture(), this.changeData.bind(this));
    }
    /**
     * Goes through the initial data in order to map all fields to setter methods on the set object
     * @param object The object for which to create setter functions
     * @param path The path of the given object from the root in this data
     * @returns The mapped object where all values are callable setter functions
     */
    static createSetters(object, change, path = "") {
        return extendedObject_1.ExtendedObject.map(object, (value, key) => {
            // Create an object path from the string path, an leave the property value blank
            const top = {};
            const propPath = extendedObject_1.ExtendedObject.translatePathToObject(path, top);
            // Create the set method
            const setter = (value, condition) => {
                // Change the top most part of the data path (the value)
                top[key] = value;
                // Emit the change
                return change(propPath, condition);
            };
            // Add any subsetters to the setter if necessary by recursing
            if (value instanceof Object) {
                const p = (path ? path + "." : "") + key;
                // Assign the child setters
                Object.assign(setter, this.createSetters(value, change, p));
            }
            // Map the data to the setter
            return setter;
        });
    }
    // Data altering methods
    /**
     * Changes the data for a passed condition
     * @param data The fields to change
     * @param condition The condition to change them fore
     * @returns A promise that resolves when all listeners resolved
     */
    changeData(data, condition) {
        // Check if the condition applies to this target, if not throw an error
        if (!this.satisfiesCondition(condition))
            throw new Error("The target of these settings doesn't satisfy the given condition");
        // Return the setter object from the settingsFile
        return this.settingsFile.getConditionData(condition).changeData(data);
    }
    /**
     * Checks whether the target of these settings satisfy the passed condition
     * @param condition The condition to check for
     * @returns Whether or not the target satisfies the condition
     */
    satisfiesCondition(condition) {
        return !condition || condition.matches(this.target);
    }
    // Data retrieval methods
    /**
     * Retrieves the data object storing all the applicable settings
     * @returns The settings Data instance
     */
    getSettings() {
        return this.settings;
    }
    on(type, listener, name) {
        return super.on(type, listener, name);
    }
}
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map