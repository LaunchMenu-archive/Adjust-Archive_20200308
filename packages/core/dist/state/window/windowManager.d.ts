import { BrowserWindow } from "electron";
import { ModuleViewData } from "../../module/_types/moduleViewData";
import { ModuleID } from "../../module/moduleID";
import { ViewNotFound } from "../../modules/viewNotFound.type";
import { AsyncSerializeableData } from "../../utils/_types/serializeableData";
/**
 * Keeps track of all windows and is able to create new ones
 * Also takes care of sending module updates to windows
 */
declare class WindowManagerSingleton {
    protected readonly windows: {
        [windowID: string]: {
            window: BrowserWindow;
            moduleCounts: {
                [moduleID: string]: number;
            };
        };
    };
    protected readonly openingWindows: {
        [windowID: string]: Promise<BrowserWindow>;
    };
    protected readonly viewNotFoundModule: ViewNotFound;
    /**
     * Creates a window manager
     */
    constructor();
    /**
     * Create the view not found module if not created already
     */
    protected createViewNotFoundModule(): Promise<void>;
    /**
     * Opens the window with the given ID
     * @param windowID The ID of the window to open
     * @param moduleID The ID of the root view of the window
     * @param options The extra options to pass to the window
     * @returns The browser window that was created
     */
    openWindow(windowID: string, moduleID: ModuleID | string, options?: Electron.BrowserWindowConstructorOptions): Promise<BrowserWindow>;
    /**
     * Closes the window with the given ID
     * @param windowID The ID of the window to close
     */
    closeWindow(windowID: string): Promise<void>;
    /**
     * Adds listeners to the module to forward its data to a window's GuiManager
     * @param moduleID The moduleID of the module to forward to a window
     * @param windowID The id of the window to forward the data to
     */
    protected listenToModule(moduleID: ModuleID | string, windowID: string): void;
    /**
     * Sends the state data to a given window for a given module
     * @param moduleID The ID of the module to which this data belongs
     * @param window The window that the module is located in
     * @param windowID The ID of the window that the module is located in
     * @param data The data to be send
     */
    protected sendStateData(moduleID: ModuleID | string, window: BrowserWindow, windowID: string, data: AsyncSerializeableData): void;
    /**
     * Removes the listeners from the module to stop forwarding its data to a window's GuiManager
     * @param moduleID The moduleID of the module that is forwarding to a window
     * @param windowID The id of the window the module is forwarding the data to
     */
    protected stopListeningToModule(moduleID: ModuleID | string, windowID: string): void;
    /**
     * Obtains the current data of the module
     * @param moduleID The moduleID of the module to get the data for
     * @param window The window that the module is located in
     * @param windowID The ID of the window that the module is located in
     * @returns The data of the module data
     */
    protected getModuleData(moduleID: ModuleID | string, window: BrowserWindow, windowID: string): ModuleViewData;
    /**
     * Retrieves the size of the main display
     * @returns The display's size
     */
    getScreenSize(): Promise<{
        width: number;
        height: number;
    }>;
}
export declare const WindowManager: WindowManagerSingleton;
export {};
