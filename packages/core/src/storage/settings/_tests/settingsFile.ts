import {SettingsFile} from "../settingsFile";
import {SettingsConditions} from "../settingsConditions";

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
        it("Should load the defaults if no file is present", () => {
            const settingsFile = new SettingsFile("_test/dontSave", config);

            expect(settingsFile.get(undefined).a).toBe(3);
            expect(settingsFile.get(undefined).b.c).toBe("test");
            expect(settingsFile.get(undefined).d).toEqual({});
            expect(settingsFile.get(undefined).e).toEqual({prop: 3});
        });
    });
    describe("Set", () => {
        let settingsFile: SettingsFile<typeof config>;
        beforeEach(() => {
            settingsFile = new SettingsFile("_test/dontSave", config);
        });

        it("Should be able to create setter objects for new conditions", () => {
            const condition = new SettingsConditions(() => true, 2);
            expect(settingsFile.set(condition)).not.toBeFalsy();
        });
        it("Should return a setter object with the right structure", () => {
            const condition = new SettingsConditions(() => true, 2);

            settingsFile.set(condition).a(3);
            settingsFile.set(condition).b.c("test");
            expect(true).toBeTruthy();
        });
        it("Should invoke change events", () => {
            const condition = new SettingsConditions(() => true, 2);

            const changes = [];
            settingsFile.on("change", (path, value, cCondition, oldValue) => {
                expect(cCondition).toBe(condition);
                changes.push({path: path, value: value, oldValue: oldValue});
            });

            settingsFile.set(condition).a(3);
            settingsFile.set(condition).b.c("test");
            settingsFile.set(condition).a(8);

            [
                {path: "a", value: 3, oldValue: undefined},
                {path: "b.c", value: "test", oldValue: undefined},
                {path: "a", value: 8, oldValue: 3},
            ].forEach(value => {
                expect(changes).toContainEqual(value);
            });
        });
        it("Should remove data if undefined", () => {
            const condition = new SettingsConditions(() => true, 2);

            settingsFile.set(condition).b.c("test");
            expect(settingsFile.get(condition).b.c).toBe("test");
            settingsFile.set(condition).b.c(undefined);
            expect(settingsFile.get(condition).b).toBe(undefined);
        });
    });
    describe("Get", () => {
        let settingsFile: SettingsFile<typeof config>;
        beforeEach(() => {
            settingsFile = new SettingsFile("_test/dontSave", config);
        });

        it("Should get the data corresponding with some condition", () => {
            const condition = new SettingsConditions(() => true, 2);
            const condition2 = new SettingsConditions(target => {
                return target.getClass() != null; // Should always be true also
            }, 2);

            settingsFile.set().b.c("test");
            settingsFile.set(condition).b.c("test2");
            settingsFile.set(condition2).b.c("test3");
            settingsFile.set(condition2).d({hello: 3});
            settingsFile.set(condition2).e({prop: 6});
            expect(settingsFile.get().b.c).toBe("test");
            expect(settingsFile.get(condition).b.c).toBe("test2");
            expect(settingsFile.get(condition2).b.c).toBe("test3");
            expect(settingsFile.get(condition2).d).toEqual({hello: 3});
            expect(settingsFile.get().e).toEqual({prop: 3});
            expect(settingsFile.get(condition).e).toEqual(undefined);
            expect(settingsFile.get(condition2).e).toEqual({prop: 6});
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
        const condition = new SettingsConditions(() => true, 2);
        const condition2 = new SettingsConditions(target => {
            return target.getClass() != null; // Should always be true also
        }, 2);
        let settingsFile: SettingsFile<typeof config>;
        beforeEach(() => {
            settingsFile = new SettingsFile("_tests/save1", config);
            settingsFile.set().b.c("test");
            settingsFile.set(condition).b.c("test2");
            settingsFile.set(condition2).b.c("test3");
        });

        it("Should store the data in a file", () => {
            settingsFile.save();
            expect(true).toBeTruthy();
        });
        it("Should make new instances have the same data", () => {
            settingsFile.save();

            const settingsFile2 = new SettingsFile("_tests/save1", config);
            expect(settingsFile2.get(condition).b.c).toBe(
                settingsFile.get(condition).b.c
            );
        });
    });
    describe("Reload", () => {
        const condition = new SettingsConditions(() => true, 2);
        const condition2 = new SettingsConditions(target => {
            return target.getClass() != null; // Should always be true also
        }, 2);
        let settingsFile: SettingsFile<typeof config>;
        beforeEach(() => {
            settingsFile = new SettingsFile("_tests/save2", config);
            settingsFile.set().b.c("test");
            settingsFile.set(condition).b.c("test2");
            settingsFile.set(condition2).b.c("test3");
            settingsFile.save();
        });

        it("Shuld reload the previously saved settings", () => {
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
