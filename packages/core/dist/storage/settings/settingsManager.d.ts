import { SettingsFile } from "./settingsFile";
import { SettingsConfig } from "./_types/settingsConfig";
declare class SettingsManagerSingleton {
    protected settings: {
        [file: string]: SettingsFile<any>;
    };
    protected dirtySettings: SettingsFile<any>[];
    protected dataPath: string;
    constructor();
    /**
     * Returns the absolute path to the data directory
     * @param path - The path to append to the data directory
     * @returns The absolute path to the directory
     */
    protected getAbsoluteDataPath(path?: string): string;
    /**
     * Stores the given data at the given path
     * @param path The path at which to store the data
     * @param contents The json data to store
     */
    saveFile(path: string, contents: any): void;
    /**
     * Loads the previously stored data at the given path
     * @param path The path from which to load the data
     * @returns The json data that was loaded
     */
    loadFile(path: string): any;
    /**
     * Check whether a settings file exists with this path
     * @param path The path to check
     * @returns Whether or not the settings file exists
     */
    fileExists(path: string): boolean;
    /**
     * Returns the settings file for the specified path, creates it if necessary
     * @param path The path to obtain the settings file for
     * @param config The config of the settings
     * @returns The settings file for the give path
     */
    getSettingsFile<S extends SettingsConfig>(path: string, config: S): Promise<SettingsFile<S>>;
    /**
     * Removes a settings file for if it is no longer being used
     * @param path The path of the settings file
     * @param settingsFile The instance of the settings file
     * @returns Whether or not the settings file instance was removed
     */
    removeSettingsFile(path: string, settingsFile: SettingsFile<any>): boolean;
    /**
     * Destroys all settings file instances that have no listeners
     */
    destroySettingsFiles(): void;
    /**
     * Marks a settings file as dirty or 'undirty'
     * @param settingsFile The file to mark as diry
     * @param dirty Whether or not the file should be dirty
     */
    setDirty(settingsFile: SettingsFile<any>, dirty: boolean): void;
    /**
     * Save all of the dirty settings files
     */
    saveAll(): void;
    /**
     * Reload all of the dirty settings files
     */
    reloadAll(): Promise<void>;
}
export declare const SettingsManager: SettingsManagerSingleton;
export {};
