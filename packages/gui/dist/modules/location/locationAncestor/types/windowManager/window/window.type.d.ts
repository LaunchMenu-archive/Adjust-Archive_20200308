import { LocationAncestorParent, LocationAncestor } from "../../../locationAncestor.type";
export declare type Window = LocationAncestor & {
    /**
     * Updates the name of the window
     * @param name The name that the window now has
     */
    setName(name: string): Promise<void>;
};
export declare type WindowParent = LocationAncestorParent & {
    /**
     * Updates the name of the window
     * @param name The name that the window wants to have
     * @param windowID The ID of the window whose name to change
     */
    changeWindowName(name: string, windowID: string): Promise<void>;
};
export declare type WindowContract = {
    parent: WindowParent;
    child: Window;
    data: {
        ID: string;
        path: string[];
    };
};
export declare const WindowID: import("@adjust/core/types").InterfaceID<WindowContract>;
