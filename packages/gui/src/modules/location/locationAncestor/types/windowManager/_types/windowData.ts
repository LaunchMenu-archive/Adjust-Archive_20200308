/**
 * The data that the window manager retains for each window
 */
export type WindowData = {
    name: string;
};

/**
 * The data that the window manager retains about windows
 */
export type WindowsData = {
    [windowID: string]: WindowData;
};
