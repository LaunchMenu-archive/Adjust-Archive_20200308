import {EventEmitter} from "../../../utils/eventEmitter";
import {
    ISettingAttributeEvaluator,
    ISettingAttributeEvaluatorDependency,
} from "../_types/ISettingAttributeEvaluator";
import {ExtendedObject} from "../../../utils/extendedObject";
import {SettingsFile} from "../settingsFile";
import {SettingsConditions} from "../settingsConditions/abstractSettingsConditions";
import {SettingsSetProperties} from "./settingsSetProperties";

/**
 * A class to define a single property of a setting, used in shown GUI for the setting
 */
export class SettingProperty<T> extends EventEmitter {
    // The input evaluator
    protected evaluator: ISettingAttributeEvaluator<T>;

    // The settings file, and specific setting path this property is for
    protected settingPath: string;
    protected settingsFile: SettingsFile<any>;
    protected settingsCondition: SettingsConditions;

    // An object storing all listeners in order to dispose them properly
    protected listenerUnregistrars: (() => void)[];
    protected initialized: boolean = false;

    // Keep track of property dependencies in order to update their search values
    protected propertyDependencies: SettingProperty<any>[] = [];

    // The latest search value
    protected searchValue: string = "";

    // The settings to be provided to the evaluator
    protected settings: {[key: string]: any} = {};
    protected baseSettings: {[key: string]: any} = {};

    // The current value of the property
    protected value: T;

    /**
     * Creates a new SettingProperty instance
     * @param settingPath The path of the setting that this property is from
     * @param settingsFile The settings file this property is for
     * @param settingsCondition The condition this property is for
     * @param evaluator The evaluator to use
     */
    public constructor(
        settingPath: string,
        settingsFile: SettingsFile<any>,
        settingsCondition: SettingsConditions,
        evaluator: ISettingAttributeEvaluator<T>
    ) {
        super();
        this.settingPath = settingPath;
        this.settingsFile = settingsFile;
        this.settingsCondition = settingsCondition;

        // Normalize the evaluator a bit

        if (
            evaluator instanceof Function ||
            (evaluator instanceof Object && "evaluator" in evaluator)
        )
            this.evaluator =
                evaluator instanceof Function
                    ? {
                          dependencies: {setting: settingPath},
                          searchDependent: false,
                          evaluator,
                      }
                    : {
                          searchDependent: false,
                          ...evaluator,
                      };
        else {
            this.value = evaluator;
            this.evaluator = evaluator;
        }

        // Set up the initial setting values and the setting listeners
        this.setupSettings();
    }

    // Main methods
    /**
     * Retrieves the current value of the the property
     * @returns The current value
     */
    public getValue(): T {
        return this.value;
    }

    /**
     * Reevaluates the current value of the property
     */
    protected evaluate(): void {
        if (
            !this.isDynamicEvaluator(this.evaluator) ||
            (this.searchValue === undefined && this.isDependentOnSearch())
        )
            return;

        // Obtain the new value
        const newValue = this.evaluator.evaluator(
            {...this.baseSettings, ...this.settings},
            this.searchValue
        );

        // Inform listeners of the value change
        if (newValue != this.value) {
            const oldValue = this.value;
            this.value = newValue;
            this.emit("change", newValue, oldValue);
        }
    }

    /**
     * Retrieves whether or not this is a evaluator function
     * @returns Whether this is an evaluator function
     */
    protected isDynamicEvaluator(
        evaluator: ISettingAttributeEvaluator<T>
    ): evaluator is {
        dependencies: {[key: string]: ISettingAttributeEvaluatorDependency};
        searchDependent?: boolean;
        evaluator: (settings: {[key: string]: any}, searchValue: string) => T;
    } {
        return this.evaluator instanceof Object && "evaluator" in this.evaluator;
    }

    // Search related methods
    /**
     * Sets the new search value being used
     * @param searchValue The search value
     */
    public setSearchValue(searchValue: string): void {
        this.searchValue = searchValue;
        if (!this.isDependentOnSearch()) return;

        // Update child
        const updatedDependency = this.propertyDependencies.reduce((prev, cur) => {
            if (cur.isDependentOnSearch()) {
                cur.setSearchValue(searchValue);
                return true;
            }
            return prev;
        }, false);

        // If we updated a dependency, it will already have performed reevaluation
        if (!updatedDependency) this.evaluate();
    }

