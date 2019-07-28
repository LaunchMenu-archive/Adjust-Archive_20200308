import {ModuleLocation} from "../../../module/_types/ModuleLocation";

/**
 * A type indicationg the location path for a module location
 */
export type LocationPath = {
    nodes: string[]; // The actual path of ancestor IDs, ordered from root to leave
    location: ModuleLocation; // The actual location that was requested
};
