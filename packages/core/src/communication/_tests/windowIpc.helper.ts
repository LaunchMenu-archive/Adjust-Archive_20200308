import {ipcRenderer as electronIpcRenderer} from "electron";
import {IpcRenderer} from "../ipcRenderer";

IpcRenderer.on("received", () => true);

IpcRenderer.on("arguments", (arg1, arg2) => ({arg1, arg2}));

IpcRenderer.on("argumentsAsync", async (arg1, arg2) => {
    await new Promise(res => setTimeout(res, 200));
    return {arg1, arg2};
});

// Renderer tests
IpcRenderer.on("sendTests", async (arg1, arg2, arg3) => {
    const resp1 = await IpcRenderer.send("received");
    const resp2 = await IpcRenderer.send("arguments", arg1, arg2);
    const resp3 = await IpcRenderer.send("argumentsAsync", arg3);
    return {resp1, resp2, resp3};
});

IpcRenderer.on("sendSyncTests", (arg1, arg2) => {
    const resp1 = IpcRenderer.sendSync("received");
    const resp2 = IpcRenderer.sendSync("arguments", arg1, arg2);
    return {resp1, resp2};
});

// Notify that the window has been loaded
electronIpcRenderer.send("loaded", "message");
