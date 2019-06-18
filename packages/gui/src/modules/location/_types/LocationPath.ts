import {ModuleLocation} from "../../../module/_types/ModuleLocation";

/**
 * A type indicationg the location path for a module location
 */
export type LocationPath = {
    path: string[]; // The ids of locationAncestor along the way to the location
    location: ModuleLocation; // The actual location that was requested
};
