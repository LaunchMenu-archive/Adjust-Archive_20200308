import {Valueof, Map} from "./_types/standardTypes";
import {PartialObject} from "./_types/partialObject";

//TODO: improve typing like with the copyData method
export class ExtendedObject extends Object {
    // Testing methods
    /**
     * Checks whether a passed object is a plain javascript object
     * @param obj The object to perform the operation on
     * @returns Whether or not the object is a plain javascipt object
     */
    public static isPlainObject(obj: any): obj is {[key: string]: any} {
        // @ts-ignore
        return obj && obj.__proto__ && obj.__proto__.constructor == Object;
    }

    // Mapping methods
    /**
     * Maps the values of an object to a new object
     * @param obj The object to perform the operation on
     * @param func The function to use for the mapping, where the params are value, key, and the return value is used as the new value
     * @returns The object created as a mapping of the values of this object
     */
    public static mapValues<O, T>(
        obj: O,
        func: (value: O[keyof O], key: string) => T
    ): {[P in keyof O]: T} {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // Create an output object
        const out = {};

        // Go through all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            // Call the passed func to map the value
            const newValue = func(obj[key], key);

            // Store the mapped value
            out[key] = newValue;
        }

        // Return the output object
        return out as any;
    }

    /**
     * Maps the values of an object to a new object, alias for mapValues
     * @param obj The object to perform the operation on
     * @param func The function to use for the mapping, where the params are value, key, and the return value is used as the new value
     * @returns The object created as a mapping of the values of this object
     */
    public static map<O, T>(
        obj: O,
        func: (value: O[keyof O], key: string) => T
    ): {[P in keyof O]: T} {
        return this.mapValues(obj, func);
    }

    /**
     * Maps the keys of an object to a new object
     * @param obj The object to perform the operation on
     * @param func The function to use for the mapping, where the params are key, value, and the return value is used as the new key
     * @returns The object created as a mapping of the keys of this object
     */
    public static mapKeys<S>(
        obj: {[name: string]: S},
        func: (key: string, value: S) => string
    ): {[name: string]: S} {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // Create an output object
        const out = {};

        // Go through all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            // Call the passed func to map the key
            const newKey = func(key, obj[key]);

            // Store the mapped key
            out[newKey] = obj[key];
        }

        // Return the output object
        return out;
    }

    /**
     * Maps the keys and values of an object to a new object
     * @param obj The object to perform the operation on
     * @param func The function to use for the mapping, where the params are key, value, and the return value is an array with the key as the first index, and value as the second
     * @returns The object created as a mapping of the keys and values of this object
     */
    public static mapPairs<S, T>(
        obj: {[name: string]: S},
        func: (key: string, value: S) => [string, T]
    ): {[name: string]: T} {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // Create an output object
        const out = {};

        // Go through all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            // Call the passed func to map the key and value
            const [newKey, newValue] = func(key, obj[key]);

            // Store the mapped key
            out[newKey] = newValue;
        }

        // Return the output object
        return out;
    }

    /**
     * Creates an object from the given entry array
     * @param entries The entries to create an object from
     * @returns The resulting object
     */
    public static fromEntries<S>(entries: [string, S][]): {[key: string]: S} {
        const out = {};
        entries.forEach(([key, value]) => {
            out[key] = value;
        });
        return out;
    }

    /**
     * Filters the some fields from the object
     * @param obj The object to perform the operation on
     * @param func The function to use to filter, where the params are value and key
     * @returns The object created which contains all fields that the func returned true for
     */
    public static filter<S extends Object>(
        obj: S,
        func: (value: S[keyof S], key: string) => boolean
    ): Partial<S> {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // Create an output object
        const out = {};

        // Go through all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            // Check if the field should be included
            if (func(obj[key], key)) {
                // Store the field in the output
                out[key] = obj[key];
            }
        }

        // Return the output object
        return out;
    }

    /**
     * Creates an object containing of the defined fields
     * @param obj The object to perform the operation on
     * @param fields A list of fields to include in the object
     * @returns The object created which contains all specified fields
     */
    public static project(obj: object, fields: Array<string>): object {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // Create an output object
        const out = {};

        // Go through all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            // Check if the field should be included
            if (fields.indexOf(key) !== -1) {
                // Store the field in the output
                out[key] = obj[key];
            }
        }

        // Return the output object
        return out;
    }

    // Itarator methods
    /**
     * Calls the provided method on all key value pairs
     * @param obj The object to perform the operation on
     * @param func The function to call for each of the pairs, receives key and value as parameters
     * @param recurse Whether or notto recurse on a child object, a function can be provided that will receive the key and value as parameters, and returns whether or not to recurse
     * @param includeRecurseObj Whether the object that is recursed on should also be called on the function
     * @param path The path to include to the callback of where we are at in the object
     */
    public static forEach<S>(
        obj: {[name: string]: S},
        func: (key: string, value: S, path: string, parentPath: string) => void,
        recurse:
            | ((key: string, value: S, path: string, parentPath: string) => boolean)
            | boolean = false,
        includeRecurseObj: boolean = false,
        path: string = ""
    ): void {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // Go through all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = obj[key];
            const p = (path ? path + "." : "") + key;

            // Check if we should recurse
            if (
                typeof recurse == "function"
                    ? value instanceof Object && recurse(key, value, p, path)
                    : recurse && this.isPlainObject(value)
            ) {
                // Call the function
                if (includeRecurseObj) func(key, value, p, path);

                // Recurse
                this.forEach(value as any, func, recurse, includeRecurseObj, p);
            } else {
                // Call the function
                func(key, value, p, path);
            }
        }
    }

    /**
     * Calls the provided method on all key value pairs that are available in each object
     * @param objects The array of objects to perform the operation on
     * @param func The function to call for each of the pairs, receives key and value as parameters
     * @param recurse Whether or notto recurse on a child object, a function can be provided that will receive the key and value as parameters, and returns whether or not to recurse
     * @param firstObjectLeading Whether the first object dictates the structure, I.e. if a subsequent object doesn't contain a substructure, it appears as if it does have the structured but is filled with undefined.
     * @param path The path to include to the callback of where we are at in the object
     */
    public static forEachPaired(
        objects: object[],
        func: (key: string, values: any[], path: string, parentPath: string) => void,
        recurse:
            | ((key: string, values: any[], path: string, parentPath: string) => boolean)
            | boolean = false,
        firstObjectLeading: boolean = false,
        path: string = ""
    ): void {
        // Get the keys of the this object
        const keys = Object.keys(objects[0]);

        // Go through all keys
        keyLoop: for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            // Check if the key is present in all objects
            if (!firstObjectLeading)
                for (let j = 1; j < objects.length; j++)
                    if (objects[j][key] === undefined) continue keyLoop;

            // Get the values for each of the objects
            const values = objects.map(obj => (obj ? obj[key] : undefined));
            const p = (path ? path + "." : "") + key;

            // Check if all values are of type object
            const isPlainObject = firstObjectLeading
                ? this.isPlainObject(values[0])
                : values.reduce(
                      (cur, value) =>
                          cur & ((this.isPlainObject(value) as any) as number),
                      true
                  );

            // Check if we should recurse
            if (
                isPlainObject &&
                recurse &&
                (typeof recurse != "function" || recurse(key, values, p, path))
            ) {
                this.forEachPaired(values, func, recurse, firstObjectLeading, p);
            } else {
                // Call the function
                func(key, values, p, path);
            }
        }
    }

    // Single value return methods
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
    public static reduce<O extends object, V = any>(
        obj: O,
        func: (result: V, value: Valueof<O>, key: string, path: string) => V,
        initial: V = undefined,
        recurse:
            | ((key: string, value: Valueof<O>, path: string) => boolean)
            | boolean = false,
        path: string = ""
    ): V {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // If no initial value was provided
        if (initial === undefined) {
            // Define the initial value
            initial = obj[keys.shift()];
        }

        // Check whether we should recurse
        if (recurse) {
            // Use regular reduce on the keys, but map the paramaters
            return keys.reduce((cur, key) => {
                const value = obj[key];
                const p = (path ? path + "." : "") + key;

                // Check whether to recurse or not
                if (
                    value instanceof Object &&
                    recurse &&
                    (typeof recurse != "function" || recurse(key, value, p))
                ) {
                    return func(
                        cur,
                        this.reduce(value as any, func, initial, recurse, p) as any,
                        key,
                        p
                    );
                } else {
                    return func(cur, value, key, p);
                }
            }, initial);
        } else {
            // Use regular reduce on the keys, but map the paramaters
            return keys.reduce(
                (cur, key) => func(cur, obj[key], key, (path ? path + "." : "") + key),
                initial
            );
        }
    }

    /**
     * Sets the value at the given path of the given object
     * @param obj The object to set the value at
     * @param path The path at which the value should be stored, E.G. `field`, `some.path.field`
     * @param value The actual value to set
     * @returns A reference to the passed object
     */
    public static setField<T extends object>(
        obj: T,
        path: string | string[],
        value: any
    ): T {
        // Normalize the path
        if (!(path instanceof Array)) path = path.split(".");
        else path = path.concat(); // Make a copy

        // Get the final field
        const field = path.pop();
        if (!field || field.length == 0) return value;

        // Go through all but the last part to retrieve the parent
        let parent: object = obj;
        while (path.length > 0 && typeof parent == "object") {
            // Get the field to retrieve
            const field = path.shift();

            // If the field is an empty string skip it
            if (field.length == 0) continue;

            // Get the field if present and an object
            if (parent[field] && parent[field] instanceof Object) parent = parent[field];
            // Or create it
            else parent = parent[field] = {};
        }

        // Set the value on the parent
        if (parent) parent[field] = value;

        // Return the resulting object
        return obj;
    }

    /**
     * Gets the value at the given path of the given object
     * @param obj The object to retrieve the path from
     * @param path The path to return the value for in object, E.G. `field`, `some.path.field`
     * @param createIfAbsent Whether or not to create the path if absent, defaults to false
     * @returns The data found (or created) at the end of this path
     */
    public static getField(
        obj: object,
        path: string | string[],
        createIfAbsent: boolean = false
    ): any {
        // Normalize the path
        if (!(path instanceof Array)) path = path.split(".");
        else path = path.concat(); // Make a copy

        // Go through all but the last part
        while (path.length > 0 && typeof obj == "object") {
            // Get the field to retrieve
            const field = path.shift();

            // If the field is an empty string, return the object
            if (field.length == 0) return obj;

            // Get the field if present
            if (obj[field] !== undefined) obj = obj[field];
            // Or create it
            else if (createIfAbsent) obj = obj[field] = {};
            // Or return undefined if the field shouldn''t be created
            else return undefined;
        }

        // Return the resulting object
        return obj;
    }

    /**
     * Retrieves a value that matches your constraint given by a function
     * @param obj The object to perform the operation on
     * @param func The function to use in order to verify if this is the item you are looking for, where the params are value and key
     * @returns The first value that was found to match your constraint, if any
     * @public
     */
    public static findValue(
        obj: object,
        func: (value: any, key: string) => boolean
    ): any {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // Go through all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = obj[key];

            // Check if the value matches the constraint
            if (func(value, key)) return value;
        }
    }

    /**
     * Retrieves a value that matches your constraint given by a function, alias for findValue
     * @param obj The object to perform the operation on
     * @param func The function to use in order to verify if this is the item you are looking for, where the params are value and key
     * @returns The first value that was found to match your constraint, if any
     * @public
     */
    public static find(obj: object, func: (value: any, key: string) => boolean): any {
        return this.findValue(obj, func);
    }

    /**
     * Retrieves a key that matches your constraint given by a function
     * @param obj The object to perform the operation on
     * @param func The function to use in order to verify if this is the item you are looking for, where the params are key and value
     * @returns The first key that was found to match your constraint, if any
     * @public
     */
    public static findKey(
        obj: object,
        func: (key: string, value: any) => boolean
    ): string {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // Go through all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = obj[key];

            // Check if the value matches the constraint
            if (func(key, value)) return key;
        }
    }

    /**
     * Retrieves a pair that matches your constraint given by a function
     * @param obj The object to perform the operation on
     * @param func The function to use in order to verify if this is the item you are looking for, where the params are key and value
     * @returns The first pair that was found to match your constraint, if any, in the form of an array with the key at index 0 and the value at index 1
     * @public
     */
    public static findPair(
        obj: object,
        func: (key: string, value: any) => boolean
    ): [string, any] {
        // Get the keys of the this object
        const keys = Object.keys(obj);

        // Go through all keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = obj[key];

            // Check if the value matches the constraint
            if (func(key, value)) return [key, value];
        }
    }

    // Object manipulation methods
    /**
     * Creates an object containing the given value at the given path
     * @param path The path to create in this object, E.G. `field`, `some.path.field`
     * @param value The value to store at the top of this object
     * @returns An object containing the value
     * @private
     */
    public static translatePathToObject(
        path: string | Array<string>,
        value: any
    ): object {
        // Normalize the path
        if (!(path instanceof Array)) path = path.split(".");
        else path = path.concat(); // Make a copy
        if (path[0] == "") path.shift();

        // Get the final field
        const field = path.pop();

        // Check if there is any field
        if (!field || field.length == 0) return value;

        // Create the final object to return
        const obj = {};

        // Create the path
        const top = this.getField(obj, path, true);

        // Store the final value
        top[field] = value;

        // Return the object
        return obj;
    }

    /**
     * Copies the data at a specific path from a source object to a destination object
     * @param src The object to get the data from
     * @param dest The object to transfer the data to
     * @param path The path of the field to transfer, E.G. `field`, `some.path.field`
     * @returns Just another reference to the passed dest object
     */
    public static copyField(
        src: object,
        dest: object,
        path: string | Array<string>
    ): object {
        // Normalize the path
        if (!(path instanceof Array)) path = path.split(".");
        else path = path.concat(); // Make a copy
        if (path[0] == "") path.shift();

        // Get the final field
        const field = path.pop();

        // Get the value of the src object at this path
        src = this.getField(src, path.join("."));

        // Get the path to the dest object
        dest = this.getField(dest, path.join("."), true);

        // Check if we found a valid src and dest object
        if (
            typeof src == "object" &&
            typeof dest == "object" &&
            src[field] !== undefined
        ) {
            // Transfer the data
            dest[field] = src[field];
        }

        // return the altered dest object
        return dest;
    }

    // A symbol to indicate  to override the data in this object
    public static readonly overwrite: unique symbol = Symbol("overwrite");

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
    public static copyData<S extends Map<any>, D extends object, C extends Map<any> = S>(
        src: S,
        dest: D,
        copyModel?:
            | C
            | ((data: {
                  path: string;
                  srcValue: any;
                  destValue: any;
                  hasSrcValue: boolean;
                  hasDestValue: boolean;
                  recursing: boolean;
                  key: string;
              }) => boolean),
        keepUndefined: boolean = true,
        keepEmpty: boolean = true,
        overwriteValues: boolean = true,
        path?: string
    ): D & PartialObject<S, C, keyof C> {
        // If no copyModel was provided, use the full src
        if (!copyModel) copyModel = src as any;

        // Get the check function if present, which checks whether a value should be copied
        let check: (data: {
            path: string;
            srcValue: any;
            destValue: any;
            hasSrcValue: boolean;
            hasDestValue: boolean;
            recursing: boolean;
            key: string;
        }) => boolean;
        if (copyModel instanceof Function) {
            check = copyModel;
            copyModel = src as any;
        }

        // Handle the source being undefined
        if (!src) return dest as any;

        // @ts-ignore If the whole object should be overwritten, straight up return the source
        if (src[this.overwrite]) return {...src};

        // Go through all the fields in the model
        this.forEach(copyModel, (key, value) => {
            // Get the actual values from the source and destionation
            const srcValue = src[key];
            let destValue = dest[key];

            // Check whether we will need to recurse
            const recurse =
                this.isPlainObject(value) &&
                this.isPlainObject(srcValue) &&
                !(srcValue as any)[this.overwrite] &&
                srcValue.$$typeof != Symbol.for("react.element"); // Don't touch react elements

            // Check whether this value should be copied
            if (
                check &&
                !check({
                    path: path ? path + "." + key : key,
                    srcValue,
                    destValue,
                    hasSrcValue: key in src,
                    hasDestValue: key in dest,
                    recursing: recurse,
                    key,
                })
            )
                return;

            // Check whether the value is a plain object, or an end point
            if (!recurse) {
                // Check whether to store  or delete the value
                if (srcValue !== undefined || keepUndefined) {
                    // Only change a value if not present, or overwrite is set to ture
                    if (dest[key] === undefined || overwriteValues) dest[key] = srcValue;
                } else delete dest[key];
            } else {
                // Recurse on the field
                // Make sure the destination exists
                if (
                    !destValue ||
                    (!this.isPlainObject(destValue) &&
                        !(destValue instanceof Array && key in destValue))
                ) {
                    destValue = dest[key] = {};
                }

                // Only recurse if the src exists
                if (srcValue) {
                    this.copyData(
                        srcValue,
                        destValue,
                        check || value,
                        keepUndefined,
                        keepEmpty,
                        overwriteValues,
                        check ? (path ? path + "." + key : key) : undefined
                    );
                }

                // Check if the object should be deleted
                if (!keepEmpty && Object.keys(destValue).length == 0) delete dest[key];
            }
        });

        // return the altered dest object
        return dest as any;
    }

    // Comparison methods
    /**
     * Checks if the contents of object 1 and 2 are equal, except for subobjects
     * @param obj1 The first object
     * @param obj2 The second object
     * @param includeObjects Whether object difference should be taken into account
     * @returns Whether or not the contents of the two objects are equivalent
     */
    public static equals(
        obj1: object,
        obj2: object,
        includeObjects: boolean = true
    ): boolean {
        // Check if there are the same number of values present
        const obj1Keys = Object.keys(obj1);
        const obj2Keys = Object.keys(obj2);
        if (obj1Keys.length != obj2Keys.length) return false;

        // Check if all values are equivalent
        for (let i = 0; i < obj1Keys.length; i++) {
            const key = obj1Keys[i];

            // Values may only differ if they are objects
            if (
                (typeof obj1[key] != "object" || includeObjects) &&
                obj1[key] !== obj2[key]
            )
                return false;
        }

        return true;
    }

    /**
     * Checks if the contents of object 1 and 2 are equal, including subobjects
     * @param obj1 The first object
     * @param obj2 The second object
     * @returns Whether or not the contents of the two objects are equivalent
     */
    public static deepEquals(obj1: object, obj2: object): boolean {
        // Check if there are the same number of values present
        const obj1Keys = Object.keys(obj1);
        const obj2Keys = Object.keys(obj2);
        if (obj1Keys.length != obj2Keys.length) return false;

        // Check if all values are equivalent
        for (let i = 0; i < obj1Keys.length; i++) {
            const key = obj1Keys[i];
            if (typeof obj1[key] == "object" && obj1[key] != null && obj2[key] != null) {
                // Recurse if object
                if (!this.deepEquals(obj1[key], obj2[key])) return false;
            } else {
                // Check shallow equivalence otherwise
                if (obj1[key] !== obj2[key]) return false;
            }
        }

        return true;
    }

    /**
     * Checks if the contents of object 2 are contained in object 1, excluding subobjects
     * @param obj1 The first object
     * @param obj2 The second object
     * @param includeObjects Whether object difference should be taken into account
     * @returns Whether or not the contents of object 1 are contained in object 2
     */
    public static contains(
        obj1: object,
        obj2: object,
        includeObjects: boolean = true
    ): boolean {
        const obj2Keys = Object.keys(obj2);

        // Check if all values are equivalent
        for (let i = 0; i < obj2Keys.length; i++) {
            const key = obj2Keys[i];

            // Values may only differ if they are objects
            if (
                (typeof obj1[key] != "object" || includeObjects) &&
                obj1[key] !== obj2[key]
            )
                return false;
        }

        return true;
    }

    /**
     * Checks if the contents of object 2 are contained in object 1, including subobjects
     * @param obj1 The first object
     * @param obj2 The second object
     * @returns Whether or not the contents of object 1 are contained in object 2
     */
    public static deepContains(obj1: object, obj2: object): boolean {
        const obj2Keys = Object.keys(obj2);

        // Check if all values are equivalent
        for (let i = 0; i < obj2Keys.length; i++) {
            const key = obj2Keys[i];
            if (typeof obj1[key] == "object" && obj1[key] != null && obj2[key] != null) {
                // Recurse if object
                if (!this.deepContains(obj1[key], obj2[key])) return false;
            } else {
                // Check shallow equivalence otherwise
                if (obj1[key] !== obj2[key]) return false;
            }
        }

        return true;
    }
}
