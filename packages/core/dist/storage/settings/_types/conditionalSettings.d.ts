/**
 * Settings that apply only when the given condition is met
 */
export declare type ConditionalSettings<D extends object> = {
    condition: string;
    priority: number;
    ID: number;
    data: D;
};
