import { SettingsConditions } from "../settingsConditions/abstractSettingsConditions";
import { SettingsConfigSet } from "./settingsConfigSet";
import { SettingDefinition } from "./settingDefinition";
/**
 * A function to register a listener for a setting
 */
export declare type SettingsListenerRegistrar<V> = (
/**
 * The listener to be registered,
 * The return value of the register call will be a method that can be called to unregister the listener
 */
listener: (
/** The new value of the setting */
value: V, 
/** The condition under which this is now stored */
condition: SettingsConditions, 
/** The old value of the setting */
previousValue: V) => void | Promise<any>) => {
    /**
     * A method used to unregister the listener that was registered
     */
    (): void;
};
/**
 * An object mapping the settings config set to listener registrars
 */
export declare type SettingsListenerRegistrarObject<S extends SettingsConfigSet> = {
    [P in keyof S]: S[P] extends SettingDefinition<infer V, any> ? SettingsListenerRegistrar<V> : S[P] extends SettingsConfigSet ? SettingsListenerRegistrarObject<S[P]> : S[P];
};
