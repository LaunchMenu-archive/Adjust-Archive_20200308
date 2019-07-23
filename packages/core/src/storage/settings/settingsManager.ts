import Path from "path";
import {FS} from "../../utils/FS";
import {SettingsFile} from "./settingsFile";
import {SettingsConfig} from "./_types/settingsConfig";
import {ExtendedObject} from "../../utils/extendedObject";
import {Module} from "../../module/module";

class SettingsManagerSingleton {
    // All the settings files that are opened (there should only be 1 instance per file)
    protected settings: {[file: string]: Promise<SettingsFile<any>>} = {};

    // All the settings that are dirty
    protected dirtySettings: SettingsFile<any>[] = [];

    // The folder to store the data in
    protected dataPath: string = "data";

    constructor() {}

    // Data management
    /**
     * Returns the absolute path to the data directory
     * @param path - The path to append to the data directory
     * @returns The absolute path to the directory
     */
    protected getAbsoluteDataPath(path: string = ""): string {
        // Get the path from the root to the indicated file
        return Path.join(process.cwd(), this.dataPath, path);
    }

    /**
     * Stores the given data at the given path
     * @param path The path at which to store the data
     * @param contents The json data to store
     */
    public saveFile(path: string, contents: any): void {
        // Get the path
        path = this.getAbsoluteDataPath(path);

        // Get the directory from the path, and make sure it exists
        const dir = Path.dirname(path);
        if (!FS.existsSync(dir)) FS.mkpathSync(dir);

        // Turn the data to json and write at the path
        return FS.writeFileSync(path, JSON.stringify(contents, null, 4));
    }

    /**
     * Loads the previously stored data at the given path
     * @param path The path from which to load the data
     * @returns The json data that was loaded
     */
    public loadFile(path: string): any {
        path = this.getAbsoluteDataPath(path);

        // Check if a file exists at this path
        if (FS.existsSync(path)) {
            try {
                // If it exists, read the contents
                const contents = FS.readFileSync(path, "utf8");

                // Return undefined if there are no contents
                if (contents.length == 0) return;

                // Parse it to json
                const data = JSON.parse(contents);

                // Return the data
                return data;
            } catch (e) {
                // If anything goes wrong, just log an error. TODO: Properly handle these errors
                console.error(`Something went wrong while retrieving ${path}:`, e);
            }
        }
    }

    /**
     * Check whether a settings file exists with this path
     * @param path The path to check
     * @returns Whether or not the settings file exists
     */
    public fileExists(path: string): boolean {
        path = this.getAbsoluteDataPath(path);
        return FS.existsSync(path);
    }

    // Setting files management
    /**
     * Retrieves the settings file for the specified path, creates it if necessary
     * @param path The path to obtain the settings file for
     * @param config The config of the settings
     * @returns The settings file for the give path
     */
    public async getSettingsFile<S extends SettingsConfig>(
        path: string,
        config: S
    ): Promise<SettingsFile<S>>;

    /**
     * Retrieves the settings file for the specified path, creates it if necessary
     * @param moduleClass The module class to retrieve the settings file for
     * @returns The settings file for the give path
     */
    public async getSettingsFile<S extends SettingsConfig>(
        moduleClass: typeof Module
    ): Promise<SettingsFile<S>>;

    /**
     * Retrieves the settings file for the specified path, creates it if necessary
     * @param path The path to obtain the settings file for, or a module class itself
     * @param config The config of the settings
     * @returns The settings file for the give path
     */
    public async getSettingsFile<S extends SettingsConfig>(
        path: string | typeof Module,
        config?: S
    ): Promise<SettingsFile<S>> {
        // Check if a module class was provided
        let moduleClass: typeof Module;
        if (typeof path == "function") {
            moduleClass = path;
            path = moduleClass.getPath();
        }
        if (Path.extname(path) == "js")
            path = Path.resolve(Path.dirname(path), Path.basename(path));
        if (Path.extname(path) == "") path += ".json";

        // Check if the settings file already existed
        if (this.settings[path]) return this.settings[path];

        // If the settingsFile isn't yet present, create it
        if (moduleClass) {
            return (this.settings[path] = SettingsFile.createInstance(moduleClass));
        } else {
            return (this.settings[path] = SettingsFile.createInstance(path, config));
        }
    }

    /**
     * Removes a settings file for if it is no longer being used
     * @param path The path of the settings file
     * @param settingsFile The instance of the settings file
     * @returns Whether or not the settings file instance was removed
     */
    public async removeSettingsFile(
        path: string,
        settingsFile: SettingsFile<any>
    ): Promise<boolean> {
        if (Path.extname(path) == "js")
            path = Path.resolve(Path.dirname(path), Path.basename(path));
        if (Path.extname(path) == "") path += ".json";
        if (this.settings[path] && (await this.settings[path]) == settingsFile) {
            const isDirty = this.dirtySettings.indexOf(settingsFile) === -1;
            if (isDirty) return false;

            delete this.settings[path];
            return true;
        }

        return false;
    }

    /**
     * Destroys all settings file instances that have no listeners
     */
    public async destroySettingsFiles(): Promise<void> {
        const promises = Object.values(this.settings).map(async settingsFile => {
            return (await settingsFile).destroy();
        });
        await Promise.all(promises);
    }

    /**
     * Marks a settings file as dirty or 'undirty'
     * @param settingsFile The file to mark as diry
     * @param dirty Whether or not the file should be dirty
     */
    public setDirty(settingsFile: SettingsFile<any>, dirty: boolean): void {
        if (dirty) {
            // Remove the settings file fro the dirty settings array if present
            const index = this.dirtySettings.indexOf(settingsFile);
            if (index !== -1) this.dirtySettings.splice(index, 1);
        } else {
            // Add the settings file to the dirty settings array if it isn't in there yet
            const index = this.dirtySettings.indexOf(settingsFile);
            if (index === -1) this.dirtySettings.push(settingsFile);
        }
    }

    /**
     * Save all of the dirty settings files
     */
    public saveAll(): void {
        this.dirtySettings.forEach(settingsFile => settingsFile.save());
    }

    /**
     * Reload all of the dirty settings files
     */
    public async reloadAll(): Promise<void> {
        await Promise.all(this.dirtySettings.map(settingsFile => settingsFile.reload()));
    }
}
export const SettingsManager = new SettingsManagerSingleton();
