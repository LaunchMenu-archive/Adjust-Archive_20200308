import {Json} from "@adjust/core/types";

/**
 * A type to represent the default module location that can be passed in a config
 */
export type ModuleLocation = {
    ID: string; // The identifier of the location to open in
    hints?: {
        path?: string[];
        [ancestorType: string]: Json;
    }; // Any hints that can be used to create the location if absent
};
