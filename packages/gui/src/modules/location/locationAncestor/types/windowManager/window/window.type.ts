import {LocationAncestorParent, LocationAncestor} from "../../../locationAncestor.type";
import {Registry} from "../../../../../../registry/registry";

export type Window = LocationAncestor & {
    /**
     * Updates the name of the window
     * @param name The name that the window now has
     */
    setName(name: string): Promise<void>;
};
export type WindowParent = LocationAncestorParent & {
    /**
     * Updates the name of the window
     * @param name The name that the window wants to have
     */
    changeWindowName(name: string): Promise<void>;
};
export type WindowContract = {
    parent: WindowParent;
    child: Window;
    data: {
        ID: string; // The ID of this location ancestor itself
        path: string[]; // The IDs of locationAncestor along the way to the location, including ID of location ancestor itself
    };
};

export const WindowID = Registry.createInterfaceID<WindowContract>(__filename);
