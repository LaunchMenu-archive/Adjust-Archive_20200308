import {BrowserWindow, ipcMain as electronIpcMain} from "electron";
import {IpcMain} from "../ipcMain";

describe("IpcMain/IpcRenderer", () => {
    let window: BrowserWindow;
    beforeAll(async done => {
        // Create a window
        window = await new Promise(res => {
            const browserWindow = new BrowserWindow({
                width: 800,
                height: 600,
                show: false,
                webPreferences: {
                    nodeIntegration: true,
                },
            });
            electronIpcMain.once("loaded", () => {
                res(browserWindow);
            });
            browserWindow.on("closed", () => {
                window = null;
            });
            // browserWindow.webContents.openDevTools();
            browserWindow.loadURL(`file://${__dirname}/window.helper.html`);
        });

        // Setup listeners
        IpcMain.on("received", () => true);

        IpcMain.on("arguments", (arg1, arg2) => ({arg1, arg2}));

        IpcMain.on("argumentsAsync", async (arg1, arg2) => {
            await new Promise(res => setTimeout(res, 2000));
            return {arg1, arg2};
        });

        done();
    });

    afterAll(async done => {
        if (window) {
            window.close();
            window = null;
        }
    });

    describe("Main.send + renderer.on", () => {
        it("Should be received + get a response ", async () => {
            const responses = await IpcMain.send(window, "received");
            expect(responses).toEqual([true]);
        });

        it("Should pass the right arguments", async () => {
            const responses = await IpcMain.send(window, "arguments", "shit1", "shit2");
            expect(responses).toEqual([{arg1: "shit1", arg2: "shit2"}]);
        });

        it("Should handle async responses", async () => {
            const responses = await IpcMain.send(
                window,
                "argumentsAsync",
                "shit1",
                "shit2"
            );
            expect(responses).toEqual([{arg1: "shit1", arg2: "shit2"}]);
        });
    });

    describe("Renderer.send + main.on", () => {
        let response;
        beforeAll(async done => {
            response = (await IpcMain.send(
                window,
                "sendTests",
                "shit1",
                "shit2",
                "shit1"
            ))[0];
            done();
        });

        it("Should be received + get a response ", () => {
            expect(response.resp1).toEqual([true]);
        });

        it("Should pass the right arguments", () => {
            expect(response.resp2).toEqual([{arg1: "shit1", arg2: "shit2"}]);
        });

        it("Should handle async responses", () => {
            expect(response.resp3).toEqual([{arg1: "shit1"}]);
        });
    });

    describe("Renderer.sendSync + main.on", () => {
        let response;
        beforeAll(async done => {
            response = (await IpcMain.send(window, "sendTests", "shit1", "shit2"))[0];
            done();
        });

        it("Should be received + get a response ", () => {
            expect(response.resp1).toEqual([true]);
        });

        it("Should pass the right arguments", () => {
            expect(response.resp2).toEqual([{arg1: "shit1", arg2: "shit2"}]);
        });
    });
});