    /**
     * Retrieves whether or not the value of this property depends on the search term
     * @returns Whether the value depends on the search term
     */
    public isDependentOnSearch(): boolean {
        return (
            (this.isDynamicEvaluator(this.evaluator) && this.evaluator.searchDependent) ||
            this.propertyDependencies.reduce(
                (prev, cur) => cur.isDependentOnSearch() || prev,
                false
            )
        );
    }

    // Maintenance methods
    /**
     * Sets up a given function dependency
     * @param dependency The dependency function
     * @param key The keyt to save the depepndency under
     */
    protected setupFunctionDependency(
        dependency: (listener: (newValue: any) => void) => () => void,
        key: string
    ): () => void {
        // Listen for value changes
        const listener = newValue => {
            // If this is a base condition
            this.settings[key] = newValue;
            if (this.initialized) this.evaluate();
        };

        // Register listener
        return dependency(listener);
    }

    /**
     * Sets up a path setting dependency
     * @param dependency The dependency path
     * @param key The keyt to save the depepndency under
     */
    protected setupLocalSettingDependency(dependency: string, key: string): () => void {
        // Load the initial value
        this.baseSettings[key] = ExtendedObject.getField(
            this.settingsFile.get(),
            dependency
        );
        if (this.settingsCondition && !this.settingsCondition.equals(null))
            this.settings[key] =
                ExtendedObject.getField(
                    this.settingsFile.get(this.settingsCondition),
                    dependency
                ) || this.baseSettings[key];

        // Listen for value changes
        const listener = (newValue, condition, oldValue) => {
            // If this is a base condition
            if (!condition || condition.equals(null)) {
                this.baseSettings[key] = newValue;
                if (this.settings[key] === undefined) this.evaluate();
                // If this is the specified condition
            } else if (
                this.settingsCondition &&
                this.settingsCondition.equals(condition)
            ) {
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
    protected setupLocalPropertyDependency(dependency: string, key: string): () => void {
        const parts = dependency.split(".");
        const prop = parts.pop();
        const dependencySettingPath = parts.join(".");

        // Get the evaluator data for the property
        const settingDefinition = ExtendedObject.getField(
            this.settingsFile.getConfig().settings,
            dependencySettingPath
        );
        const propertyEvaluator = SettingsSetProperties.getNormalizedSettingDefinition(
            dependencySettingPath,
            settingDefinition
        )[prop];

        // Create a property
        const property = new SettingProperty(
            dependencySettingPath,
            this.settingsFile,
            this.settingsCondition,
            propertyEvaluator
        );
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
    protected setupSettings(): void {
        if (!this.isDynamicEvaluator(this.evaluator)) return;

        this.settingPath.split(".").shift();

        // Group the dependencies
        const dep = this.evaluator.dependencies;
        this.listenerUnregistrars = Object.keys(dep).map(key => {
            const dependency = dep[key];
            if (dependency instanceof Function) {
                return this.setupFunctionDependency(dependency, key);
            } else {
                // Get the parent of the dependency, to detect if it's a property or setting
                const nodes = dependency.split(".");
                nodes.pop();
                const parent = ExtendedObject.getField(
                    this.settingsFile.get(),
                    nodes.join(".")
                );

                // If the parent is an object, the dependency is a setting
                if (parent instanceof Object) {
                    return this.setupLocalSettingDependency(dependency, key);
                } else {
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
    public destroy(): void {
        if (!this.isDynamicEvaluator(this.evaluator)) return;

        // Unregister all listeners
        this.listenerUnregistrars.forEach(f => f());
    }

    // Static methods
    public static matchesSearch(search: string): boolean {
        return true;
    }

    // Events
    /**
     * Adds a listener to detect when the property changes
     * @param type The type of listener, I.e. value change
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification
     * @returns The name of the listener (generated if none was supplied
     */
    public on(
        type: "change",
        listener: (value: T, oldValue: T) => void,
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
