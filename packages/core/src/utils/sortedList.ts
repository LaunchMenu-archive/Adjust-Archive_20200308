export class SortedList<T> {
    // The actual list
    protected array: T[] = [];

    // A method to base the sorting on
    protected sortFunction: (a: T, b: T) => number;

    /**
     * Creates a sorted list
     * @param sortFunction The function to base the item order on, return negative value if a should come before b
     */
    constructor(sortFunction: (a: T, b: T) => number) {
        this.sortFunction = sortFunction;
    }

    /**
     * Adds a single value to the list
     * @param value The value to add
     * @returns The index that the value was inserted at
     */
    public push(value: T): number;

    /**
     * Adds an array of values to the list
     * @param values The values to add
     * @returns The indices that the value were inserted at
     */
    public push(...values: T[]);
    public push(value: T): number | void {
        // If multiple values were passed
        if (arguments.length > 1) {
            [...arguments].forEach(value => this.push(value));
            return;
        }

        // Don't add an undefined value
        if (value === undefined) return undefined;

        // Keep track of the index it was inserted at
        let index: number;

        // Find the index after which to insert the element
        for (let i = 0; i < this.array.length && index === undefined; i++) {
            if (this.sortFunction(value, this.array[i]) < 0) {
                // Insert the element
                this.array.splice(i, 0, value);
                index = i;
            }
        }

        // If no element was found that the value should be inserted in front of, insert at the end
        if (index === undefined) this.array.push(value);

        return index;
    }

    /**
     * Either removes a single value or an array of values from the list
     * @param value The value(s) to remove, or a function to match values that should be removed
     * @returns The index that the value had in the array
     */
    public pop(value: T | ((value: T) => boolean), ...values: T[]): number | number[] {
        if (value instanceof Function) {
            // Keep track if the indices that have been removed
            const indices = [];

            // Go through all of the items
            for (let i = this.array.length - 1; i >= 0; i--) {
                const v = this.array[i];

                // Check if the item matches the description
                if (value(v)) {
                    // If so, remove the item
                    indices.unshift(i);
                    this.array.splice(i, 1);
                }
            }

            return indices;
        }

        if (values.length > 0) {
            // Add the value to values
            values.unshift(value);

            // Go through all values and map them to the indices
            const indices = values.map(v => this.array.indexOf(v));

            // Remove the numbers
            values.map(v => this.pop(v) as number);
            return indices;
        }

        // Look for the index of the item to remove
        const index = this.array.indexOf(value);
        if (index != -1) this.array.splice(index, 1);
        return index;
    }

    /**
     * Extracts the sorted array from the object
     * @returns The sorted array
     */
    public get(): T[];
    /**
     * Extracts a single value from the list at the given index
     * @param index The index (possibly negative with wrapping) to get the element at
     * @returns The element found at the given index
     */
    public get(index: number): T;
    public get(index?: number): T | T[] {
        if (index !== undefined) {
            const l = this.array.length;
            return this.array[((index % l) + l) % l];
        } else {
            return this.array;
        }
    }

    // Some common list methods
    /**
     * Calls the passed function for all items
     * @param func The function to run
     */
    public forEach(func: (value: T) => any): void {
        this.array.forEach(func);
    }

    /**
     * Maps the data of the list to a regular list
     * @param func The function to map one item to another
     * @returns A regular list of the mapped values
     */
    public map<S>(func: (value: T) => S): S[] {
        return this.array.map(func);
    }

    /**
     * Filters the data of the list
     * @param func The function to decode whether or not an item should be included
     * @returns A subset of the list for which the provided function yielded true
     */
    public filter(func: (value: T) => boolean): T[] {
        return this.array.filter(func);
    }

    /**
     * Gets the length pf the list
     */
    get length() {
        return this.array.length;
    }
}
