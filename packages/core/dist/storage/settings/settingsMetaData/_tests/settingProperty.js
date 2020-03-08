Object.defineProperty(exports, "__esModule", { value: true });
const settingsFile_1 = require("../../settingsFile");
const SettingNumber_type_1 = require("../../settingInputTypes/SettingNumber.type");
const SettingBoolean_type_1 = require("../../settingInputTypes/SettingBoolean.type");
const moduleClassCreator_1 = require("../../../../module/moduleClassCreator");
const getSettingsFile = async (setupListener) => settingsFile_1.SettingsFile.createInstance("", {
    migrators: {},
    version: "0.0.0",
    settings: {
        a: moduleClassCreator_1.createSetting({
            default: 3,
            type: SettingNumber_type_1.SettingNumberType,
            name: {
                dependencies: {
                    bc: "b.c",
                    deName: "d.e.name",
                },
                evaluator: ({ bc, deName }) => (bc ? "hoi" : "-" + deName),
            },
        }),
        b: {
            c: moduleClassCreator_1.createSetting({
                default: true,
                type: SettingBoolean_type_1.SettingBooleanType,
            }),
        },
        d: {
            e: moduleClassCreator_1.createSetting({
                default: true,
                type: SettingBoolean_type_1.SettingBooleanType,
                name: {
                    dependencies: {
                        something: setupListener,
                    },
                    evaluator: ({ something }) => `(${something})`,
                },
            }),
            sectionConfig: {
                name: "5",
                description: {
                    dependencies: { bc: "b.c" },
                    evaluator: ({ bc }) => (bc ? "a" : "b"),
                },
            },
        },
        f: moduleClassCreator_1.createSetting({
            default: 3,
            type: SettingNumber_type_1.SettingNumberType,
            name: {
                dependencies: {
                    bc: "b.c",
                },
                evaluator: ({ bc }) => (bc ? "1" : "2"),
            },
        }),
        g: moduleClassCreator_1.createSetting({
            default: 3,
            type: SettingNumber_type_1.SettingNumberType,
            name: {
                dependencies: {},
                searchDependent: true,
                evaluator: (_, search) => search,
            },
        }),
        h: moduleClassCreator_1.createSetting({
            default: 3,
            type: SettingNumber_type_1.SettingNumberType,
            name: {
                dependencies: { gName: "g.name" },
                evaluator: ({ gName }) => gName,
            },
        }),
    },
});
describe("SettingProperty", () => {
    let listeners;
    let callListeners;
    let setupListener;
    let settingsFile;
    let settingsSetProps;
    let props;
    beforeEach(async () => {
        listeners = [];
        callListeners = (value) => listeners.forEach(listener => listener(value));
        setupListener = (listener) => {
            listeners.push(listener);
            listener("hoi");
            return () => {
                const index = listeners.indexOf(listener);
                if (index != -1)
                    listeners.splice(index, 1);
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
            expect(props.f.name().getValue()).toBe("1");
            settingsFile.getConditionData().changeData({ b: { c: false } });
            expect(props.f.name().getValue()).toBe("2");
        });
        it("Successfully updates on an arbitrary listener dependency update", async () => {
            expect(props.d.e.name().getValue()).toBe("(hoi)");
            callListeners("pet");
            expect(props.d.e.name().getValue()).toBe("(pet)");
        });
        it("Successfully updates on a setting property dependency change", async () => {
            expect(props.d.sectionConfig.description().getValue()).toBe("a");
            expect(props.a.name().getValue()).toBe("hoi");
            settingsFile.getConditionData().changeData({ b: { c: false } });
            expect(props.d.sectionConfig.description().getValue()).toBe("b");
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
        const mockCallback = jest.fn(value => { });
        props.a.name().on("change", mockCallback);
        settingsFile.getConditionData().changeData({ b: { c: false } });
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toBe("-(hoi)");
    });
});
//# sourceMappingURL=settingProperty.js.map