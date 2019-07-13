export class SettingsDataID {
    // The ID of the individual data
    public ID: number;

    // The path to module class
    public modulePath: string;

    constructor(ID: number, modulePath: string) {
        this.ID = ID;
        this.modulePath = modulePath;
    }

    /**
     * Returns whether this data ID is equivalent to another
     * @param settingsDataID The settings data ID to compare this to
     * @returns Whether they refer to the same data
     */
    public equals(settingsDataID: SettingsDataID): boolean {
        return (
            this.ID == settingsDataID.ID && this.modulePath == settingsDataID.modulePath
        );
    }
}
