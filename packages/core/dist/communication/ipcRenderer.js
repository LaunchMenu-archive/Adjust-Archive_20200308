Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const eventEmitter_1 = require("../utils/eventEmitter");
class IpcRendererSingleton extends eventEmitter_1.EventEmitter {
    /**
     * Creates a new IpcRenderer to communicate with other processes
     */
    constructor() {
        super();
        // Keep track of the last used response ID
        this.maxResponseID = 0;
        // Keep track of the response listeners
        this.responseListeners = {};
        if (!electron_1.ipcRenderer)
            return;
        // Setup a response listener
        electron_1.ipcRenderer.on("IPC.response", (event, { responseID, responses, error }) => {
            // Retrieve the 'exposed promise'
            const promise = this.responseListeners[responseID];
            if (promise) {
                // Either resolve or reject it
                if (error)
                    promise.reject(error);
                else
                    promise.resolve(responses);
                // Finally let it be garbage collected
                delete this.responseListeners[responseID];
            }
        });
        // Setup a message listener
        electron_1.ipcRenderer.on("IPC.message", (event, { channel, args, responseID }) => {
            this.emitAsync(channel, ...args)
                .then(responses => {
                electron_1.ipcRenderer.send("IPC.response", { responseID, responses });
            })
                .catch(error => {
                electron_1.ipcRenderer.send("IPC.response", { responseID, error });
            });
        });
    }
    /**
     * Sends a message to the main process
     * @param channel The channel to pass the data on
     * @param args The arguments to pass
     * @returns The responses of listeners
     */
    async send(channel, ...args) {
        if (!electron_1.ipcRenderer)
            throw Error("ipcRenderer can't be used in the main process");
        // Create a promise to return
        let resolve, reject;
        const promise = new Promise((res, rej) => {
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
        electron_1.ipcRenderer.send("IPC.message", { channel, args, responseID });
        // Return the created promise
        return promise;
    }
    /**
     * Sends a message to the main process
     * @param channel The channel to pass the data on
     * @param args The arguments to pass
     * @returns The responses of listeners
     */
    sendSync(channel, ...args) {
        if (!electron_1.ipcRenderer)
            throw Error("ipcRenderer can't be used in the main process");
        return electron_1.ipcRenderer.sendSync("IPC.syncMessage", { channel, args });
    }
}
exports.IpcRenderer = new IpcRendererSingleton();
//# sourceMappingURL=ipcRenderer.js.map