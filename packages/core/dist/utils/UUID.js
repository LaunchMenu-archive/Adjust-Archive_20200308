Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Used to generate UUIDs
 */
class UUID {
    /**
     * Gemerates a standard UUID
     * @returns The created UUID
     */
    static generate() {
        return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(/x/g, () => this.chars[Math.floor(Math.random() * this.chars.length)]);
    }
    /**
     * Gemerates a numeric UUID
     * @returns The created UUID
     */
    static generateNumeric() {
        return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(/x/g, () => Math.floor(Math.random() * 10) + "");
    }
    /**
     * Gemerates a short UUID
     * @returns The created UUID
     */
    static generateShort() {
        return "xxxx-xxxx".replace(/x/g, () => this.chars[Math.floor(Math.random() * this.chars.length)]);
    }
}
UUID.chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234456789";
exports.UUID = UUID;
//# sourceMappingURL=UUID.js.map