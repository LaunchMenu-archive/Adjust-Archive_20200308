/**
 * A deep partial type, that stops 'recursion' on anything that it is not a plain object.
 */
export declare type JsonPartial<T> = T extends object ? {
    [P in keyof T]?: JsonPartial<T[P]>;
} : T;
