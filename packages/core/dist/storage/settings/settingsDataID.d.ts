export declare class SettingsDataID {
    ID: number;
    modulePath: string;
    constructor(ID: number, modulePath: string);
    /**
     * Returns whether this data ID is equivalent to another
     * @param settingsDataID The settings data ID to compare this to
     * @returns Whether they refer to the same data
     */
    equals(settingsDataID: SettingsDataID): boolean;
}
