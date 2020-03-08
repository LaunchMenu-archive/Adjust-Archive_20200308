Object.defineProperty(exports, "__esModule", { value: true });
const AsyncSequencer_1 = require("../AsyncSequencer");
// Simple test cases
describe("AsyncSequencer", () => {
    describe("add(func)", () => {
        it("Should handle 1 call", async () => {
            const sequencer = new AsyncSequencer_1.AsyncSequencer();
            const seq = [];
            const func1 = async () => {
                sequencer.add(async () => {
                    await new Promise(res => setTimeout(res, 199));
                    seq.push("1");
                });
            };
            const func2 = async () => {
                await sequencer.finished;
                seq.push("2");
            };
            await Promise.all([func1(), func2()]);
            expect(seq).toEqual(["1", "2"]);
        });
        it("Should handle multiple calls", async () => {
            const sequencer = new AsyncSequencer_1.AsyncSequencer();
            const seq = [];
            const func1 = async () => {
                sequencer.add(async () => {
                    await new Promise(res => setTimeout(res, 199));
                    seq.push("1");
                });
            };
            const func2 = async () => {
                await sequencer.finished;
                seq.push("2");
            };
            await Promise.all([func1(), func1(), func1(), func2()]);
            expect(seq).toEqual(["1", "1", "1", "2"]);
        });
        it("Should handle multiple calls out of order", async () => {
            const sequencer = new AsyncSequencer_1.AsyncSequencer();
            const seq = [];
            const func1 = async () => {
                sequencer.add(async () => {
                    await new Promise(res => setTimeout(res, 199));
                    seq.push("1");
                });
            };
            const func2 = async () => {
                await sequencer.finished;
                seq.push("2");
            };
            await Promise.all([func1(), func2(), func1(), func1()]);
            expect(seq).toEqual(["1", "1", "1", "2"]);
        });
    });
    describe("add()", () => {
        it("Should handle 1 call", async () => {
            const sequencer = new AsyncSequencer_1.AsyncSequencer();
            const seq = [];
            const func1 = async () => {
                const ID = sequencer.add();
                await new Promise(res => setTimeout(res, 199));
                seq.push("1");
                sequencer.remove(ID);
            };
            const func2 = async () => {
                await sequencer.finished;
                seq.push("2");
            };
            await Promise.all([func1(), func2()]);
            expect(seq).toEqual(["1", "2"]);
        });
        it("Should handle multiple calls", async () => {
            const sequencer = new AsyncSequencer_1.AsyncSequencer();
            const seq = [];
            const func1 = async () => {
                const ID = sequencer.add();
                await new Promise(res => setTimeout(res, 199));
                seq.push("1");
                sequencer.remove(ID);
            };
            const func2 = async () => {
                await sequencer.finished;
                seq.push("2");
            };
            await Promise.all([func1(), func1(), func1(), func2()]);
            expect(seq).toEqual(["1", "1", "1", "2"]);
        });
        it("Should handle multiple calls out of order", async () => {
            const sequencer = new AsyncSequencer_1.AsyncSequencer();
            const seq = [];
            const func1 = async () => {
                const ID = sequencer.add();
                await new Promise(res => setTimeout(res, 199));
                seq.push("1");
                sequencer.remove(ID);
            };
            const func2 = async () => {
                await sequencer.finished;
                seq.push("2");
            };
            await Promise.all([func1(), func2(), func1(), func1()]);
            expect(seq).toEqual(["1", "1", "1", "2"]);
        });
    });
});
//# sourceMappingURL=AsyncSequencer.js.map