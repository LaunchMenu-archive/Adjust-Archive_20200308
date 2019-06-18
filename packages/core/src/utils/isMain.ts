import {ipcMain} from "electron";

// Check whether this process is the main process
export const isMain = ipcMain != null;
