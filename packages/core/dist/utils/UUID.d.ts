/**
 * Used to generate UUIDs
 */
export declare class UUID {
    static chars: string;
    /**
     * Gemerates a standard UUID
     * @returns The created UUID
     */
    static generate(): string;
    /**
     * Gemerates a numeric UUID
     * @returns The created UUID
     */
    static generateNumeric(): string;
    /**
     * Gemerates a short UUID
     * @returns The created UUID
     */
    static generateShort(): string;
}
