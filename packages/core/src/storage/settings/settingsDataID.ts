export class SettingsDataID {
    // The ID of the individual data
    public settingsID: number;

    // The path to module class
    public modulePath: string;

    constructor(ID: number, modulePath: string) {
        this.settingsID = ID;
        this.modulePath = modulePath;
    }

    /**
     * Returns whether this data ID is equivalent to another
     * @param settingsDataID The settings data ID to compare this to
     * @returns Whether they refer to the same data
     */
    public equals(settingsDataID: SettingsDataID): boolean {
        return (
            this.settingsID == settingsDataID.settingsID &&
            this.modulePath == settingsDataID.modulePath
        );
    }
}
