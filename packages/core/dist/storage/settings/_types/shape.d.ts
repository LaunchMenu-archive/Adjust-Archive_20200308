/**
 * A type that maps every value of an object to undefined, just capturing its shape
 */
export declare type Shape<D extends object> = {
    [S in keyof D]: D[S] extends object ? Shape<D[S]> : undefined;
};
