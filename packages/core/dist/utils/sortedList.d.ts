export declare class SortedList<T> {
    protected array: T[];
    protected sortFunction: (a: T, b: T) => number;
    /**
     * Creates a sorted list
     * @param sortFunction The function to base the item order on, return negative value if a should come before b
     */
    constructor(sortFunction: (a: T, b: T) => number);
    /**
     * Adds a single value to the list
     * @param value The value to add
     * @returns The index that the value was inserted at
     */
    push(value: T): number;
    /**
     * Adds an array of values to the list
     * @param values The values to add
     * @returns The indices that the value were inserted at
     */
    push(...values: T[]): any;
    /**
     * Either removes a single value or an array of values from the list
     * @param value The value(s) to remove, or a function to match values that should be removed
     * @returns The index that the value had in the array
     */
    pop(value: T | ((value: T) => boolean), ...values: T[]): number | number[];
    /**
     * Extracts the sorted array from the object
     * @returns The sorted array
     */
    get(): T[];
    /**
     * Extracts a single value from the list at the given index
     * @param index The index (possibly negative with wrapping) to get the element at
     * @returns The element found at the given index
     */
    get(index: number): T;
    /**
     * Calls the passed function for all items
     * @param func The function to run
     */
    forEach(func: (value: T) => any): void;
    /**
     * Maps the data of the list to a regular list
     * @param func The function to map one item to another
     * @returns A regular list of the mapped values
     */
    map<S>(func: (value: T) => S): S[];
    /**
     * Filters the data of the list
     * @param func The function to decode whether or not an item should be included
     * @returns A subset of the list for which the provided function yielded true
     */
    filter(func: (value: T) => boolean): T[];
    /**
     * Gets the length pf the list
     */
    readonly length: number;
}
