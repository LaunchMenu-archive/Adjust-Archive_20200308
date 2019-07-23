Object.defineProperty(exports, "__esModule", { value: true });
class SortedList {
    /**
     * Creates a sorted list
     * @param sortFunction The function to base the item order on, return negative value if a should come before b
     */
    constructor(sortFunction) {
        // The actual list
        this.array = [];
        this.sortFunction = sortFunction;
    }
    push(value, ...values) {
        // Don't add an undefined value
        if (value === undefined)
            return undefined;
        // Keep track of the index it was inserted at
        let index;
        // Find the index after which to insert the element
        for (let i = 0; i < this.array.length && index === undefined; i++) {
            if (this.sortFunction(value, this.array[i]) < 0) {
                // Insert the element
                this.array.splice(i, 0, value);
                index = i;
            }
        }
        // If no element was found that the value should be inserted in front of, insert at the end
        if (index === undefined)
            this.array.push(value);
        // Push all of the remaining items into the array
        if (values.length > 1) {
            return [index, ...this.push.apply(values)];
        }
        else if (values.length == 1) {
            return [index, this.push(values[0])];
        }
        return index;
    }
    /**
     * Either removes a single value or an array of values from the list
     * @param value The value(s) to remove, or a function to match values that should be removed
     * @returns The index that the value had in the array
     */
    pop(value, ...values) {
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
            values.map(v => this.pop(v));
            return indices;
        }
        // Look for the index of the item to remove
        const index = this.array.indexOf(value);
        if (index != -1)
            this.array.splice(index, 1);
        return index;
    }
    get(index) {
        if (index !== undefined) {
            const l = this.array.length;
            return this.array[((index % l) + l) % l];
        }
        else {
            return this.array;
        }
    }
    // Some common list methods
    /**
     * Calls the passed function for all items
     * @param func The function to run
     */
    forEach(func) {
        this.array.forEach(func);
    }
    /**
     * Maps the data of the list to a regular list
     * @param func The function to map one item to another
     * @returns A regular list of the mapped values
     */
    map(func) {
        return this.array.map(func);
    }
    /**
     * Filters the data of the list
     * @param func The function to decode whether or not an item should be included
     * @returns A subset of the list for which the provided function yielded true
     */
    filter(func) {
        return this.array.filter(func);
    }
    /**
     * Gets the length pf the list
     */
    get length() {
        return this.array.length;
    }
}
exports.SortedList = SortedList;
//# sourceMappingURL=sortedList.js.map