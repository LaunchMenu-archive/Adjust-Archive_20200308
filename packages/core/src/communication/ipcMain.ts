import {BrowserWindow, ipcMain as electronIpcMain} from "electron";
import {EventEmitter} from "../utils/eventEmitter";

class IpcMainSingleton extends EventEmitter {
    // Keep track of the last used response ID
    protected maxResponseID: number = 0;

    // Keep track of the response listeners
    protected responseListeners: {
        [ID: string]: {
            resolve: (response: any[]) => void;
            reject: (error: Error) => void;
        };
    } = {};

    /**
     * Creates a new IpcMain to communicate with other processes
     */
    constructor() {
        super();

        if (!electronIpcMain) return;

        // Setup a response listener
        electronIpcMain.on("IPC.response", (event, {responseID, responses, error}) => {
            // Retrieve the 'exposed promise'
            const promise = this.responseListeners[responseID];
            if (promise) {
                // Either resolve or reject it
                if (error) promise.reject(error);
                else promise.resolve(responses);

                // Finally let it be garbage collected
                delete this.responseListeners[responseID];
            }
        });

        // Setup a message listener
        electronIpcMain.on("IPC.message", (event, {channel, args, responseID}) => {
            this.emitAsync(channel, ...args)
                .then(responses => {
                    event.sender.send("IPC.response", {responseID, responses});
                })
                .catch(error => {
                    event.sender.send("IPC.response", {responseID, error});
                });
        });

        // Setup a synchronous message listener
        electronIpcMain.on("IPC.syncMessage", (event, {channel, args}) => {
            const responses = this.emit(channel, ...args);
            event.returnValue = responses;
        });
    }

    /**
     * Sends a message to the passed browserWindow
     * @param browserWindow The browser window to pass
     * @param channel The channel to pass the data on
     * @param args The arguments to pass
     * @returns The responses of listeners
     */
    async send(
        browserWindow: BrowserWindow,
        channel: string,
        ...args: any[]
    ): Promise<Array<any>> {
        if (!electronIpcMain) throw Error("ipcMain may only be used in the main process");

        // Create a promise to return
        let resolve, reject;
        const promise = new Promise<any[]>((res, rej) => {
            resolve = res;
            reject = rej;
        });

        // Create a new response ID
        const responseID = this.maxResponseID++;

        // Store the resolver and rejector for this respnse
        this.responseListeners[responseID] = {
            resolve,
            reject,
        };

        // Send the message
        browserWindow.webContents.send("IPC.message", {channel, args, responseID});

        // Return the created promise
        return promise;
    }
}

export const IpcMain = new IpcMainSingleton();
