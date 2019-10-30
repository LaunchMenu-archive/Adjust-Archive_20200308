import { BrowserWindow } from "electron";
import { ModuleViewData } from "../module/_types/moduleViewData";
import { ParameterizedModule } from "../module/module";
import { ModuleID } from "../module/moduleID";
import { ViewNotFound } from "../modules/viewNotFound.type";
import { AsyncSerializeableData } from "../utils/_types/serializeableData";
import { ContextProvider } from "../modules/contextProvider.type";
export declare type WindowOptions = Electron.BrowserWindowConstructorOptions & {
    preloadModules?: string[];
};
/**
 * Keeps track of all windows and is able to create new ones
 * Also takes care of sending module updates to windows
 */
export declare class WindowManagerSingleton {
    protected readonly windows: {
        [windowID: string]: {
            window: Promise<BrowserWindow>;
            moduleCounts: {
                [moduleID: string]: number;
            };
            openedAt: number;
        };
    };
    protected readonly viewNotFoundModule: ViewNotFound;
    protected readonly contextProvidersModule: ContextProvider;
    protected readonly windowsBuffer: {
        options: WindowOptions;
        window: Promise<BrowserWindow>;
    }[];
    /**
     * Creates a window manager
     */
    constructor();
    /**
     * Create the view not found module if not created already
     * @returns A view not found module
     */
    protected getViewNotFoundModule(): Promise<ViewNotFound>;
    /**
     * Create the context provider module if not created already
     * @returns A view not found module
     */
    protected getContextProvidersModule(): Promise<ContextProvider>;
    /**
     * Adds windows to the window buffer, with the indicated default options
     * @remarks Some options like 'frame' invalidate usage of some buffered windows for certain requests.
     * The preloadModules option indicates what modules will be required to load their dependenceis.
     * When requesting a data, the buffered window can only be used if all preloadModules it passes have been loaded in the buffered window.
     * @param options The intiail options to use for the window
     * @param count The number of windows to add to the buffer
     */
    createWindowBuffer(options: WindowOptions, count?: number): Promise<void>;
    /**
     * Retrieves a buffered window with the given options, if availabke
     * @param options The options that the retrieved window should have
     * @returns A browser window with the options if available, or undefiend otherwise
     */
    protected getBufferdWindow(options: WindowOptions): Promise<BrowserWindow>;
    /**
     * Creates an electron window, without assigning it any data, or showing it
     * @remarks Makes use of any potential window buffer to speed up creation.     *
     * @param options The options of the window to create
     * @param useBuffer Whether or not to obtain a iwndow from the buffer
     * @returns A browser window
     */
    protected createWindow(options: WindowOptions, useBuffer?: boolean): Promise<BrowserWindow>;
    /**
     * Opens the window with the given ID
     * @param windowID The ID of the window to open
     * @param moduleID The ID of the root view of the window
     * @param options The extra options to pass to the window
     * @returns The browser window that was created
     */
    openWindow(windowID: string, moduleID: ModuleID | string, options?: WindowOptions): Promise<BrowserWindow>;
    /**
     * Retrieves a window if it has been opened already
     * @param windowID The ID of the window
     * @returns The window that was found
     */
    getWindow(windowID: string): Promise<BrowserWindow>;
    /**
     * Closes the window with the given ID
     * @param windowID The ID of the window to close
     * @returns Whether or not the window has been closed on request (might not be the case if it got opened again before resolving)
     */
    closeWindow(windowID: string): Promise<boolean>;
    /**
     * Adds listeners to the module to forward its data to a window's GuiManager
     * @param moduleID The moduleID of the module to forward to a window
     * @param windowID The id of the window to forward the data to
     */
    protected listenToModule(moduleID: ModuleID | string, windowID: string): void;
    /**
     * Sends the state data to a given window for a given module
     * @param module The module to which this data belongs
     * @param windowID The ID of the window that the module is located in
     * @param data The data to be send
     */
    protected sendStateData(module: ParameterizedModule, windowID: string, data: AsyncSerializeableData): Promise<void>;
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
    protected getModuleData(moduleID: ModuleID | string, windowID: string): ModuleViewData;
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
