export declare class Semver {
    /**
     * Creates a version in the semver format
     * @param major The version's major
     * @param minor The version's minor
     * @param patch The version's patch
     * @param label The version's label
     * @returns A semver string
     */
    static create(major?: number, minor?: number, patch?: number, label?: string): string;
    /**
     * Checks whether the given semver version is valid
     * @param version The version to check
     * @param strict Whether to check for an official samver version, when set to false, version allows for additional dot seperated values after the patch
     * @returns Whether the version is valid
     */
    static isValid(version: string, strict?: boolean): boolean;
    /**
     * Checks whether version 1 is newer than version 2
     * @param version1 The first version to compare with
     * @param version2 The second version to compare with
     * @returns Whether version 1 is newer than version 2
     */
    static isNewer(version1: string, version2: string): boolean;
    /**
     * Retrieves the nth part of the version number if present
     * @param version The version to get the data from
     * @param index The index to retrieve
     * @returns The value at the index
     */
    static getNth(version: string, index: number): number;
    /**
     * Retrieves the major of the semver version
     * @param version The version to get the data from
     * @returns The major of the version
     */
    static getMajor(version: string): number;
    /**
     * Retrieves the minor of the semver version
     * @param version The version to get the data from
     * @returns The minor of the version
     */
    static getMinor(version: string): number;
    /**
     * Retrieves the patch of the semver version
     * @param version The version to get the data from
     * @returns The patch of the version
     */
    static getPatch(version: string): number;
    /**
     * Retrieves the major of the semver version
     * @param version The version to get the data from
     * @returns The major of the version
     */
    static getLabel(version: string): string;
}
