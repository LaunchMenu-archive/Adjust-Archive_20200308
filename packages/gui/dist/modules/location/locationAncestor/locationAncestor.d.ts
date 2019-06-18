import { ModuleReference } from "@adjust/core";
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
    /**
     * Either gets the next ID from the path, or generates it
     * @param path The location path to get the ID from
     * @returns the obtained or generated ID
     */
    protected getPathID(path: LocationPath): string;
    /**
     * Gets the child location ancestor given a specified location path
     * @param path The path to obtain the child by
     * @returns The id of the child, as well as the child itself
     */
    protected getChildLocationAncestor(path: LocationPath, splits?: boolean): Promise<{
        id: string;
        locationAncestor: LocationAncestor;
    }>;
    protected childOpenModule(module: ModuleReference, locationPath: LocationPath, child: LocationAncestor, splits?: boolean): Promise<LocationPath>;
}
export {};
