import { BrowserWindow } from "electron";
import { EventEmitter } from "../utils/eventEmitter";
declare class IpcMainSingleton extends EventEmitter {
    protected maxResponseID: number;
    protected responseListeners: {
        [ID: string]: {
            resolve: (response: any[]) => void;
            reject: (error: Error) => void;
        };
    };
    /**
     * Creates a new IpcMain to communicate with other processes
     */
    constructor();
    /**
     * Sends a message to the passed browserWindow
     * @param browserWindow The browser window to pass
     * @param channel The channel to pass the data on
     * @param args The arguments to pass
     * @returns The responses of listeners
     */
    send(browserWindow: BrowserWindow, channel: string, ...args: any[]): Promise<Array<any>>;
}
export declare const IpcMain: IpcMainSingleton;
export {};
