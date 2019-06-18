import { SettingsFile } from "./settingsFile";
import { SettingsConfig } from "./_types/settingsConfig";
declare class SettingsManagerSingleton {
    protected settings: {
        [file: string]: SettingsFile<any>;
    };
    protected dataPath: string;
    constructor();
    /**
     * Returns the settings file for the specified path, creates it if necessary
     * @param path The path to obtain the settings file for
     * @param config The config of the settings
     * @returns The settings file for the give path
     */
    getSettingsFile<S extends SettingsConfig>(path: string, config: S): SettingsFile<S>;
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
}
export declare const SettingsManager: SettingsManagerSingleton;
export {};
