var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// TODO: TO BE FINISHED
class File {
    constructor(filePath, format) {
        this.path = filePath;
        this.fullPath = this.getClass().dataDir;
        this.format = format; //TODO: actually use the format for value validation
        this.reload(true);
    }
    get(field) { }
    change(path, value) {
        if (path instanceof Object) {
            value = path;
            path = "";
        }
    }
    set(path, value) { }
    save(fields, synchronous = false) { }
    /**
     * Loads the data that is currently saved for this file on disk (if any at all)
     * @param synchronous Whether to read the file synchronously or asynchronously
     * @returns Whether or not any data was present on the drive
     */
    reload(synchronous = false) {
        // Check if the file exists at all
        if (fs_1.default.existsSync(this.fullPath)) {
            if (synchronous) {
                // Read the file asynchronously, and return a promise that resoolves once the file is read
                return new Promise((resolve, reject) => {
                    fs_1.default.readFile(this.fullPath, "utf8", (err, data) => {
                        if (err)
                            reject(err);
                        else
                            try {
                                // Try to assign the json data
                                this.data = JSON.parse(data);
                                resolve(true);
                            }
                            catch (e) {
                                reject(e);
                            }
                    });
                });
            }
            else {
                // Read the file synchronously
                const data = fs_1.default.readFileSync(this.fullPath, "utf8");
                // Try to assign the json data
                this.data = JSON.parse(data);
                return true;
            }
        }
        else {
            // If it doesn't exist, indicate that it failed to load the file
            if (synchronous)
                return Promise.resolve(false);
            else
                return false;
        }
    }
    /**
     * Returns the class of this instance
     */
    getClass() {
        return this.constructor;
    }
}
/**
 * The directory in which these data files should be stored
 */
File.dataDir = path_1.default.join(process.cwd(), "data");
exports.default = File;
//# sourceMappingURL=file.js.map