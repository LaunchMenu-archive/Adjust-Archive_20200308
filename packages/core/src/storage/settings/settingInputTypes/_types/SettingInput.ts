import {ParentModule, ChildModule} from "../../../../module/_types/moduleContract";

/**
 * The base setting input type
 */
export type SettingInput<V, C extends {}> = ChildModule<{
    /**
     * Sets the current value
     * @param value The value of the setting
     */
    setValue(value: V): Promise<void>;

    /**
     * Sets the constraint to use on the value
     * @param constraint The constraint
     */
    setConstraint(constraint: C): Promise<void>;
}>;
export type SettingInputParent<V> = ParentModule<{
    /**
     * Sets the error message if the current input is invalid
     * @param error The error message
     */
    setErrorMessage(error: string): Promise<void>;

    /**
     * Sets the new value
     * @param value The new value of the setting
     */
    setValue(value: V): Promise<void>;
}>;
export type SettingInputContract<V, C> = {
    parent: SettingInputParent<V>;
    child: SettingInput<V, C>;
};
