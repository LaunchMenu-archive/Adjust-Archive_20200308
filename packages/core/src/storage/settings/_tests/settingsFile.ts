import {SettingsFile} from "../settingsFile";
import {FunctionSettingsConditions} from "../settingsConditions/types/functionSettingsConditions";
import {ConstantSettingsConditions} from "../settingsConditions/types/constantSettingsConditions";
import {SettingsManager} from "../settingsManager";

const config = {
    version: "0.0.0",
    settings: {
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
    },
    migrators: {},
};

describe("SettingsFile", () => {
    describe("Instanciation", () => {
        it("Should load the defaults if no file is present", async () => {
            const settingsFile = await SettingsFile.createInstance(
                "_test/dontSave",
                config
            );

            expect(settingsFile.get(undefined).a).toBe(3);
            expect(settingsFile.get(undefined).b.c).toBe("test");
            expect(settingsFile.get(undefined).d).toEqual({});
            expect(settingsFile.get(undefined).e).toEqual({prop: 3});
        });
    });
    describe("ChangeData", () => {
        let settingsFile: SettingsFile<typeof config>;
        beforeEach(async () => {
            settingsFile = await SettingsFile.createInstance("_test/dontSave", config);
        });

        it("Should invoke change events", () => {
            const condition = new ConstantSettingsConditions(2);

            const changes = [];
            settingsFile.on("change", (path, value, cCondition, oldValue) => {
                expect(cCondition).toBe(condition);
                changes.push({path: path, value: value, oldValue: oldValue});
            });

            settingsFile.getConditionData(condition).changeData({a: 3});
            settingsFile.getConditionData(condition).changeData({b: {c: "test"}});
            settingsFile.getConditionData(condition).changeData({a: 8});

            [
                {path: "a", value: 3, oldValue: undefined},
                {path: "b.c", value: "test", oldValue: undefined},
                {path: "a", value: 8, oldValue: 3},
            ].forEach(value => {
                expect(changes).toContainEqual(value);
            });
        });
        it("Should invoke config change events", async () => {
            let args;
            const settingsFile = await SettingsFile.createInstance("_test/dontSave", {
                ...config,
                settings: {
                    ...config.settings,
                    f: {
                        g: {
                            default: 3,
                            type: "number",
                            onChange: (newValue, condition, oldValue, settings) => {
                                args = {newValue, condition, oldValue, settings};
                            },
                        },
                    },
                },
            });

            expect(args.newValue).toEqual(3);
            expect(args.oldValue).toEqual(undefined);
            expect(new ConstantSettingsConditions(0).equals(args.condition)).toBeTruthy();
            expect(args.settings).not.toBeFalsy();

            const condition = new FunctionSettingsConditions(() => true, 2);
            settingsFile.getConditionData(condition).changeData({f: {g: 5}});

            expect(args.newValue).toEqual(5);
            expect(args.oldValue).toEqual(undefined);
            expect(args.condition).not.toBeFalsy();
            expect(args.settings).not.toBeFalsy();
        });
        it("Should not resolve until events are finished", async () => {
            let order = [];
            const settingsFile = await SettingsFile.createInstance("_test/dontSave", {
                ...config,
                settings: {
                    ...config.settings,
                    f: {
                        g: {
                            default: 3,
                            type: "number",
                            onChange: async (newValue, condition, oldValue, settings) => {
                                if (condition.equals(undefined)) return;
                                await new Promise(resolve => setTimeout(resolve, 20));
                                order.push(1);
                            },
                        },
                    },
                },
            });
            const condition = new FunctionSettingsConditions(() => true, 2);
            await settingsFile.getConditionData(condition).changeData({f: {g: 5}});
            order.push(2);

            settingsFile.on("change", async (path, value, cCondition, oldValue) => {
                await new Promise(resolve => setTimeout(resolve, 60));
                order.push(3);
            });
            await settingsFile.getConditionData(condition).changeData({f: {g: 2}});
            order.push(2);

            expect(order).toEqual([1, 2, 1, 3, 2]);
        });
        it("Should remove data if undefined", () => {
            const condition = new FunctionSettingsConditions(() => true, 2);

            settingsFile.getConditionData(condition).changeData({b: {c: "test"}});
            expect(settingsFile.get(condition).b.c).toBe("test");
            settingsFile.getConditionData(condition).changeData({b: {c: undefined}});
            expect(settingsFile.get(condition).b).toEqual({});
        });
    });
    describe("Get", () => {
        let settingsFile: SettingsFile<typeof config>;
        beforeEach(async () => {
            settingsFile = await SettingsFile.createInstance("_test/dontSave", config);
        });

        it("Should get the data corresponding with some condition", () => {
            const condition = new FunctionSettingsConditions(() => true, 2);
            const condition2 = new FunctionSettingsConditions(target => {
                return target != null; // Should always be true also
            }, 2);

            settingsFile.getConditionData().changeData({b: {c: "test"}});
            settingsFile.getConditionData(condition).changeData({b: {c: "test2"}});
            settingsFile
                .getConditionData(condition2)
                .changeData({b: {c: "test3"}, d: {hello: 3}, e: {prop: 6}});
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
            version: "0.0.0",
            settings: {
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
            },
            migrators: {},
        };
        const condition = new FunctionSettingsConditions(() => true, 2);
        const condition2 = new FunctionSettingsConditions(target => {
            return target != null; // Should always be true also
        }, 2);
        let settingsFile: SettingsFile<typeof config>;
        beforeEach(async () => {
            settingsFile = await SettingsFile.createInstance("_tests/save1", config);
            settingsFile.getConditionData().changeData({b: {c: "test"}});
            settingsFile.getConditionData(condition).changeData({b: {c: "test2"}});
            settingsFile.getConditionData(condition2).changeData({b: {c: "test3"}});
        });
        afterEach(async () => {
            SettingsManager.deleteFile("_tests/save1.json");
        });

        it("Should store the data in a file", () => {
            settingsFile.save();
            expect(true).toBeTruthy();
        });
        it("Should make new instances have the same data", async () => {
            settingsFile.save();

            const settingsFile2 = await SettingsFile.createInstance(
                "_tests/save1",
                config
            );
            expect(settingsFile2.get(condition).b.c).toBe(
                settingsFile.get(condition).b.c
            );
        });
    });
    describe("Reload", () => {
        const condition = new FunctionSettingsConditions(() => true, 2);
        const condition2 = new FunctionSettingsConditions(target => {
            return target != null; // Should always be true also
        }, 2);
        let settingsFile: SettingsFile<typeof config>;
        beforeEach(async () => {
            settingsFile = await SettingsFile.createInstance("_tests/save2", config);
            settingsFile.getConditionData().changeData({b: {c: "test"}});
            settingsFile.getConditionData(condition).changeData({b: {c: "test2"}});
            settingsFile.getConditionData(condition2).changeData({b: {c: "test3"}});
            settingsFile.save();
        });
        afterEach(async () => {
            SettingsManager.deleteFile("_tests/save2.json");
            SettingsManager.deleteFile("_tests/save3.json");
            SettingsManager.deleteFile("_tests/save4.json");
        });

        it("Should reload the previously saved settings", () => {
            settingsFile.getConditionData().changeData({b: {c: "hallo"}});
            expect(settingsFile.get().b.c).toBe("hallo");
            settingsFile.reload();
            expect(settingsFile.get().b.c).toBe("test");
        });
        it("Should invoke change events", () => {
            settingsFile.getConditionData().changeData({b: {c: "hallo"}});

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
        it("Should migrate settings from a previous version", async () => {
            // Define multiple configs to act like different versions of the same config
            const config1 = {
                version: "0.0.0",
                settings: {
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
                },
                migrators: {},
            };
            const config2 = {
                version: "0.0.1",
                settings: {
                    a: {
                        a: {
                            default: 3,
                            type: "number",
                        },
                        b: {
                            default: {
                                prop: 3,
                            },
                            type: "object",
                        },
                    },
                    b: {
                        c: {
                            default: "test",
                            type: "string",
                        },
                    },
                    new: {
                        default: {},
                        type: "object",
                    },
                },
                migrators: {"0.0.1": data => ({a: {a: data.a, b: data.e}})},
            };
            const config3 = {
                version: "0.0.2w",
                settings: {
                    a: {
                        a: {
                            default: 3,
                            type: "number",
                        },
                        b: {
                            default: {
                                prop: 3,
                            },
                            type: "object",
                        },
                        new: {
                            default: {},
                            type: "object",
                        },
                    },
                },
                migrators: {
                    "0.0.1": data => ({a: {a: data.a, b: data.e}}),
                    "0.0.2": data => ({a: {...data.a, new: data.new}}),
                },
            };

            // Create some data in the format of the first config
            settingsFile = await SettingsFile.createInstance("_tests/save3", config1);
            settingsFile
                .getConditionData()
                .changeData({a: 5, b: {c: "test"}, e: {prop: 8}});
            settingsFile.getConditionData(condition).changeData({a: 4, b: {c: "test2"}});
            settingsFile
                .getConditionData(condition2)
                .changeData({a: 3, e: {prop: 2}, b: {c: "test3"}});
            settingsFile.save();

            // Perform the migration (simulate the same data transfering from config1, to 2, to 3)
            const settingsFile2 = await SettingsFile.createInstance(
                "_tests/save3",
                config2
            );
            settingsFile2.save();
            const settingsFile3 = await SettingsFile.createInstance(
                "_tests/save3",
                config3
            );

            expect(settingsFile3.getConditionData().get).toEqual({
                a: {a: 5, b: {prop: 8}, new: {}},
            });
            expect(settingsFile3.getConditionData(condition).get).toEqual({
                a: {a: 4},
            });
            expect(settingsFile3.getConditionData(condition2).get).toEqual({
                a: {a: 3, b: {prop: 2}},
            });
        });

        it("Should migrate settings from a previous version, using complex migrators", async () => {
            // Define multiple configs for a super class or settings set
            const superConfig1 = {
                version: "0.0.0",
                settings: {
                    a: {
                        default: 3,
                        type: "number",
                    },
                },
                migrators: {},
            };
            const superConfig2 = {
                version: "0.0.1",
                settings: {
                    b: {
                        default: 3,
                        type: "number",
                    },
                },
                migrators: {"0.0.1": data => ({b: data.a})},
            };
            const superConfig3 = {
                version: "0.0.2",
                settings: {
                    c: {
                        default: 3,
                        type: "number",
                    },
                },
                migrators: {
                    "0.0.1": data => ({b: data.a}),
                    "0.0.2": data => ({c: data.b}),
                },
            };

            // Define multiple configs to act like different versions of the same config
            const config1 = {
                version: "0.0.0",
                settings: {
                    b: {
                        default: 3,
                        type: "number",
                    },
                    ...superConfig1.settings,
                },
                migrators: {},
            };
            const config2 = {
                version: "0.0.1",
                settings: {
                    d: {
                        default: 3,
                        type: "number",
                    },
                    ...superConfig3.settings,
                },
                migrators: {
                    "0.0.1": {
                        main: (data, superData) => ({...superData, d: data.b}),
                        super: {
                            ...superConfig3.migrators,
                        },
                    },
                },
            };

            // Create some data in the format of the first config
            const settingsFile = await SettingsFile.createInstance(
                "_tests/save4",
                config1
            );
            settingsFile.getConditionData().changeData({a: 5, b: 2});
            settingsFile.getConditionData(condition).changeData({a: 2, b: 1});
            settingsFile.getConditionData(condition2).changeData({a: 1});
            settingsFile.save();

            // Perform the migration (simulate the same data transfering from config1, to 2)
            const settingsFile2 = await SettingsFile.createInstance(
                "_tests/save4",
                config2
            );

            expect(settingsFile2.getConditionData().get).toEqual({
                c: 5,
                d: 2,
            });
            expect(settingsFile2.getConditionData(condition).get).toEqual({
                c: 2,
                d: 1,
            });
            expect(settingsFile2.getConditionData(condition2).get).toEqual({
                c: 1,
            });
        });
    });
});
