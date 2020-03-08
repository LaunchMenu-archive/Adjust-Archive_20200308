import { ModuleReference } from "../module/moduleID";
import { ParameterizedModuleViewState } from "../module/_types/moduleViewState";
/**
 * A class to keep module view their states around temporarily, to impprove load times
 */
export declare class ViewCache {
    protected cacheSetSize: number;
    protected cacheSetCount: number;
    protected cache: {
        [setName: string]: ParameterizedModuleViewState;
    }[];
    /**
     * Adds a view's state to the cache
     * @param moduleID The module ID to add the state for
     * @param state The state to add to the cache
     */
    addViewState(moduleID: string | ModuleReference, state: ParameterizedModuleViewState): void;
    /**
     * Attempts to obtain a view's state from the cache
     * @param moduleID The module ID to retrieve the state for
     */
    getViewState(moduleID: string | ModuleReference): ParameterizedModuleViewState;
}
