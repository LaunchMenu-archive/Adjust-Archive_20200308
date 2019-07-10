import {ModuleLocation} from "../../../module/_types/ModuleLocation";
import {LocationAncestorIDs} from "./LocationAncestorIDs";

/**
 * A type indicationg the location path for a module location
 */
export type LocationPath = {
    ancestors: LocationAncestorIDs;
    location: ModuleLocation; // The actual location that was requested
};
