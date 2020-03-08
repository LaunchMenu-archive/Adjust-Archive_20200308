Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ipcRenderer_1 = require("../ipcRenderer");
ipcRenderer_1.IpcRenderer.on("received", () => true);
ipcRenderer_1.IpcRenderer.on("arguments", (arg1, arg2) => ({ arg1, arg2 }));
ipcRenderer_1.IpcRenderer.on("argumentsAsync", async (arg1, arg2) => {
    await new Promise(res => setTimeout(res, 200));
    return { arg1, arg2 };
});
// Renderer tests
ipcRenderer_1.IpcRenderer.on("sendTests", async (arg1, arg2, arg3) => {
    const resp1 = await ipcRenderer_1.IpcRenderer.send("received");
    const resp2 = await ipcRenderer_1.IpcRenderer.send("arguments", arg1, arg2);
    const resp3 = await ipcRenderer_1.IpcRenderer.send("argumentsAsync", arg3);
    return { resp1, resp2, resp3 };
});
ipcRenderer_1.IpcRenderer.on("sendSyncTests", (arg1, arg2) => {
    const resp1 = ipcRenderer_1.IpcRenderer.sendSync("received");
    const resp2 = ipcRenderer_1.IpcRenderer.sendSync("arguments", arg1, arg2);
    return { resp1, resp2 };
});
// Notify that the window has been loaded
electron_1.ipcRenderer.send("loaded", "message");
//# sourceMappingURL=windowIpc.helper.js.map