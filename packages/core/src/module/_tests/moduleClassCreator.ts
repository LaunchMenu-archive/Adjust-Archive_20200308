import {dummyInterfaceID} from "./dummyModules.helper";
import {createModule, createSetting} from "../moduleClassCreator";
import {SettingNumberType} from "../../storage/settings/settingInputTypes/SettingNumber.type";

// A config for our module
const config = {
    version: "0.0.5",
    state: {
        val: "hello" as string | number,
    },
    settings: {
        val6: createSetting({
            default: 3,
            type: SettingNumberType,
            constraints: {dependencies: ["test"], evaluator: () => ({min: 3})},
        }),
    },
    settingsMigrators: {
        "0.0.1": data => ({val2: data.val}),
        "0.0.2": data => ({val3: data.val2}),
        "0.0.3": data => ({val4: data.val3}),
        "0.0.4": data => ({val5: data.val4}),
        "0.0.5": data => ({val6: data.val5}),
    },
    type: dummyInterfaceID,
};

// A config for a module that extends our module
const config2 = {
    version: "0.0.2",
    state: {
        category: {
            val: 7,
        },
    },
    settings: {
        category: {
            val3: {default: true as any, type: SettingNumberType},
        },
    },
    settingsMigrators: {
        "0.0.1": {
            main: (data, superData) => ({...superData, val2: data.val}),
            super: "0.0.3",
        },
        "0.0.2": {
            main: (data, superData) => ({...superData, val3: data.val2}),
            super: "0.0.5",
        },
    },
    type: dummyInterfaceID,
};

// Note that a lot of these 'test' are typescript tests to check how intellisense deals with stuff, not runtime tests
describe("ModuleClassCreator", () => {
    describe("CreateModule", () => {
        it("Should be able to be used to extend the default module class", () => {
            // Creating a new module
            class OurImplementation extends createModule(config) {
                somethings(inp: any) {
                    this.changeState({val: "yes"});
                    this.changeState({});
                    this.changeState({val: 3});
                    // this.changeState({val: false}); // errors, since val us string | number

                    // const p: string = this.settings.val; // error, cus stuff is of type number
                }
            }

            expect(OurImplementation.getConfig()).toEqual({
                version: "0.0.5",
                initialState: {
                    val: "hello",
                    isStopping: false,
                    isStopped: false,
                },
                settings: {
                    val6: {default: 3, type: SettingNumberType},
                },
                settingsMigrators: {...config.settingsMigrators},
                onInstall: expect.any(Function),
                onLoad: expect.any(Function),
                abstract: undefined,
                type: dummyInterfaceID,
                viewClass: undefined,
                getPriority: expect.any(Function),
            });

            const instance = Object.create(OurImplementation.prototype);
            expect(instance.somethings).not.toBeFalsy();
            expect(instance.changeState).not.toBeFalsy();
        });
        it("Should be able to be used to extend any module class", () => {
            // Creating a new module
            class OurImplementation extends createModule(config) {
                somethings(inp: any) {}
                somethingsElse(inp: any): number {
                    return 3;
                }
            }

            // Creating a module that extends OurImplementation
            class ExtendsOurImplementation extends createModule(
                config2,
                OurImplementation
            ) {
                stuff() {
                    // this.somethings(); // errors since it requires an input
                    this.somethings({});
                    this.changeState({category: {val: 3}});

                    const o = this.state.val; // Still has the original state
                    const p = this.state.category.val; // Also has the new state

                    this.changeState({val: 3, category: {val: 2}}); // Can change the new and old parts of the state
                    this.getSettingsObject().changeData({category: {val3: 3}});
                    this.getSettingsObject().changeData({category: {val3: true}});
                    this.changeSettings({val6: 3});

                    // this.changeSettings({val6: "test"}); // Error, since val6 is of type number
                    // this.changeSettings({category: {val2: 3}}); // Error, since category has no val2
                    // this.changeSettings({category: {val1: true}}); // Error, since category has no val1

                    // this.changeState({category: {v: 3}}); // errors, since category has no v
                    // this.changeState({something: "test"}); // errors, since something should be of type number
                }
                somethingsElse() {
                    return 8;
                }
            }

            expect(ExtendsOurImplementation.getConfig()).toEqual({
                version: "0.0.2",
                initialState: {
                    val: "hello",
                    category: {
                        val: 7,
                    },
                    isStopping: false,
                    isStopped: false,
                },
                settings: {
                    val6: {default: 3, type: SettingNumberType},
                    category: {
                        val3: {default: true as any, type: SettingNumberType},
                    },
                },
                settingsMigrators: {
                    "0.0.1": {
                        main: config2.settingsMigrators["0.0.1"].main,
                        super: {
                            "0.0.1": config.settingsMigrators["0.0.1"],
                            "0.0.2": config.settingsMigrators["0.0.2"],
                            "0.0.3": config.settingsMigrators["0.0.3"],
                        },
                    },
                    "0.0.2": {
                        main: config2.settingsMigrators["0.0.2"].main,
                        super: {
                            "0.0.4": config.settingsMigrators["0.0.4"],
                            "0.0.5": config.settingsMigrators["0.0.5"],
                        },
                    },
                },
                onInstall: expect.any(Function),
                onLoad: expect.any(Function),
                abstract: undefined,
                type: dummyInterfaceID,
                viewClass: undefined,
                getPriority: expect.any(Function),
            });

            const instance = Object.create(ExtendsOurImplementation.prototype);
            expect(instance.stuff).not.toBeFalsy();
            expect(instance.somethings).not.toBeFalsy();
            expect(instance.changeState).not.toBeFalsy();
        });
    });
});
