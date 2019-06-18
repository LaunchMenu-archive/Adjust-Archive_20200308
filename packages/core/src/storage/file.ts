import Path from "path";
import FS from "fs";
import {ExtendedObject} from "../utils/extendedObject";

// TODO: TO BE FINISHED
export default class File {
    private path: string;
    private fullPath: string;
    private format: any;
    private data: Object;

    constructor(filePath: string, format: Object) {
        this.path = filePath;
        this.fullPath = this.getClass().dataDir;
        this.format = format; //TODO: actually use the format for value validation
        this.reload(true);
    }
    public get(field?: string): any {}
    public change(path: string | any, value?: any): void {
        if (path instanceof Object) {
            value = path;
            path = "";
        }
    }
    public set(path: string, value: any): void {}
    public save(
        fields: Array<string> | Object,
        synchronous: boolean = false
    ): Promise<void> | void {}

    /**
     * Loads the data that is currently saved for this file on disk (if any at all)
     * @param synchronous Whether to read the file synchronously or asynchronously
     * @returns Whether or not any data was present on the drive
     */
    public reload(synchronous: boolean = false): Promise<boolean> | boolean {
        // Check if the file exists at all
        if (FS.existsSync(this.fullPath)) {
            if (synchronous) {
                // Read the file asynchronously, and return a promise that resoolves once the file is read
                return new Promise((resolve, reject) => {
                    FS.readFile(this.fullPath, "utf8", (err, data) => {
                        if (err) reject(err);
                        else
                            try {
                                // Try to assign the json data
                                this.data = JSON.parse(data);
                                resolve(true);
                            } catch (e) {
                                reject(e);
                            }
                    });
                });
            } else {
                // Read the file synchronously
                const data = FS.readFileSync(this.fullPath, "utf8");

                // Try to assign the json data
                this.data = JSON.parse(data);
                return true;
            }
        } else {
            // If it doesn't exist, indicate that it failed to load the file
            if (synchronous) return Promise.resolve(false);
            else return false;
        }
    }

    /**
     * Returns the class of this instance
     */
    private getClass(): typeof File {
        return this.constructor as typeof File;
    }

    /**
     * The directory in which these data files should be stored
     */
    public static dataDir = Path.join(process.cwd(), "data");
}
