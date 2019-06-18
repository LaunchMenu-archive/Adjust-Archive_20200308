export default class File {
    private path;
    private fullPath;
    private format;
    private data;
    constructor(filePath: string, format: Object);
    get(field?: string): any;
    change(path: string | any, value?: any): void;
    set(path: string, value: any): void;
    save(fields: Array<string> | Object, synchronous?: boolean): Promise<void> | void;
    /**
     * Loads the data that is currently saved for this file on disk (if any at all)
     * @param synchronous Whether to read the file synchronously or asynchronously
     * @returns Whether or not any data was present on the drive
     */
    reload(synchronous?: boolean): Promise<boolean> | boolean;
    /**
     * Returns the class of this instance
     */
    private getClass;
    /**
     * The directory in which these data files should be stored
     */
    static dataDir: string;
}
