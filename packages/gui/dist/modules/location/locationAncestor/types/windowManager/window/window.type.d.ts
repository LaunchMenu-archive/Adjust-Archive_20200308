import { LocationAncestorParent, LocationAncestor } from "../../../locationAncestor.type";
/**
 * The window type
 */
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
    /**
     * Indicates whether or not the window is currently visible
     * @param visible Whether or not the window is visible
     * @param windowID The ID of the window to be visible or not
     */
    setWindowVisibility(visible: boolean, windowID: string): Promise<void>;
};
export declare type WindowContract = {
    parent: WindowParent;
    child: Window;
    data: {
        ID: string;
        path: string[];
        previewMode?: boolean;
    };
};
export declare const WindowID: import("@adjust/core/types").InterfaceID<WindowContract>;
