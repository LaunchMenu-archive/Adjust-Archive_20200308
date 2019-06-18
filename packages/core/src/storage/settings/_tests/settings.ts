import {SettingsConditions} from "../settingsConditions";
import {SettingsManager} from "../settingsManager";
import {Settings} from "../settings";
import {Registry} from "../../../registry/registry";
import {createModule} from "../../../module/moduleClassCreator";
import {PublicModuleMethods} from "../../../module/_types/publicModuleMethods";
import {Module} from "../../../module/module";
import {ModuleID} from "../../../module/moduleID";

// Create a settings config
const config = {
    a: {
        default: 3,
        type: "number",
    },
    b: {
        c: {
            default: true,
            type: "boolean",
        },
    },
    d: {
        default: {},
        type: "something",
    },
};

// Make an intansiateable method with some dummy methods
export type dummyInterface = {
    test: (text: string) => Promise<string>;
};
export const dummyInterfaceID = Registry.createInterfaceID<{
    parent: {};
    child: dummyInterface & PublicModuleMethods;
}>(__filename + "1");
export class Target
    extends createModule({initialState: {}, settings: config, type: dummyInterfaceID})
    implements dummyInterface {
    public identifier: number;
    constructor(identifier: number) {
        const moduleID = new ModuleID("test", 3);
        super(
            {requestPath: Module.createRequestPath(moduleID, null, {}), data: null},
            moduleID,
            {},
            []
        );
        this.identifier = identifier;
    }
    public async test(text: string): Promise<string> {
        return text;
    }
}

// Create some standard targets
const target1 = new Target(1);
const target2 = new Target(2);

// Create some conditions for a specific target
const isTarget1 = new SettingsConditions((target: any) => target.identifier == 1, 2);
const isTarget2 = new SettingsConditions((target: any) => target.identifier == 2, 3);
const isTarget1higherPrior = new SettingsConditions(
    (target: any) => target.identifier == 1,
    3
);

// Assumes the SettingsFile and SettingsManager operate correctly
describe("Settings", () => {
    beforeEach(() => {
        (SettingsManager as any).settings = {};
    });
    describe("Instanciation", () => {
        it("Should not error", () => {
            const settings = new Settings(target1, config);
            settings.destroy();
        });
        it("Should store the correct values", () => {
            // Add some content to the file
            const file = SettingsManager.getSettingsFile(Target.getPath(), config);
            file.set(new SettingsConditions(() => true, 1)).b.c(false);

            // Create the settings and verify it loads the correct data
            const settings = new Settings(target1, config);
            expect(settings.get).toEqual({a: 3, b: {c: false}, d: {}});

            settings.destroy();
        });
        it("Should not store data that doesn't apply to the target", () => {
            // Add some content to the file
            const file = SettingsManager.getSettingsFile(Target.getPath(), config);
            file.set(isTarget1).b.c(false);
            file.set(isTarget2).b.c(true);
            file.set(isTarget2).a(4);

            // Create the settings and verify it loads the correct data
            const settings1 = new Settings(target1, config);
            expect(settings1.get).toEqual({a: 3, b: {c: false}, d: {}});
            settings1.destroy();

            // Create the settings and verify it loads the correct data
            const settings2 = new Settings(target2, config);
            expect(settings2.get).toEqual({a: 4, b: {c: true}, d: {}});
            settings2.destroy();
        });
    });
    describe("Get", () => {
        it("Should correctly return the data that applies to the target", () => {
            // Add some content to the file
            const file = SettingsManager.getSettingsFile(Target.getPath(), config);
            file.set(isTarget1).b.c(false);
            file.set(isTarget2).b.c(true);
            file.set(isTarget2).a(4);

            // Load some settings, and check their values
            const settings = new Settings(target1, config);
            expect(settings.get.a).toBe(3);
            expect(settings.get.b.c).toBe(false);
        });
    });
    describe("Set", () => {
        it("Should not be able to change settings that don't apply to the target", () => {
            // Check if we can alter settings with conditions applying to the target
            const settings = new Settings(target1, config);
            settings.set.a(56, isTarget1);

            // Check if we get a proper error when trying to alter settings
            // with conditions that don't apply to the target
            expect(() => {
                settings.set.a(12, isTarget2);
            }).toThrowError();
        });
        it("Should change the data correctly", () => {
            const settings = new Settings(target1, config);
            settings.set.a(56, isTarget1);
            expect(settings.get).toEqual({a: 56, b: {c: true}, d: {}});
        });
        it("Should handle different priorities correctly", () => {
            const settings = new Settings(target1, config);
            settings.set.b.c(false, isTarget1);
            settings.set.a(56, isTarget1);
            settings.set.a(0, isTarget1higherPrior);
            settings.set.a(19, isTarget1);
            expect(settings.get).toEqual({a: 0, b: {c: false}, d: {}});
        });
        it("Should invoke change events", () => {
            const settings = new Settings(target1, config);

            const changed: ({prop: string; value: any; oldValue: any})[] = [];
            settings.on("change", (prop, value, oldValue) => {
                changed.push({prop: prop, value: value, oldValue: oldValue});
            });

            settings.set.a(2, isTarget1);
            settings.set.a(3, isTarget1);
            settings.set.b.c(false, isTarget1);

            expect(changed).toEqual([
                {
                    prop: "a",
                    value: 2,
                    oldValue: 3,
                },
                {
                    prop: "a",
                    value: 3,
                    oldValue: 2,
                },
                {
                    prop: "b.c",
                    value: false,
                    oldValue: true,
                },
            ]);
        });
    });
});
