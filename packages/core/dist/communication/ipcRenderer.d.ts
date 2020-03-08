import { EventEmitter } from "../utils/eventEmitter";
declare class IpcRendererSingleton extends EventEmitter {
    protected maxResponseID: number;
    protected responseListeners: {
        [ID: string]: {
            resolve: (response: any[]) => void;
            reject: (error: Error) => void;
        };
    };
    /**
     * Creates a new IpcRenderer to communicate with other processes
     */
    constructor();
    /**
     * Sends a message to the main process
     * @param channel The channel to pass the data on
     * @param args The arguments to pass
     * @returns The responses of listeners
     */
    send(channel: string, ...args: any[]): Promise<Array<any>>;
    /**
     * Sends a message to the main process
     * @param channel The channel to pass the data on
     * @param args The arguments to pass
     * @returns The responses of listeners
     */
    sendSync(channel: string, ...args: any[]): Array<any>;
}
export declare const IpcRenderer: IpcRendererSingleton;
export {};
