Object.defineProperty(exports, "__esModule", { value: true });
const AsyncMutualExcluder_1 = require("../AsyncMutualExcluder");
// src: https://stackoverflow.com/a/23304189/8521718
const seed = function (s) {
    return function () {
        s = Math.sin(s) * 10000;
        return s - Math.floor(s);
    };
};
const random = seed(34);
// Simple test cases
describe("AsyncSequencer", () => {
    describe("schedule", () => {
        it("general", async () => {
            let out = "";
            const excluder = new AsyncMutualExcluder_1.AsyncMutualExcluder();
            const func1 = () => excluder.schedule(async () => {
                out += "{";
                await new Promise(res => setTimeout(res, 100));
                out += "}";
            });
            const func2 = () => excluder.schedule(async () => {
                out += "{";
                await new Promise(res => setTimeout(res, 200));
                out += "}";
            });
            await Promise.all([func1(), func2(), func1(), func1(), func2()]);
            expect(out).toEqual("{}{}{}{}{}");
        });
        it("random", async () => {
            let out = "";
            const excluder = new AsyncMutualExcluder_1.AsyncMutualExcluder();
            const func1 = () => excluder.schedule(async () => {
                out += "{";
                await new Promise(res => setTimeout(res, random() * 10));
                out += "}";
            });
            const count = 30;
            await Promise.all(new Array(count).fill(0).map(() => func1()));
            expect(out).toEqual("{}".repeat(count));
        });
        it("with breaks", async () => {
            let out = "";
            const excluder = new AsyncMutualExcluder_1.AsyncMutualExcluder();
            const func1 = () => excluder.schedule(async () => {
                out += "{";
                await new Promise(res => setTimeout(res, 10));
                out += "}";
            });
            await Promise.all([func1(), func1(), func1(), func1()]);
            await Promise.all([func1(), func1(), func1(), func1()]);
            expect(out).toEqual("{}".repeat(8));
        });
    });
});
//# sourceMappingURL=AsyncMutualExcluder.js.map