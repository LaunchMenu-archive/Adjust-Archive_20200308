import { LocationPath } from "../_types/LocationPath";
import { LocationAncestor } from "./locationAncestor.type";
export declare const config: {
    initialState: {};
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./locationAncestor.type").LocationAncestorContract>;
    abstract: boolean;
};
declare const LocationAncestorModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {};
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./locationAncestor.type").LocationAncestorContract>;
    abstract: boolean;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../..").Module, import("../../..").Module>>;
/**
 * A base class for location ancestors to extend,
 * provides some common methods that location ancestors might use
 */
export default class LocationAncestorModule extends LocationAncestorModule_base {
    protected ancestorName: string;
    /**
     * Either gets the next ID from the path, or generates it and stores it in the path
     * @param path The location path to get the ID from
     * @returns the obtained or generated ID as well as the passed or updated path
     */
    protected getPathID(path: LocationPath): {
        path: LocationPath;
        id: string;
    };
    /**
     * Gets the child location ancestor given a specified location path
     * @param inpPath The path to obtain the child by
     * @returns The id of the child, as well as the child itself
     */
    protected getChildLocationAncestor(inpPath: LocationPath): Promise<{
        id: string;
        path: LocationPath;
        locationAncestor: LocationAncestor;
    }>;
}
export {};
