/**
 * Used to generate UUIDs
 */
export class UUID {
    static chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234456789";

    /**
     * Gemerates a standard UUID
     * @returns The created UUID
     */
    public static generate(): string {
        return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(
            /x/g,
            () => this.chars[Math.floor(Math.random() * this.chars.length)]
        );
    }

    /**
     * Gemerates a numeric UUID
     * @returns The created UUID
     */
    public static generateNumeric(): string {
        return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(
            /x/g,
            () => Math.floor(Math.random() * 10) + ""
        );
    }

    /**
     * Gemerates a short UUID
     * @returns The created UUID
     */
    public static generateShort(): string {
        return "xxxx-xxxx".replace(
            /x/g,
            () => this.chars[Math.floor(Math.random() * this.chars.length)]
        );
    }
}
