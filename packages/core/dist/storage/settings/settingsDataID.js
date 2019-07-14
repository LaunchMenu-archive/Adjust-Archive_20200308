Object.defineProperty(exports, "__esModule", { value: true });
class SettingsDataID {
    constructor(ID, modulePath) {
        this.ID = ID;
        this.modulePath = modulePath;
    }
    /**
     * Returns whether this data ID is equivalent to another
     * @param settingsDataID The settings data ID to compare this to
     * @returns Whether they refer to the same data
     */
    equals(settingsDataID) {
        return (this.ID == settingsDataID.ID && this.modulePath == settingsDataID.modulePath);
    }
}
exports.SettingsDataID = SettingsDataID;
//# sourceMappingURL=SettingsDataID.js.map