import { ModuleLocation } from "../../../module/_types/ModuleLocation";
/**
 * A type indicationg the location path for a module location
 */
export declare type LocationPath = {
    ancestors: {
        [ancestorType: string]: string;
    };
    location: ModuleLocation;
};
