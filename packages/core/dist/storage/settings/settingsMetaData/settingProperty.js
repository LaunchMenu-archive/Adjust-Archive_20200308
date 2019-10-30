Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("../../../utils/eventEmitter");
const extendedObject_1 = require("../../../utils/extendedObject");
/**
 * A class to define a single property of a setting, used in shown GUI for the setting
 */
class SettingProperty extends eventEmitter_1.EventEmitter {
    /**
     * Creates a new SettingProperty instance
     * @param settingPath The path of the setting that this property is from
     * @param settingsFile The settings file this property is for
     * @param settingsCondition The condition this property is for
     * @param evaluator The evaluator to use
     */
    constructor(settingPath, settingsFile, settingsCondition, evaluator) {
        super();
        this.initialized = false;
        // Keep track of property dependencies in order to update their search values
        this.propertyDependencies = [];
        // The latest search value
        this.searchValue = "";
        // The settings to be provided to the evaluator
        this.settings = {};
        this.baseSettings = {};
        this.settingPath = settingPath;
        this.settingsFile = settingsFile;
        this.settingsCondition = settingsCondition;
        // Normalize the evaluator a bit
        this.evaluator =
            evaluator instanceof Function
                ? {
                    dependencies: { setting: settingPath },
                    searchDependent: false,
                    evaluator,
                }
                : Object.assign({ searchDependent: false }, evaluator);
        // Set up the initial setting values and the setting listeners
        this.setupSettings();
    }
    // Main methods
    /**
     * Retrieves the current value of the the property
     * @returns The current value
     */
    getValue() {
        return this.value;
    }
    /**
     * Reevaluates the current value of the property
     */
    evaluate() {
        if (!("evaluator" in this.evaluator) ||
            (this.searchValue === undefined && this.isDependentOnSearch()))
            return;
        // Obtain the new value
        const newValue = this.evaluator.evaluator(Object.assign({}, this.baseSettings, this.settings), this.searchValue);
        // Inform listeners of the value change
        if (newValue != this.value) {
            const oldValue = this.value;
            this.value = newValue;
            this.emit("change", newValue, oldValue);
        }
    }
    // Search related methods
    /**
     * Sets the new search value being used
     * @param searchValue The search value
     */
    setSearchValue(searchValue) {
        this.searchValue = searchValue;
        if (!this.isDependentOnSearch())
            return;
        // Update child
        const updatedDependency = this.propertyDependencies.reduce((prev, cur) => {
            if (cur.isDependentOnSearch()) {
                cur.setSearchValue(searchValue);
                return true;
            }
            return prev;
        }, false);
        // If we updated a dependency, it will already have performed reevaluation
        if (!updatedDependency)
            this.evaluate();
    }
    /**
     * Retrieves whether or not the value of this property depends on the search term
     * @returns Whether the value depends on the search term
     */
    isDependentOnSearch() {
        return (("evaluator" in this.evaluator && this.evaluator.searchDependent) ||
            this.propertyDependencies.reduce((prev, cur) => cur.isDependentOnSearch() || prev, false));
    }
    // Maintenance methods
    /**
     * Sets up a given function dependency
     * @param dependency The dependency function
     * @param key The keyt to save the depepndency under
     */
    setupFunctionDependency(dependency, key) {
        // Listen for value changes
        const listener = newValue => {
            // If this is a base condition
            this.settings[key] = newValue;
            if (this.initialized)
                this.evaluate();
        };
        // Register listener
        return dependency(listener);
    }
    /**
     * Sets up a path setting dependency
     * @param dependency The dependency path
     * @param key The keyt to save the depepndency under
     */
    setupLocalSettingDependency(dependency, key) {
        // Load the initial value
        this.baseSettings[key] = extendedObject_1.ExtendedObject.getField(this.settingsFile.get(), dependency);
        if (this.settingsCondition && !this.settingsCondition.equals(null))
            this.settings[key] =
                extendedObject_1.ExtendedObject.getField(this.settingsFile.get(this.settingsCondition), dependency) || this.baseSettings[key];
        // Listen for value changes
        const listener = (newValue, condition, oldValue) => {
            // If this is a base condition
            if (!condition || condition.equals(null)) {
                this.baseSettings[key] = newValue;
                if (this.settings[key] === undefined)
                    this.evaluate();
                // If this is the specified condition
            }
            else if (this.settingsCondition &&
                this.settingsCondition.equals(condition)) {
                this.settings[key] = newValue;
                this.evaluate();
            }
        };
        // Register the listener
        this.settingsFile.on(`change.${dependency}`, listener);
        //return unregister function for it
        return () => this.settingsFile.off(`change.${dependency}`, listener);
    }
    /**
     * Sets up a path property dependency
     * @param dependency The dependency path
     * @param key The keyt to save the depepndency under
     */
    setupLocalPropertyDependency(dependency, key) {
        // Get the evaluator data for the property
        const settings = this.settingsFile.getNormalizedSettingsConfig();
        const propertyEvaluator = extendedObject_1.ExtendedObject.getField(settings, dependency);
        // Create a property
        const property = new SettingProperty(dependency.replace(/\.[^\.]*$/, ""), // Remove the property name
        this.settingsFile, this.settingsCondition, propertyEvaluator);
        this.propertyDependencies.push(property);
        // Get initial value
        this.settings[key] = property.getValue();
        // Setup listener
        const listener = (value, oldValue) => {
            this.settings[key] = value;
            this.evaluate();
        };
        property.on("change", listener);
        // Setup a unregister method
        return () => property.destroy();
    }
    /**
     * Sets up the initial setting values and the listeners
     */
    setupSettings() {
        if (!("evaluator" in this.evaluator))
            return;
        this.settingPath.split(".").shift();
        // Group the dependencies
        const dep = this.evaluator.dependencies;
        this.listenerUnregistrars = Object.keys(dep).map(key => {
            const dependency = dep[key];
            if (dependency instanceof Function) {
                return this.setupFunctionDependency(dependency, key);
            }
            else {
                // Get the parent of the dependency, to detect if it's a property or setting
                const nodes = dependency.split(".");
                nodes.pop();
                const parent = extendedObject_1.ExtendedObject.getField(this.settingsFile.get(), nodes.join("."));
                // If the parent is an object, the dependency is a setting
                if (parent instanceof Object) {
                    return this.setupLocalSettingDependency(dependency, key);
                }
                else {
                    return this.setupLocalPropertyDependency(dependency, key);
                }
            }
        });
        // Evaluate the initial value
        this.initialized = true;
        // if (!this.isDependentOnSearch())
        this.evaluate();
    }
    /**
     * Destrpys this property instance, cleaning up all listeners
     */
    destroy() {
        if (!("evaluator" in this.evaluator))
            return;
        // Unregister all listeners
        this.listenerUnregistrars.forEach(f => f());
    }
    // Static methods
    static matchesSearch(search) {
        return true;
    }
    on(type, listener, name) {
        return super.on(type, listener, name);
    }
}
exports.SettingProperty = SettingProperty;
//# sourceMappingURL=settingProperty.js.map