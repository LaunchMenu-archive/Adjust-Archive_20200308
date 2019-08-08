import { Valueof, Map } from "./_types/standardTypes";
import { PartialObject } from "./_types/partialObject";
export declare class ExtendedObject extends Object {
    /**
     * Checks whether a passed object is a plain javascript object
     * @param obj The object to perform the operation on
     * @returns Whether or not the object is a plain javascipt object
     */
    static isPlainObject(obj: any): obj is {
        [key: string]: any;
    };
    /**
     * Maps the values of an object to a new object
     * @param obj The object to perform the operation on
     * @param func The function to use for the mapping, where the params are value, key, and the return value is used as the new value
     * @returns The object created as a mapping of the values of this object
     */
    static mapValues<O, T>(obj: O, func: (value: O[keyof O], key: string) => T): {
        [P in keyof O]: T;
    };
    /**
     * Maps the values of an object to a new object, alias for mapValues
     * @param obj The object to perform the operation on
     * @param func The function to use for the mapping, where the params are value, key, and the return value is used as the new value
     * @returns The object created as a mapping of the values of this object
     */
    static map<O, T>(obj: O, func: (value: O[keyof O], key: string) => T): {
        [P in keyof O]: T;
    };
    /**
     * Maps the keys of an object to a new object
     * @param obj The object to perform the operation on
     * @param func The function to use for the mapping, where the params are key, value, and the return value is used as the new key
     * @returns The object created as a mapping of the keys of this object
     */
    static mapKeys<S>(obj: {
        [name: string]: S;
    }, func: (key: string, value: S) => string): {
        [name: string]: S;
    };
    /**
     * Maps the keys and values of an object to a new object
     * @param obj The object to perform the operation on
     * @param func The function to use for the mapping, where the params are key, value, and the return value is an array with the key as the first index, and value as the second
     * @returns The object created as a mapping of the keys and values of this object
     */
    static mapPairs<S, T>(obj: {
        [name: string]: S;
    }, func: (key: string, value: S) => [string, T]): {
        [name: string]: T;
    };
    /**
     * Creates an object from the given entry array
     * @param entries The entries to create an object from
     * @returns The resulting object
     */
    static fromEntries<S>(entries: [string, S][]): {
        [key: string]: S;
    };
    /**
     * Filters the some fields from the object
     * @param obj The object to perform the operation on
     * @param func The function to use to filter, where the params are value and key
     * @returns The object created which contains all fields that the func returned true for
     */
    static filter<S extends Object>(obj: S, func: (value: S[keyof S], key: string) => boolean): Partial<S>;
    /**
     * Creates an object containing of the defined fields
     * @param obj The object to perform the operation on
     * @param fields A list of fields to include in the object
     * @returns The object created which contains all specified fields
     */
    static project(obj: object, fields: Array<string>): object;
    /**
     * Calls the provided method on all key value pairs
     * @param obj The object to perform the operation on
     * @param func The function to call for each of the pairs, receives key and value as parameters
     * @param recurse Whether or notto recurse on a child object, a function can be provided that will receive the key and value as parameters, and returns whether or not to recurse
     * @param includeRecurseObj Whether the object that is recursed on should also be called on the function
     * @param path The path to include to the callback of where we are at in the object
     */
    static forEach<S>(obj: {
        [name: string]: S;
    }, func: (key: string, value: S, path: string, parentPath: string) => void, recurse?: ((key: string, value: S, path: string, parentPath: string) => boolean) | boolean, includeRecurseObj?: boolean, path?: string): void;
    /**
     * Calls the provided method on all key value pairs that are available in each object
     * @param objects The array of objects to perform the operation on
     * @param func The function to call for each of the pairs, receives key and value as parameters
     * @param recurse Whether or notto recurse on a child object, a function can be provided that will receive the key and value as parameters, and returns whether or not to recurse
     * @param firstObjectLeading Whether the first object dictates the structure, I.e. if a subsequent object doesn't contain a substructure, it appears as if it does have the structured but is filled with undefined.
     * @param path The path to include to the callback of where we are at in the object
     */
    static forEachPaired(objects: object[], func: (key: string, values: any[], path: string, parentPath: string) => void, recurse?: ((key: string, values: any[], path: string, parentPath: string) => boolean) | boolean, firstObjectLeading?: boolean, path?: string): void;
    /**
     * Computes a return value based on all fields of the object, and the given function
     * @param obj The object to perform the operation on
     * @param func The function to use for the reduction, where the params are prevValue, value and key
     * @param initial The initial value to use for the reduction (will be returned directly on an empty object)
     * @param recurse Whether or notto recurse on a child object, a function can be provided that will receive the key and value as parameters, and returns whether or not to recurse
     * @param path The path to include to the callback of where we are at in the object
     * @returns The result of the reduction, based on the provided function
     * //TODO: add recusive intellisense
     */
    static reduce<O extends object, V = any>(obj: O, func: (result: V, value: Valueof<O>, key: string, path: string) => V, initial?: V, recurse?: ((key: string, value: Valueof<O>, path: string) => boolean) | boolean, path?: string): V;
    /**
     * Gets the value at the given path of the given object
     * @param obj The object to retrieve the path from
     * @param path The path to return the value for in object, E.G. `field`, `some.path.field`
     * @param createIfAbsent Whether or not to create the path if absent, defaults to false
     * @returns The data found (or created) at the end of this path
     */
    static getField(obj: object, path: string | string[], createIfAbsent?: boolean): any;
    /**
     * Retrieves a value that matches your constraint given by a function
     * @param obj The object to perform the operation on
     * @param func The function to use in order to verify if this is the item you are looking for, where the params are value and key
     * @returns The first value that was found to match your constraint, if any
     * @public
     */
    static findValue(obj: object, func: (value: any, key: string) => boolean): any;
    /**
     * Retrieves a value that matches your constraint given by a function, alias for findValue
     * @param obj The object to perform the operation on
     * @param func The function to use in order to verify if this is the item you are looking for, where the params are value and key
     * @returns The first value that was found to match your constraint, if any
     * @public
     */
    static find(obj: object, func: (value: any, key: string) => boolean): any;
    /**
     * Retrieves a key that matches your constraint given by a function
     * @param obj The object to perform the operation on
     * @param func The function to use in order to verify if this is the item you are looking for, where the params are key and value
     * @returns The first key that was found to match your constraint, if any
     * @public
     */
    static findKey(obj: object, func: (key: string, value: any) => boolean): string;
    /**
     * Retrieves a pair that matches your constraint given by a function
     * @param obj The object to perform the operation on
     * @param func The function to use in order to verify if this is the item you are looking for, where the params are key and value
     * @returns The first pair that was found to match your constraint, if any, in the form of an array with the key at index 0 and the value at index 1
     * @public
     */
    static findPair(obj: object, func: (key: string, value: any) => boolean): [string, any];
    /**
     * Creates an object containing the given value at the given path
     * @param path The path to create in this object, E.G. `field`, `some.path.field`
     * @param value The value to store at the top of this object
     * @returns An object containing the value
     * @private
     */
    static translatePathToObject(path: string | Array<string>, value: any): object;
    /**
     * Copies the data at a specific path from a source object to a destination object
     * @param src The object to get the data from
     * @param dest The object to transfer the data to
     * @param path The path of the field to transfer, E.G. `field`, `some.path.field`
     * @returns Just another reference to the passed dest object
     */
    static copyField(src: object, dest: object, path: string | Array<string>): object;
    static readonly overwrite: unique symbol;
    /**
     * Copies the data from a source object to a destination object, according to the copyModel
     * @param src The object to get the data from
     * @param dest The object to transfer the data to
     * @param copyModel The model of the data to copy (an object that contains a subset of the paths of src, where final values are ignored)
     * May also be a function that decides whether or not to copy a value from src
     * @param keepUndefined Whether or not to explicitely keep 'undefined' values in the output
     * @param keepEmpty Whether or not to explicitely keep empty objects in the output
     * @param overwriteValues If set to false, only data that is not present in dest will be copied
     * @param path The path of the data so far (used by copyModel if it's a function)
     * @returns Just another reference to the passed dest object
     */
    static copyData<S extends Map<any>, D extends object, C extends Map<any> = S>(src: S, dest: D, copyModel?: C | ((data: {
        path: string;
        srcValue: any;
        destValue: any;
        hasSrcValue: boolean;
        hasDestValue: boolean;
        recursing: boolean;
        key: string;
    }) => boolean), keepUndefined?: boolean, keepEmpty?: boolean, overwriteValues?: boolean, path?: string): D & PartialObject<S, C, keyof C>;
    /**
     * Checks if the contents of object 1 and 2 are equal, except for subobjects
     * @param obj1 The first object
     * @param obj2 The second object
     * @returns Whether or not the contents of the two objects are equivalent
     */
    static equals(obj1: object, obj2: object): boolean;
    /**
     * Checks if the contents of object 1 and 2 are equal, including subobjects
     * @param obj1 The first object
     * @param obj2 The second object
     * @returns Whether or not the contents of the two objects are equivalent
     */
    static deepEquals(obj1: object, obj2: object): boolean;
    /**
     * Checks if the contents of object 2 are contained in object 1, excluding subobjects
     * @param obj1 The first object
     * @param obj2 The second object
     * @returns Whether or not the contents of object 1 are contained in object 2
     */
    static contains(obj1: object, obj2: object): boolean;
    /**
     * Checks if the contents of object 2 are contained in object 1, including subobjects
     * @param obj1 The first object
     * @param obj2 The second object
     * @returns Whether or not the contents of object 1 are contained in object 2
     */
    static deepContains(obj1: object, obj2: object): boolean;
}
