import {Package} from "./_types/package";
import {FS} from "./FS";
import Path from "path";

/**
 * A class dedicated to retrieving package files of modules
 */
class PackageRetrieverSingleton {
    // Keep track of the packages already found, to reduce lookup
    protected packages: {[key: string]: Package} = {};

    /**
     * Requires a given path and returns the package of the module
     * @param path An absolute path to start the lookup at
     * @returns The closest package file
     */
    public requireModulePackage(path: string): Package {
        // Remove any file names if present
        if (!FS.lstatSync(path).isDirectory()) path = Path.dirname(path);

        // Check the parent directory as long as there is any, and store passeds folders
        let folders = [];
        while (path.length > 0) {
            // Check cache first
            if (this.packages[path]) return this.packages[path];

            // Check whether there is a package in this folder
            const packagePath = Path.join(path, "package.json");
            if (FS.existsSync(packagePath) || path == ".") {
                // path=="." indicates hitting the root

                // Obtain the data
                let data;
                try {
                    data = JSON.parse(FS.readFileSync(packagePath, "UTF8"));
                } catch (e) {}

                // Store the data for reuse
                this.packages[path] = data;
                while (folders.length > 0) {
                    path = Path.join(path, folders.shift());
                    this.packages[path] = data;
                }

                // Return the package
                return data;
            }

            // If no package was found, try the parent folder
            folders.push(Path.basename(path));
            path = Path.dirname(path);
        }
    }
}

export const PackageRetriever = new PackageRetrieverSingleton();
