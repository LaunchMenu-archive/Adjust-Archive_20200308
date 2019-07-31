Object.defineProperty(exports, "__esModule", { value: true });
const settingsFile_1 = require("../settingsFile");
const functionSettingsConditions_1 = require("../settingsConditions/types/functionSettingsConditions");
const config = {
    a: {
        default: 3,
        type: "number",
    },
    b: {
        c: {
            default: "test",
            type: "string",
        },
    },
    d: {
        default: {},
        type: "object",
    },
    e: {
        default: {
            prop: 3,
        },
        type: "object",
    },
};
describe("SettingsFile", () => {
    describe("Instanciation", () => {
        it("Should load the defaults if no file is present", async () => {
            const settingsFile = await settingsFile_1.SettingsFile.createInstance("_test/dontSave", config);
            expect(settingsFile.get(undefined).a).toBe(3);
            expect(settingsFile.get(undefined).b.c).toBe("test");
            expect(settingsFile.get(undefined).d).toEqual({});
            expect(settingsFile.get(undefined).e).toEqual({ prop: 3 });
        });
    });
    describe("Set", () => {
        let settingsFile;
        beforeEach(async () => {
            settingsFile = await settingsFile_1.SettingsFile.createInstance("_test/dontSave", config);
        });
        it("Should be able to create setter objects for new conditions", () => {
            const condition = new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 2);
            expect(settingsFile.set(condition)).not.toBeFalsy();
        });
        it("Should return a setter object with the right structure", () => {
            const condition = new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 2);
            settingsFile.set(condition).a(3);
            settingsFile.set(condition).b.c("test");
            expect(true).toBeTruthy();
        });
        it("Should invoke change events", () => {
            const condition = new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 2);
            const changes = [];
            settingsFile.on("change", (path, value, cCondition, oldValue) => {
                expect(cCondition).toBe(condition);
                changes.push({ path: path, value: value, oldValue: oldValue });
            });
            settingsFile.set(condition).a(3);
            settingsFile.set(condition).b.c("test");
            settingsFile.set(condition).a(8);
            [
                { path: "a", value: 3, oldValue: undefined },
                { path: "b.c", value: "test", oldValue: undefined },
                { path: "a", value: 8, oldValue: 3 },
            ].forEach(value => {
                expect(changes).toContainEqual(value);
            });
        });
        it("Should invoke config change events", async () => {
            let args;
            const settingsFile = await settingsFile_1.SettingsFile.createInstance("_test/dontSave", Object.assign({}, config, { f: {
                    g: {
                        default: 3,
                        type: "number",
                        onChange: (newValue, condition, oldValue, settings) => {
                            args = { newValue, condition, oldValue, settings };
                        },
                    },
                } }));
            expect(args.newValue).toEqual(3);
            expect(args.oldValue).toEqual(undefined);
            expect(new functionSettingsConditions_1.FunctionSettingsConditions(undefined, 0).equals(args.condition)).toBeTruthy();
            expect(args.settings).not.toBeFalsy();
            const condition = new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 2);
            settingsFile.set(condition).f.g(5);
            expect(args.newValue).toEqual(5);
            expect(args.oldValue).toEqual(undefined);
            expect(args.condition).not.toBeFalsy();
            expect(args.settings).not.toBeFalsy();
        });
        it("Should not resolve until events are finished", async () => {
            let order = [];
            const settingsFile = await settingsFile_1.SettingsFile.createInstance("_test/dontSave", Object.assign({}, config, { f: {
                    g: {
                        default: 3,
                        type: "number",
                        onChange: async (newValue, condition, oldValue, settings) => {
                            if (condition.equals(undefined))
                                return;
                            await new Promise(resolve => setTimeout(resolve, 20));
                            order.push(1);
                        },
                    },
                } }));
            const condition = new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 2);
            await settingsFile.set(condition).f.g(5);
            order.push(2);
            settingsFile.on("change", async (path, value, cCondition, oldValue) => {
                await new Promise(resolve => setTimeout(resolve, 60));
                order.push(3);
            });
            await settingsFile.set(condition).f.g(2);
            order.push(2);
            expect(order).toEqual([1, 2, 1, 3, 2]);
        });
        it("Should remove data if undefined", () => {
            const condition = new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 2);
            settingsFile.set(condition).b.c("test");
            expect(settingsFile.get(condition).b.c).toBe("test");
            settingsFile.set(condition).b.c(undefined);
            expect(settingsFile.get(condition).b).toEqual({});
        });
    });
    describe("Get", () => {
        let settingsFile;
        beforeEach(async () => {
            settingsFile = await settingsFile_1.SettingsFile.createInstance("_test/dontSave", config);
        });
        it("Should get the data corresponding with some condition", () => {
            const condition = new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 2);
            const condition2 = new functionSettingsConditions_1.FunctionSettingsConditions(target => {
                return target != null; // Should always be true also
            }, 2);
            settingsFile.set().b.c("test");
            settingsFile.set(condition).b.c("test2");
            settingsFile.set(condition2).b.c("test3");
            settingsFile.set(condition2).d({ hello: 3 });
            settingsFile.set(condition2).e({ prop: 6 });
            expect(settingsFile.get().b.c).toBe("test");
            expect(settingsFile.get(condition).b.c).toBe("test2");
            expect(settingsFile.get(condition2).b.c).toBe("test3");
            expect(settingsFile.get(condition2).d).toEqual({ hello: 3 });
            expect(settingsFile.get().e).toEqual({ prop: 3 });
            expect(settingsFile.get(condition).e).toEqual(undefined);
            expect(settingsFile.get(condition2).e).toEqual({ prop: 6 });
        });
    });
    describe("Save", () => {
        const config = {
            a: {
                default: 3,
                type: "number",
            },
            b: {
                c: {
                    default: "test",
                    type: "string",
                },
            },
        };
        const condition = new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 2);
        const condition2 = new functionSettingsConditions_1.FunctionSettingsConditions(target => {
            return target != null; // Should always be true also
        }, 2);
        let settingsFile;
        beforeEach(async () => {
            settingsFile = await settingsFile_1.SettingsFile.createInstance("_tests/save1", config);
            settingsFile.set().b.c("test");
            settingsFile.set(condition).b.c("test2");
            settingsFile.set(condition2).b.c("test3");
        });
        it("Should store the data in a file", () => {
            settingsFile.save();
            expect(true).toBeTruthy();
        });
        it("Should make new instances have the same data", async () => {
            settingsFile.save();
            const settingsFile2 = await settingsFile_1.SettingsFile.createInstance("_tests/save1", config);
            expect(settingsFile2.get(condition).b.c).toBe(settingsFile.get(condition).b.c);
        });
    });
    describe("Reload", () => {
        const condition = new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 2);
        const condition2 = new functionSettingsConditions_1.FunctionSettingsConditions(target => {
            return target != null; // Should always be true also
        }, 2);
        let settingsFile;
        beforeEach(async () => {
            settingsFile = await settingsFile_1.SettingsFile.createInstance("_tests/save2", config);
            settingsFile.set().b.c("test");
            settingsFile.set(condition).b.c("test2");
            settingsFile.set(condition2).b.c("test3");
            settingsFile.save();
        });
        it("Should reload the previously saved settings", () => {
            settingsFile.set().b.c("hallo");
            expect(settingsFile.get().b.c).toBe("hallo");
            settingsFile.reload();
            expect(settingsFile.get().b.c).toBe("test");
        });
        it("Should invoke change events", () => {
            settingsFile.set().b.c("hallo");
            let triggered = false;
            settingsFile.on("change", (path, value, condition) => {
                if (condition.equals(undefined) && path == "b.c") {
                    expect(value).toBe("test");
                    triggered = true;
                }
            });
            settingsFile.reload();
            expect(triggered).toBeTruthy();
        });
    });
});
//# sourceMappingURL=settingsFile.js.map