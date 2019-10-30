// You may thank prettier for these beautiful linebreaks and indentations

export type DeepReadonly<T> = T extends Function
    ? T
    : T extends Array<any>
    ? T
    : T extends Promise<any>
    ? T
    : T extends object
    ? {readonly [P in keyof T]: DeepReadonly<T[P]>}
    : T;

export type DeepPartial<T> = T extends object
    ? T extends Promise<any>
        ? T
        : {[P in keyof T]?: DeepPartial<T[P]>}
    : T;

// From: https://stackoverflow.com/a/49579497/8521718
export type RequiredKeys<T> = {
    [K in keyof T]: ({} extends {[P in K]: T[K]} ? never : K);
}[keyof T];

export type OptionalKeys<T> = {
    [K in keyof T]: ({} extends {[P in K]: T[K]} ? K : never);
}[keyof T];

// Only includes a field in an object if required
export type IfRequired<
    K extends string,
    O extends object,
    T extends any,
    N extends string = K
> = K extends RequiredKeys<O> // Check if data is required
    ? {[P in N]: T} // If it is, include it
    : {}; // Otherwise don't

// Check if one class extends another (prevents some error that is likely to be a bug)
export type ExtendsClass<K, X = void> = Omit<K, "new" | "prototype"> &
    (X extends void ? any : Constructor<X>);

// If data needs to be serialized
export type Json =
    | null
    | string
    | boolean
    | number
    | {
          [key: string]: Json;
      }
    | {
          length: number;
          [key: number]: Json;
      };

// valueof similar to keyof and deep valueof
export type Valueof<T> = T[keyof T];

// Omit to omit a field from an object
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

// A type to be used to map methods
export type Arguments<T> = T extends (...args: infer R) => any ? R : never;

// A mapp type
export type Map<S> = {[name: string]: S};

// Defines a type that constructs an instance of the passed argument
export type Constructor<T> = {new (...args: any[]): T};

export type PConstructor<T> = Function & {prototype: T};

// Defines a getter for the type being constructed
export type GetConstructed<T extends Constructor<any>> = T extends Constructor<infer S>
    ? S
    : never;

export type GetPConstructed<T extends PConstructor<any>> = T extends PConstructor<infer S>
    ? S
    : never;

// An object to represent the 'empty' object which may not have any properties like the default empty object may have for some reason
export type Empty = {"　": never};

// An object to check whether something is a complexyl empy object, usage: RareObject extends MyType ? :
export type RareObject = {SomeSuperRarePropertyName: symbol};

// A type to represent any jsx child
type JSXSingleChild = JSX.Element | number | string | boolean | null | undefined;
interface NestedJSXChild extends Array<NestedJSXChild | JSXSingleChild> {}
export type JSXchild = JSXSingleChild | NestedJSXChild;
