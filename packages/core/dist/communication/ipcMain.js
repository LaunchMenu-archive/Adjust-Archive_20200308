Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const eventEmitter_1 = require("../utils/eventEmitter");
class IpcMainSingleton extends eventEmitter_1.EventEmitter {
    /**
     * Creates a new IpcMain to communicate with other processes
     */
    constructor() {
        super();
        // Keep track of the last used response ID
        this.maxResponseID = 0;
        // Keep track of the response listeners
        this.responseListeners = {};
        if (!electron_1.ipcMain)
            return;
        // Setup a response listener
        electron_1.ipcMain.on("IPC.response", (event, { responseID, responses, error }) => {
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
        electron_1.ipcMain.on("IPC.message", (event, { channel, args, responseID }) => {
            this.emitAsync(channel, ...args)
                .then(responses => {
                event.sender.send("IPC.response", { responseID, responses });
            })
                .catch(error => {
                event.sender.send("IPC.response", { responseID, error });
            });
        });
        // Setup a synchronous message listener
        electron_1.ipcMain.on("IPC.syncMessage", (event, { channel, args }) => {
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
    async send(browserWindow, channel, ...args) {
        if (!electron_1.ipcMain)
            throw Error("ipcMain may only be used in the main process");
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
        browserWindow.webContents.send("IPC.message", { channel, args, responseID });
        // Return the created promise
        return promise;
    }
}
exports.IpcMain = new IpcMainSingleton();
//# sourceMappingURL=ipcMain.js.map