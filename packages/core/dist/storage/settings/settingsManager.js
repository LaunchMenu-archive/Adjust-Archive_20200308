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
        // The folder to store the data in
        this.dataPath = "data";
    }
    /**
     * Returns the settings file for the specified path, creates it if necessary
     * @param path The path to obtain the settings file for
     * @param config The config of the settings
     * @returns The settings file for the give path
     */
    getSettingsFile(path, config) {
        if (path_1.default.extname(path) == "")
            path += ".json";
        if (this.settings[path])
            return this.settings[path];
        // If the settingsFile isn't yet present, create it
        let settingsFile = (this.settings[path] = new settingsFile_1.SettingsFile(path, config));
        return settingsFile;
    }
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
}
exports.SettingsManager = new SettingsManagerSingleton();
//# sourceMappingURL=settingsManager.js.map