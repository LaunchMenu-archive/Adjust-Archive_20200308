/**
 * Takes parts of the given object
 */
export type PartialObject<T, S, K extends keyof S> = T extends object
    ? {[P in K]: P extends keyof T ? PartialObject<T[P], S[P], keyof S[P]> : undefined}
    : T;
