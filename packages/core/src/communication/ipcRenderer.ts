import {ipcRenderer as electronIpcRenderer} from "electron";
import {EventEmitter} from "../utils/eventEmitter";

class IpcRendererSingleton extends EventEmitter {
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
     * Creates a new IpcRenderer to communicate with other processes
     */
    constructor() {
        super();

        if (!electronIpcRenderer) return;

        // Setup a response listener
        electronIpcRenderer.on(
            "IPC.response",
            (event, {responseID, responses, error}) => {
                // Retrieve the 'exposed promise'
                const promise = this.responseListeners[responseID];
                if (promise) {
                    // Either resolve or reject it
                    if (error) promise.reject(error);
                    else promise.resolve(responses);

                    // Finally let it be garbage collected
                    delete this.responseListeners[responseID];
                }
            }
        );

        // Setup a message listener
        electronIpcRenderer.on("IPC.message", (event, {channel, args, responseID}) => {
            this.emitAsync(channel, ...args)
                .then(responses => {
                    electronIpcRenderer.send("IPC.response", {responseID, responses});
                })
                .catch(error => {
                    electronIpcRenderer.send("IPC.response", {responseID, error});
                });
        });
    }

    /**
     * Sends a message to the main process
     * @param channel The channel to pass the data on
     * @param args The arguments to pass
     * @returns The responses of listeners
     */
    public async send(channel: string, ...args: any[]): Promise<Array<any>> {
        if (!electronIpcRenderer)
            throw Error("ipcRenderer can't be used in the main process");

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
        electronIpcRenderer.send("IPC.message", {channel, args, responseID});

        // Return the created promise
        return promise;
    }

    /**
     * Sends a message to the main process
     * @param channel The channel to pass the data on
     * @param args The arguments to pass
     * @returns The responses of listeners
     */
    public sendSync(channel: string, ...args: any[]): Array<any> {
        if (!electronIpcRenderer)
            throw Error("ipcRenderer can't be used in the main process");

        return electronIpcRenderer.sendSync("IPC.syncMessage", {channel, args});
    }
}

export const IpcRenderer = new IpcRendererSingleton();
