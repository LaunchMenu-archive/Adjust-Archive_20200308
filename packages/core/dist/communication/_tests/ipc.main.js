Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ipcMain_1 = require("../ipcMain");
describe("IpcMain/IpcRenderer", () => {
    let window;
    beforeAll(async (done) => {
        // Create a window
        window = await new Promise(res => {
            const browserWindow = new electron_1.BrowserWindow({
                width: 800,
                height: 600,
                show: false,
                webPreferences: {
                    nodeIntegration: true,
                },
            });
            electron_1.ipcMain.once("loaded", () => {
                res(browserWindow);
            });
            browserWindow.on("closed", () => {
                window = null;
            });
            // browserWindow.webContents.openDevTools();
            browserWindow.loadURL(`file://${__dirname}/window.helper.html`);
        });
        // Setup listeners
        ipcMain_1.IpcMain.on("received", () => true);
        ipcMain_1.IpcMain.on("arguments", (arg1, arg2) => ({ arg1, arg2 }));
        ipcMain_1.IpcMain.on("argumentsAsync", async (arg1, arg2) => {
            await new Promise(res => setTimeout(res, 2000));
            return { arg1, arg2 };
        });
        done();
    });
    afterAll(async (done) => {
        if (window) {
            window.close();
            window = null;
        }
    });
    describe("Main.send + renderer.on", () => {
        it("Should be received + get a response ", async () => {
            const responses = await ipcMain_1.IpcMain.send(window, "received");
            expect(responses).toEqual([true]);
        });
        it("Should pass the right arguments", async () => {
            const responses = await ipcMain_1.IpcMain.send(window, "arguments", "shit1", "shit2");
            expect(responses).toEqual([{ arg1: "shit1", arg2: "shit2" }]);
        });
        it("Should handle async responses", async () => {
            const responses = await ipcMain_1.IpcMain.send(window, "argumentsAsync", "shit1", "shit2");
            expect(responses).toEqual([{ arg1: "shit1", arg2: "shit2" }]);
        });
    });
    describe("Renderer.send + main.on", () => {
        let response;
        beforeAll(async (done) => {
            response = (await ipcMain_1.IpcMain.send(window, "sendTests", "shit1", "shit2", "shit1"))[0];
            done();
        });
        it("Should be received + get a response ", () => {
            expect(response.resp1).toEqual([true]);
        });
        it("Should pass the right arguments", () => {
            expect(response.resp2).toEqual([{ arg1: "shit1", arg2: "shit2" }]);
        });
        it("Should handle async responses", () => {
            expect(response.resp3).toEqual([{ arg1: "shit1" }]);
        });
    });
    describe("Renderer.sendSync + main.on", () => {
        let response;
        beforeAll(async (done) => {
            response = (await ipcMain_1.IpcMain.send(window, "sendTests", "shit1", "shit2"))[0];
            done();
        });
        it("Should be received + get a response ", () => {
            expect(response.resp1).toEqual([true]);
        });
        it("Should pass the right arguments", () => {
            expect(response.resp2).toEqual([{ arg1: "shit1", arg2: "shit2" }]);
        });
    });
});
//# sourceMappingURL=ipc.main.js.map