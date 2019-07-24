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
        path = this.normalizeExtension(path);
        path = this.getAbsoluteDataPath(path);
        return FS_1.FS.existsSync(path);
    }
    /**
     * Makes sure that the path has a valid extension
     * @param path The path to normalize
     * @returns The normalized path
     */
    normalizeExtension(path) {
        if (path_1.default.extname(path) == ".js")
            path = path.substring(0, path.length - path_1.default.extname(path).length);
        if (path_1.default.extname(path) == "")
            path += ".json";
        return path;
    }
    /**
     * Retrieves the settings file for the specified path, creates it if necessary
     * @param path The path to obtain the settings file for, or a module class itself
     * @param config The config of the settings
     * @returns The settings file for the give path
     */
    async getSettingsFile(path, config) {
        // Check if a module class was provided
        let moduleClass;
        if (typeof path == "function") {
            moduleClass = path;
            path = moduleClass.getPath();
        }
        path = this.normalizeExtension(path);
        // Check if the settings file already existed
        if (this.settings[path])
            return this.settings[path];
        // If the settingsFile isn't yet present, create it
        if (moduleClass) {
            return (this.settings[path] = settingsFile_1.SettingsFile.createInstance(moduleClass));
        }
        else {
            return (this.settings[path] = settingsFile_1.SettingsFile.createInstance(path, config));
        }
    }
    /**
     * Removes a settings file for if it is no longer being used
     * @param path The path of the settings file
     * @param settingsFile The instance of the settings file
     * @returns Whether or not the settings file instance was removed
     */
    async removeSettingsFile(path, settingsFile) {
        path = this.normalizeExtension(path);
        if (this.settings[path] && (await this.settings[path]) == settingsFile) {
            const isDirty = this.dirtySettings.indexOf(settingsFile) === -1;
            if (isDirty)
                return false;
            delete this.settings[path];
            return true;
        }
        return false;
    }
    /**
     * Destroys all settings file instances that have no listeners
     */
    async destroySettingsFiles() {
        const promises = Object.values(this.settings).map(async (settingsFile) => {
            return (await settingsFile).destroy();
        });
        await Promise.all(promises);
    }
    /**
     * Marks a settings file as dirty or 'undirty'
     * @param settingsFile The file to mark as diry
     * @param dirty Whether or not the file should be dirty
     */
    setDirty(settingsFile, dirty) {
        if (!dirty) {
            // Remove the settings file from the dirty settings array if present
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
        // Make a copy of the dirty settings since items will be removed by saving
        const copy = [...this.dirtySettings];
        if (copy.length > 0)
            console.log("saved:", copy.map(sf => sf["path"]));
        // Save the settings
        copy.forEach(settingsFile => settingsFile.save());
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