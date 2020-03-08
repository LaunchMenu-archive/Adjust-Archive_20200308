Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("../eventEmitter");
// Expose protected methods
class MyEmitter extends eventEmitter_1.EventEmitter {
    emit(type, ...args) {
        return super.emit(type, ...args);
    }
    async emitAsync(type, ...args) {
        return super.emitAsync(type, ...args);
    }
}
// Set async timeout
let emitter;
beforeEach(() => {
    jest.setTimeout(100);
    emitter = new MyEmitter();
});
// Simple test cases
describe("EventEmitter", () => {
    describe("Emit + On", () => {
        it("Should call the correct listeners", done => {
            emitter.on("eventName", () => {
                expect(true).toBeTruthy();
                done();
            });
            emitter.emit("eventName");
        });
        it("Should not call other listeners", done => {
            let called = false;
            emitter.on("otherEventName", () => {
                called = true;
            });
            setTimeout(() => {
                expect(!called).toBeTruthy();
                done();
            }, 20);
            emitter.emit("eventName");
        });
        it("Should call all listeners of type", done => {
            let called1 = false;
            emitter.on("eventName", () => {
                called1 = true;
            });
            let called2 = false;
            emitter.on("eventName", () => {
                called2 = true;
            });
            setTimeout(() => {
                expect(called1 && called2).toBeTruthy();
                done();
            }, 20);
            emitter.emit("eventName");
        });
        it("Should pass all arguments to listeners", done => {
            emitter.on("eventName", (arg1, arg2) => {
                expect(arg1).toBe("arg1");
                expect(arg2).toBe("arg2");
                done();
            });
            emitter.emit("eventName", "arg1", "arg2");
        });
    });
    describe("Off", () => {
        it("Should be able to remove listeners by reference", done => {
            let called = false;
            const event = () => {
                called = true;
            };
            emitter.on("eventName", event);
            emitter.off("eventName", event);
            setTimeout(() => {
                expect(!called).toBeTruthy();
                done();
            }, 20);
            emitter.emit("eventName");
        });
        it("Should be able to remove listeners by name", done => {
            let called = false;
            emitter.on("eventName", () => {
                called = true;
            }, "name");
            emitter.off("eventName", "name");
            setTimeout(() => {
                expect(!called).toBeTruthy();
                done();
            }, 20);
            emitter.emit("eventName");
        });
        it("Should not remove incorrect listeners by reference", done => {
            const event = () => { };
            emitter.on("eventName", event);
            emitter.off("eventName", event);
            emitter.on("otherEventName", () => {
                done();
            });
            emitter.emit("otherEventName");
        });
        it("Should not remove incorrect listeners by name", done => {
            emitter.on("eventName", () => { }, "name");
            emitter.off("eventName", "name");
            emitter.on("otherEventName", () => {
                done();
            });
            emitter.emit("otherEventName");
        });
    });
    describe("EmitAsync", () => {
        it("Should be able to get a response", async () => {
            emitter.on("eventName", () => 5);
            const responses = await emitter.emitAsync("eventName");
            expect(responses).toEqual([5]);
            const responsesSync = await emitter.emit("eventName");
            expect(responsesSync).toEqual([5]);
        });
        it("Should be able to get responses", async () => {
            emitter.on("eventName", () => 5);
            emitter.on("eventName", () => 9);
            const responses = await emitter.emitAsync("eventName");
            expect(responses).toEqual([5, 9]);
        });
        it("Should be able to get a async response", async () => {
            emitter.on("eventName", () => new Promise(resolve => {
                setTimeout(() => resolve(5), 10);
            }));
            const responses = await emitter.emitAsync("eventName");
            expect(responses).toEqual([5]);
        });
        it("Should be able to get async responses", async () => {
            emitter.on("eventName", () => new Promise(resolve => {
                setTimeout(() => resolve(5), 10);
            }));
            emitter.on("eventName", () => new Promise(resolve => {
                setTimeout(() => resolve(9), 10);
            }));
            const responses = await emitter.emitAsync("eventName");
            expect(responses).toEqual([5, 9]);
        });
    });
    describe("Once", () => {
        it("Should get invoked just like on", done => {
            emitter.once("eventName", () => {
                expect(true).toBeTruthy();
                done();
            });
            emitter.emit("eventName");
        });
        it("Should receive all arguments just like on", done => {
            emitter.once("eventName", (arg1, arg2) => {
                expect(arg1).toBe("arg1");
                expect(arg2).toBe("arg2");
                done();
            });
            emitter.emit("eventName", "arg1", "arg2");
        });
        it("Should still be removable by name reference", done => {
            let called = false;
            emitter.once("eventName", () => {
                called = true;
            }, "name");
            emitter.off("eventName", "name");
            setTimeout(() => {
                expect(!called).toBeTruthy();
                done();
            }, 20);
            emitter.emit("eventName");
        });
        it("Should return a promise that gets resolved with the arguments", async () => {
            // Invoke after delay
            setTimeout(() => {
                emitter.emit("eventName", "arg1", "arg2");
            }, 20);
            // Waits to be invoked
            const [arg1, arg2] = await emitter.once("eventName");
            expect(arg1).toBe("arg1");
            expect(arg2).toBe("arg2");
        });
        it("Should only allow listeners to be invoked once", () => {
            let called = 0;
            emitter.once("eventName", () => {
                called++;
            });
            emitter.once("eventName", () => {
                called++;
            }, "name");
            emitter.emit("eventName");
            emitter.emit("eventName");
            emitter.emit("eventName");
            expect(called).toBe(2);
        });
    });
});
//# sourceMappingURL=eventEmitter.js.map