import { EventEmitter } from "../../../utils/eventEmitter";
import { ISettingAttributeEvaluator, ISettingAttributeEvaluatorDependency } from "../_types/ISettingAttributeEvaluator";
import { SettingsFile } from "../settingsFile";
import { SettingsConditions } from "../settingsConditions/abstractSettingsConditions";
/**
 * A class to define a single property of a setting, used in shown GUI for the setting
 */
export declare class SettingProperty<T> extends EventEmitter {
    protected evaluator: ISettingAttributeEvaluator<T>;
    protected settingPath: string;
    protected settingsFile: SettingsFile<any>;
    protected settingsCondition: SettingsConditions;
    protected listenerUnregistrars: (() => void)[];
    protected initialized: boolean;
    protected propertyDependencies: SettingProperty<any>[];
    protected searchValue: string;
    protected settings: {
        [key: string]: any;
    };
    protected baseSettings: {
        [key: string]: any;
    };
    protected value: T;
    /**
     * Creates a new SettingProperty instance
     * @param settingPath The path of the setting that this property is from
     * @param settingsFile The settings file this property is for
     * @param settingsCondition The condition this property is for
     * @param evaluator The evaluator to use
     */
    constructor(settingPath: string, settingsFile: SettingsFile<any>, settingsCondition: SettingsConditions, evaluator: ISettingAttributeEvaluator<T>);
    /**
     * Retrieves the current value of the the property
     * @returns The current value
     */
    getValue(): T;
    /**
     * Reevaluates the current value of the property
     */
    protected evaluate(): void;
    /**
     * Retrieves whether or not this is a evaluator function
     * @returns Whether this is an evaluator function
     */
    protected isDynamicEvaluator(evaluator: ISettingAttributeEvaluator<T>): evaluator is {
        dependencies: {
            [key: string]: ISettingAttributeEvaluatorDependency;
        };
        searchDependent?: boolean;
        evaluator: (settings: {
            [key: string]: any;
        }, searchValue: string) => T;
    };
    /**
     * Sets the new search value being used
     * @param searchValue The search value
     */
    setSearchValue(searchValue: string): void;
    /**
     * Retrieves whether or not the value of this property depends on the search term
     * @returns Whether the value depends on the search term
     */
    isDependentOnSearch(): boolean;
    /**
     * Sets up a given function dependency
     * @param dependency The dependency function
     * @param key The keyt to save the depepndency under
     */
    protected setupFunctionDependency(dependency: (listener: (newValue: any) => void) => () => void, key: string): () => void;
    /**
     * Sets up a path setting dependency
     * @param dependency The dependency path
     * @param key The keyt to save the depepndency under
     */
    protected setupLocalSettingDependency(dependency: string, key: string): () => void;
    /**
     * Sets up a path property dependency
     * @param dependency The dependency path
     * @param key The keyt to save the depepndency under
     */
    protected setupLocalPropertyDependency(dependency: string, key: string): () => void;
    /**
     * Sets up the initial setting values and the listeners
     */
    protected setupSettings(): void;
    /**
     * Destrpys this property instance, cleaning up all listeners
     */
    destroy(): void;
    static matchesSearch(search: string): boolean;
    /**
     * Adds a listener to detect when the property changes
     * @param type The type of listener, I.e. value change
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification
     * @returns The name of the listener (generated if none was supplied
     */
    on(type: "change", listener: (value: T, oldValue: T) => void, name?: string): string;
    /**
     * Simply registers any event type using EventEmitter
     */
    on(type: string, listener: (...args: any) => void | Promise<any>, name?: string): string;
}
