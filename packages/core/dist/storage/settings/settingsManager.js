var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const FS_1 = require("../../utils/FS");
const settingsFile_1 = require("./settingsFile");
class SettingsManagerSingleton {
    constructor() {
        // All the settings files that are opened (there should only be 1 instance per file)
        this.settings = {};
        // All the settings that are dirty
        this.dirtySettings = [];
        // The folder to store the data in
        this.dataPath = "data";
    }
    // Data management
    /**
     * Returns the absolute path to the data directory
     * @param path - The path to append to the data directory
     * @returns The absolute path to the directory
     */
    getAbsoluteDataPath(path = "") {
        // Get the path from the root to the indicated file
        return path_1.default.join(process.cwd(), this.dataPath, path);
    }
    /**
     * Stores the given data at the given path
     * @param path The path at which to store the data
     * @param contents The json data to store
     */
    saveFile(path, contents) {
        // Get the path
        path = this.getAbsoluteDataPath(path);
        // Get the directory from the path, and make sure it exists
        const dir = path_1.default.dirname(path);
        if (!FS_1.FS.existsSync(dir))
            FS_1.FS.mkpathSync(dir);
        // Turn the data to json and write at the path
        return FS_1.FS.writeFileSync(path, JSON.stringify(contents, null, 4));
    }
    /**
     * Loads the previously stored data at the given path
     * @param path The path from which to load the data
     * @returns The json data that was loaded
     */
    loadFile(path) {
        path = this.getAbsoluteDataPath(path);
        // Check if a file exists at this path
        if (FS_1.FS.existsSync(path)) {
            try {
                // If it exists, read the contents
                const contents = FS_1.FS.readFileSync(path, "utf8");
                // Return undefined if there are no contents
                if (contents.length == 0)
                    return;
                // Parse it to json
                const data = JSON.parse(contents);
                // Return the data
                return data;
            }
            catch (e) {
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
    fileExists(path) {
        path = this.getAbsoluteDataPath(path);
        return FS_1.FS.existsSync(path);
    }
    // Setting files management
    /**
     * Returns the settings file for the specified path, creates it if necessary
     * @param path The path to obtain the settings file for
     * @param config The config of the settings
     * @returns The settings file for the give path
     */
    async getSettingsFile(path, config) {
        if (path_1.default.extname(path) == "")
            path += ".json";
        if (this.settings[path])
            return this.settings[path];
        // If the settingsFile isn't yet present, create it
        let settingsFile = (this.settings[path] = await settingsFile_1.SettingsFile.createInstance(path, config));
        return settingsFile;
    }
    /**
     * Marks a settings file as dirty or 'undirty'
     * @param settingsFile The file to mark as diry
     * @param dirty Whether or not the file should be dirty
     */
    setDirty(settingsFile, dirty) {
        if (dirty) {
            // Remove the settings file fro the dirty settings array if present
            const index = this.dirtySettings.indexOf(settingsFile);
            if (index !== -1)
                this.dirtySettings.splice(index, 1);
        }
        else {
            // Add the settings file to the dirty settings array if it isn't in there yet
            const index = this.dirtySettings.indexOf(settingsFile);
            if (index === -1)
                this.dirtySettings.push(settingsFile);
        }
    }
    /**
     * Save all of the dirty settings files
     */
    saveAll() {
        this.dirtySettings.forEach(settingsFile => settingsFile.save());
    }
    /**
     * Reload all of the dirty settings files
     */
    async reloadAll() {
        await Promise.all(this.dirtySettings.map(settingsFile => settingsFile.reload()));
    }
}
exports.SettingsManager = new SettingsManagerSingleton();
//# sourceMappingURL=settingsManager.js.map