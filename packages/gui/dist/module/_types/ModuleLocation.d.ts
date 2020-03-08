import { Json } from "@adjust/core/types";
/**
 * A type to represent the default module location that can be passed in a config
 */
export declare type ModuleLocation = {
    ID: string;
    hints?: {
        path?: string[];
        [ancestorType: string]: Json;
    };
};
