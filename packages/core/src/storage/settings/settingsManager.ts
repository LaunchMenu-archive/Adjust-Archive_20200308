import Path from "path";
import {FS} from "../../utils/FS";
import {SettingsFile} from "./settingsFile";
import {SettingsConfig} from "./_types/settingsConfig";

class SettingsManagerSingleton {
    // All the settings files that are opened (there should only be 1 instance per file)
    protected settings: {[file: string]: SettingsFile<any>} = {};

    // The folder to store the data in
    protected dataPath: string = "data";

    constructor() {}

    /**
     * Returns the settings file for the specified path, creates it if necessary
     * @param path The path to obtain the settings file for
     * @param config The config of the settings
     * @returns The settings file for the give path
     */
    public getSettingsFile<S extends SettingsConfig>(
        path: string,
        config: S
    ): SettingsFile<S> {
        if (Path.extname(path) == "") path += ".json";
        if (this.settings[path]) return this.settings[path];

        // If the settingsFile isn't yet present, create it
        let settingsFile = (this.settings[path] = new SettingsFile<S>(path, config));
        return settingsFile;
    }

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
}
export const SettingsManager = new SettingsManagerSingleton();
