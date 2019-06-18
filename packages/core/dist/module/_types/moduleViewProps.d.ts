import { ModuleReference, ModuleID } from "../moduleID";
import ViewNotFoundModule from "../../modules/viewNotFound";
import { Module } from "../module";
/**
 * The interface for the react properties, which can't be customised
 */
export declare type ModuleViewProps<M> = M extends ViewNotFoundModule ? {
    moduleID: ModuleReference;
    module: M;
    target: {
        cls: typeof Module;
        id: ModuleID;
    };
    children?: undefined;
} : {
    moduleID: ModuleReference;
    module: M;
    children?: undefined;
};
