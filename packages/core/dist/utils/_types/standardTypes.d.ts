export declare type DeepReadonly<T> = T extends Function ? T : T extends Array<any> ? T : T extends Promise<any> ? T : T extends object ? {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
} : T;
export declare type DeepPartial<T> = T extends object ? T extends Promise<any> ? T : {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export declare type RequiredKeys<T> = {
    [K in keyof T]: ({} extends {
        [P in K]: T[K];
    } ? never : K);
}[keyof T];
export declare type OptionalKeys<T> = {
    [K in keyof T]: ({} extends {
        [P in K]: T[K];
    } ? K : never);
}[keyof T];
export declare type IfRequired<K extends string, O extends object, T extends any, N extends string = K> = K extends RequiredKeys<O> ? {
    [P in N]: T;
} : {};
export declare type ExtendsClass<K, X = void> = Omit<K, "new" | "prototype"> & (X extends void ? any : Constructor<X>);
export declare type Json = null | string | boolean | number | {
    [key: string]: Json;
} | {
    length: number;
    [key: number]: Json;
};
export declare type Valueof<T> = T[keyof T];
export declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare type Arguments<T> = T extends (...args: infer R) => any ? R : never;
export declare type Map<S> = {
    [name: string]: S;
};
export declare type Constructor<T> = {
    new (...args: any[]): T;
};
export declare type PConstructor<T> = Function & {
    prototype: T;
};
export declare type GetConstructed<T extends Constructor<any>> = T extends Constructor<infer S> ? S : never;
export declare type GetPConstructed<T extends PConstructor<any>> = T extends PConstructor<infer S> ? S : never;
export declare type Empty = {
    "　": never;
};
export declare type RareObject = {
    SomeSuperRarePropertyName: symbol;
};
