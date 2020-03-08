import { WindowSelector } from "./windowSelector.type";
import { DragEvent } from "react";
import { WindowsData } from "../_types/windowData";
import { Window } from "../window/window.type";
import LocationAncestorModule from "../../../locationAncestor";
export declare const windowSelectorConfig: {
    state: {
        closedWindows: WindowsData;
        windowModule: Promise<Window>;
    };
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./windowSelector.type").WindowSelectorContract>;
};
declare const WindowSelectorModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        closedWindows: WindowsData;
        windowModule: Promise<Window>;
    };
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./windowSelector.type").WindowSelectorContract>;
}, typeof LocationAncestorModule>;
export default class WindowSelectorModule extends WindowSelectorModule_base implements WindowSelector {
    protected windowID: string;
    protected window: Promise<Electron.BrowserWindow>;
    /**
     * Gets the window that's used for this selector, opens it if absent
     * @returns The opened or retrieved window
     */
    protected getWindow(): Promise<Electron.BrowserWindow>;
    /**
     * Closes the window if it had been opened already
     */
    protected closeWindow(): Promise<void>;
    /** @override */
    onInit(): Promise<void>;
    /** @override */
    protected onStop(): Promise<void>;
    /** @override fowards the data to the selector's parent */
    changeWindowName(name: string, windowID: string): Promise<void>;
    /** @override fowards the data to the selector's parent */
    setWindowVisibility(visible: boolean, windowID: string): Promise<void>;
    /** @override */
    setWindows(closed: WindowsData, opened: WindowsData): Promise<void>;
    /** @override */
    setEnabled(enabled: boolean): Promise<void>;
    /**
     * Handles dropping of location(s) on the new window button
     */
    onDropNew(): Promise<void>;
    /**
     * Shows the window contents of the window with the given ID
     * @param windowID The ID of the window to show, or undefined to hide
     */
    showWindow(windowID: string): Promise<void>;
}
declare const WindowSelectorView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof WindowSelectorModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../../..").ModuleView, import("../../../../../..").ModuleView<{}, {}, import("../../../../../..").Module, {}>>>;
export declare class WindowSelectorView extends WindowSelectorView_base {
    /** @override */
    componentWillMount(): void;
    /**
     * Gets called when data is dragged to outside this window
     */
    protected onDragLeave(): void;
    /**
     * Handles showing the window for this name
     * @param windowID The ID of the window to show
     * @param event The DOM event of the user dragging data
     */
    protected onDragEnterWindow(windowID: string, event: DragEvent): void;
    /**
     * Allows for a drop here
     * @param event The DOM event of the user dragging data
     */
    protected onDragOver(event: DragEvent): void;
    /**
     * Handles the dropping of location(s) on the new window button
     * @param event The DOM event of the user dragging data
     */
    protected onDropNew(event: DragEvent): void;
    /**
     * Renders the selected window
     */
    protected renderWindow(): JSX.Element;
    /**
     * Renders the window names
     */
    protected renderWindowNames(): JSX.Element[];
    /**@override */
    protected renderView(): JSX.Element;
}
export {};
