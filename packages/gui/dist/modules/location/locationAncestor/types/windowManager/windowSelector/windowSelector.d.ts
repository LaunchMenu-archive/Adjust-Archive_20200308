import { WindowSelector } from "./windowSelector.type";
import { DragEvent } from "react";
import { InputPrompt } from "../../../../../prompts/inputPrompt.type";
export declare const config: {
    initialState: {
        namePrompt: InputPrompt;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./windowSelector.type").WindowSelectorContract>;
};
declare const WindowSelectorModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        namePrompt: InputPrompt;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./windowSelector.type").WindowSelectorContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../../..").Module, import("../../../../../..").Module>>;
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
    onInit(fromReload: boolean): Promise<void>;
    /** @override */
    protected onStop(): Promise<void>;
    /** @override */
    setWindowNames(windows: string[]): Promise<void>;
    /** @override */
    setEnabled(enabled: boolean): Promise<void>;
    /**
     * Handles dropping of location(s) on the new window button
     */
    onDropNew(): Promise<void>;
}
declare const WindowSelectorView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof WindowSelectorModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig, import("@adjust/core/types").ModuleInterface>, {}>>>;
export declare class WindowSelectorView extends WindowSelectorView_base {
    /**
     * Checks whether this is valid data for a drop
     * @param event The DOM event of the user dragging data
     */
    protected onDragOver(event: DragEvent): void;
    /**
     * Handles the dropping of location(s) on the new window button
     * @param event The DOM event of the user dragging data
     */
    protected onDropNew(event: DragEvent): void;
    /**@override */
    protected renderView(): JSX.Element;
}
export {};
