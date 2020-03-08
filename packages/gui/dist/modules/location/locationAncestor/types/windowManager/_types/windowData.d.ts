/**
 * The data that the window manager retains for each window
 */
export declare type WindowData = {
    name: string;
};
/**
 * The data that the window manager retains about windows
 */
export declare type WindowsData = {
    [windowID: string]: WindowData;
};
