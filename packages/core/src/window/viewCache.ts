import {ModuleReference} from "../module/moduleID";
import {ParameterizedModuleViewState} from "../module/_types/moduleViewState";

/**
 * A class to keep module view their states around temporarily, to impprove load times
 */
export class ViewCache {
    // The number of items to keep in each cache set
    protected cacheSetSize = 50;

    // The number of cache sets to keep
    protected cacheSetCount = 10;

    // The cache to store data in
    protected cache: {[setName: string]: ParameterizedModuleViewState}[] = [{}];

    /**
     * Adds a view's state to the cache
     * @param moduleID The module ID to add the state for
     * @param state The state to add to the cache
     */
    addViewState(
        moduleID: string | ModuleReference,
        state: ParameterizedModuleViewState
    ): void {
        // Add the module to the latest set
        this.cache[0][moduleID.toString()] = state;

        // Check if the set hit capacity
        if (Object.keys(this.cache[0]).length == this.cacheSetSize) {
            // Remove the last set from the cache
            if (this.cache.length == this.cacheSetCount) this.cache.pop();

            // Add a new empty set
            this.cache.unshift({});
        }
    }

    /**
     * Attempts to obtain a view's state from the cache
     * @param moduleID The module ID to retrieve the state for
     */
    getViewState(moduleID: string | ModuleReference): ParameterizedModuleViewState {
        moduleID = moduleID.toString();

        // Go through all sets to check for the module
        for (let i = 0; i < this.cache.length; i++) {
            const cache = this.cache[i][moduleID];
            if (cache) return cache;
        }
    }
}
