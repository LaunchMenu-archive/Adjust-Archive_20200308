var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FS_1 = require("./FS");
const path_1 = __importDefault(require("path"));
/**
 * A class dedicated to retrieving package files of modules
 */
class PackageRetrieverSingleton {
    constructor() {
        // Keep track of the packages already found, to reduce lookup
        this.packages = {};
    }
    /**
     * Requires a given path and returns the package of the module
     * @param path An absolute path to start the lookup at
     * @returns The closest package file
     */
    requireModulePackage(path) {
        // Remove any file names if present
        if (!FS_1.FS.lstatSync(path).isDirectory())
            path = path_1.default.dirname(path);
        // Check the parent directory as long as there is any, and store passeds folders
        let folders = [];
        while (path.length > 0) {
            // Check cache first
            if (this.packages[path])
                return this.packages[path];
            // Check whether there is a package in this folder
            const packagePath = path_1.default.join(path, "package.json");
            if (FS_1.FS.existsSync(packagePath) || path == ".") {
                // path=="." indicates hitting the root
                // Obtain the data
                let data;
                try {
                    data = JSON.parse(FS_1.FS.readFileSync(packagePath, "UTF8"));
                }
                catch (e) { }
                // Store the data for reuse
                this.packages[path] = data;
                while (folders.length > 0) {
                    path = path_1.default.join(path, folders.shift());
                    this.packages[path] = data;
                }
                // Return the package
                return data;
            }
            // If no package was found, try the parent folder
            folders.push(path_1.default.basename(path));
            path = path_1.default.dirname(path);
        }
    }
}
exports.PackageRetriever = new PackageRetrieverSingleton();
//# sourceMappingURL=packageRetriever.js.map