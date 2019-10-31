import {SettingsFile} from "../../settingsFile";
import {SettingNumberType} from "../../settingInputTypes/SettingNumber.type";
import {SettingBooleanType} from "../../settingInputTypes/SettingBoolean.type";
import {createSetting} from "../../../../module/moduleClassCreator";
import {PropertySettingsConfigSet} from "../../_types/settingsConfigSet";
import {SettingsSetProperties} from "../settingsSetProperties";

const getSettingsFile = async setupListener =>
    SettingsFile.createInstance("", {
        migrators: {},
        version: "0.0.0",
        settings: {
            a: createSetting({
                default: 3,
                type: SettingNumberType,
                name: {
                    dependencies: {
                        bc: "b.c",
                        deName: "d.e.name",
                    },
                    evaluator: ({bc, deName}) => (bc ? "hoi" : "-" + deName),
                },
            }),
            b: {
                c: createSetting({
                    default: true,
                    type: SettingBooleanType,
                }),
            },
            d: {
                e: createSetting({
                    default: true,
                    type: SettingBooleanType,
                    name: {
                        dependencies: {
                            something: setupListener,
                        },
                        evaluator: ({something}) => `(${something})`,
                    },
                }),
            },
            f: createSetting({
                default: 3,
                type: SettingNumberType,
                name: {
                    dependencies: {
                        bc: "b.c",
                    },
                    evaluator: ({bc}) => (bc ? 1 : 2),
                },
            }),
            g: createSetting({
                default: 3,
                type: SettingNumberType,
                name: {
                    dependencies: {},
                    searchDependent: true,
                    evaluator: (_, search) => search,
                },
            }),
            h: createSetting({
                default: 3,
                type: SettingNumberType,
                name: {
                    dependencies: {gName: "g.name"},
                    evaluator: ({gName}) => gName,
                },
            }),
        },
    });

describe("SettingProperty", () => {
    let listeners;
    let callListeners;
    let setupListener;
    let settingsFile: typeof getSettingsFile extends (...args) => Promise<infer V>
        ? V
        : void;
    let settingsSetProps: typeof settingsFile extends SettingsFile<infer V>
        ? SettingsSetProperties<V["settings"]>
        : void;
    let props: typeof settingsFile extends SettingsFile<infer V>
        ? PropertySettingsConfigSet<V["settings"]>
        : void;
    beforeEach(async () => {
        listeners = [];
        callListeners = (value: string) => listeners.forEach(listener => listener(value));
        setupListener = (listener: (value: string) => void) => {
            listeners.push(listener);
            listener("hoi");
            return () => {
                const index = listeners.indexOf(listener);
                if (index != -1) listeners.splice(index, 1);
            };
        };

        settingsFile = await getSettingsFile(setupListener);
        settingsSetProps = settingsFile.createSettingsProperties();
        props = settingsSetProps.getProperties();
    });
    afterEach(() => {
        settingsSetProps.destroy();
    });

    describe("Dependencies object", () => {
        it("Successfully updates on setting dependency change", async () => {
            expect(props.f.name().getValue()).toBe(1);
            settingsFile.getConditionData().changeData({b: {c: false}});
            expect(props.f.name().getValue()).toBe(2);
        });
        it("Successfully updates on an arbitrary listener dependency update", async () => {
            expect(props.d.e.name().getValue()).toBe("(hoi)");
            callListeners("pet");
            expect(props.d.e.name().getValue()).toBe("(pet)");
        });
        it("Successfully updates on a setting property dependency change", async () => {
            expect(props.a.name().getValue()).toBe("hoi");
            settingsFile.getConditionData().changeData({b: {c: false}});
            expect(props.a.name().getValue()).toBe("-(hoi)");
            callListeners("pet");
            expect(props.a.name().getValue()).toBe("-(pet)");
        });
    });
    describe("Search", () => {
        it("Successfully updates on the search dependency change", async () => {
            expect(props.g.name().getValue()).toBe("");
            props.g.name().setSearchValue("hoi");
            expect(props.g.name().getValue()).toBe("hoi");
        });
        it("Successfully updates on search change when child property dependency is dependent on it", async () => {
            expect(props.h.name().getValue()).toBe("");
            props.h.name().setSearchValue("hoi");
            expect(props.h.name().getValue()).toBe("hoi");
        });
    });
    it("Triggers listeners on value changes", async () => {
        const mockCallback = jest.fn(value => {});
        props.a.name().on("change", mockCallback);

        settingsFile.getConditionData().changeData({b: {c: false}});
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toBe("-(hoi)");
    });
});
