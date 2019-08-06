const strictSemverRegex = /^((\d+)\.(\d+)\.(\d)+)(-(.+))?$/;
const semverRegex = /^((\d+)\.(\d+)\.(\d+)(\.\d+)*)(-(.+))?$/;
export class Semver {
    /**
     * Creates a version in the semver format
     * @param major The version's major
     * @param minor The version's minor
     * @param patch The version's patch
     * @param label The version's label
     * @returns A semver string
     */
    static create(
        major: number = 0,
        minor: number = 0,
        patch: number = 0,
        label: string = ""
    ): string {
        return `${major}.${minor}.${patch}` + (label ? `-${label}` : "");
    }

    /**
     * Checks whether the given semver version is valid
     * @param version The version to check
     * @param strict Whether to check for an official samver version, when set to false, version allows for additional dot seperated values after the patch
     * @returns Whether the version is valid
     */
    static isValid(version: string, strict: boolean = true): boolean {
        if (strict) return !!version.match(strictSemverRegex);
        else return !!version.match(semverRegex);
    }

    /**
     * Checks whether version 1 is newer than version 2
     * @param version1 The first version to compare with
     * @param version2 The second version to compare with
     * @returns Whether version 1 is newer than version 2
     */
    static isNewer(version1: string, version2: string): boolean {
        // Extract the data using regex
        const match1 = version1.match(semverRegex);
        const match2 = version2.match(semverRegex);

        // Make sure both versions are valid before continuing any tests
        if (!match1) return false;
        if (!match2) return true;

        // Obtain the version 'number' text
        const v1numbers = match1[1];
        const v2numbers = match2[1];

        // If the versions are the same, check for default labels
        if (v1numbers == v2numbers) {
            // Obtain the labels of both versions
            const v1label = (match1[7] || "").toLowerCase();
            const v2label = (match2[7] || "").toLowerCase();
            const defLabels = ["pre-alpha", "alpha", "beta", "gamma", "delta", "rc"];

            // Obtain the indices of the labels
            const v1labelIndex = defLabels.findIndex(label => v1label.startsWith(label));
            const v2labelIndex = defLabels.findIndex(label => v2label.startsWith(label));
            // Check if indices are the same, if so use string comparison to find "the greater value"
            if (v1labelIndex == v2labelIndex) return v1label > v2label;

            // Otherwise choose the greater index
            return v1labelIndex > v2labelIndex;
        }

        // Otherwise use string comparison to find "the greater value"
        return v1numbers > v2numbers;
    }

    // Data extraction
    /**
     * Retrieves the nth part of the version number if present
     * @param version The version to get the data from
     * @param index The index to retrieve
     * @returns The value at the index
     */
    static getNth(version: string, index: number): number {
        const parts = version.split(".");
        const part = parts[index];
        if (part && part.match(/\d+/)) return Number(part);
    }

    /**
     * Retrieves the major of the semver version
     * @param version The version to get the data from
     * @returns The major of the version
     */
    static getMajor(version: string): number {
        if (!this.isValid(version)) return 0;
        return this.getNth(version, 0);
    }

    /**
     * Retrieves the minor of the semver version
     * @param version The version to get the data from
     * @returns The minor of the version
     */
    static getMinor(version: string): number {
        if (!this.isValid(version)) return 0;
        return this.getNth(version, 1);
    }

    /**
     * Retrieves the patch of the semver version
     * @param version The version to get the data from
     * @returns The patch of the version
     */
    static getPatch(version: string): number {
        if (!this.isValid(version)) return 0;
        return this.getNth(version, 2);
    }

    /**
     * Retrieves the major of the semver version
     * @param version The version to get the data from
     * @returns The major of the version
     */
    static getLabel(version: string): string {
        if (!this.isValid(version)) return "";
        return version.match(semverRegex)[7];
    }
}
