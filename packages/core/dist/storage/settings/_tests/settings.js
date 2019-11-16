var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settingsManager_1 = require("../settingsManager");
const settings_1 = require("../settings");
const registry_1 = require("../../../registry/registry");
const moduleClassCreator_1 = require("../../../module/moduleClassCreator");
const moduleID_1 = require("../../../module/moduleID");
const functionSettingsConditions_1 = require("../settingsConditions/types/functionSettingsConditions");
const SettingNumber_type_1 = require("../settingInputTypes/SettingNumber.type");
const SettingBoolean_type_1 = require("../settingInputTypes/SettingBoolean.type");
const SettingJson_type_1 = require("../settingInputTypes/SettingJson.type");
const dummyModules_helper_1 = __importDefault(require("../../../module/_tests/dummyModules.helper"));
// Create a settings config
const config = {
    version: "0.0.0",
    settings: {
        a: {
            default: 3,
            type: SettingNumber_type_1.SettingNumberType,
        },
        b: {
            c: {
                default: true,
                type: SettingBoolean_type_1.SettingBooleanType,
            },
        },
        d: {
            default: {},
            type: SettingJson_type_1.SettingJsonType,
        },
    },
    migrators: {},
};
exports.dummyInterfaceID = registry_1.Registry.createContractID(__filename + "1");
class Target extends moduleClassCreator_1.createModule({
    state: {},
    settings: config.settings,
    type: exports.dummyInterfaceID,
}, dummyModules_helper_1.default) {
    static async createCustomInstance(identifier) {
        const moduleID = new moduleID_1.ModuleID("test", 3);
        const instance = (await this.createDummy({
            moduleID,
            data: identifier,
        }));
        return instance;
    }
    async test(text) {
        return text;
    }
}
exports.Target = Target;
// Create some standard targets
let target1;
let target2;
// Create some conditions for a specific target
let isTarget1;
let isTarget2;
let isTarget1higherPrior;
// Assumes the SettingsFile and SettingsManager operate correctly
describe("Settings", () => {
    beforeEach(async () => {
        settingsManager_1.SettingsManager.settings = {};
        // Create some standard targets
        target1 = await Target.createCustomInstance(1);
        target2 = await Target.createCustomInstance(2);
        // Create some conditions for a specific target
        isTarget1 = new functionSettingsConditions_1.FunctionSettingsConditions((target) => target.data == 1, 2);
        isTarget2 = new functionSettingsConditions_1.FunctionSettingsConditions((target) => target.data == 2, 3);
        isTarget1higherPrior = new functionSettingsConditions_1.FunctionSettingsConditions((target) => target.data == 1, 3);
    });
    describe("Instanciation", () => {
        it("Should not error", async () => {
            const settings = await settings_1.Settings.createInstance(target1);
            settings.destroy();
        });
        it("Should store the correct values", async () => {
            // Add some content to the file
            const file = await settingsManager_1.SettingsManager.getSettingsFile(Target.getPath(), config);
            file.getConditionData(new functionSettingsConditions_1.FunctionSettingsConditions(() => true, 1)).changeData({ b: { c: false } });
            // Create the settings and verify it loads the correct data
            const settings = await settings_1.Settings.createInstance(target1);
            expect(settings.get).toEqual({ a: 3, b: { c: false }, d: {} });
            settings.destroy();
        });
        it("Should not store data that doesn't apply to the target", async () => {
            // Add some content to the file
            const file = await settingsManager_1.SettingsManager.getSettingsFile(Target.getPath(), config);
            file.getConditionData(isTarget1).changeData({ b: { c: false } });
            file.getConditionData(isTarget2).changeData({ b: { c: true }, a: 4 });
            // Create the settings and verify it loads the correct data
            const settings1 = await settings_1.Settings.createInstance(target1);
            expect(settings1.get).toEqual({ a: 3, b: { c: false }, d: {} });
            settings1.destroy();
            // Create the settings and verify it loads the correct data
            const settings2 = await settings_1.Settings.createInstance(target2);
            expect(settings2.get).toEqual({ a: 4, b: { c: true }, d: {} });
            settings2.destroy();
        });
    });
    describe("Get", () => {
        it("Should correctly return the data that applies to the target", async () => {
            // Add some content to the file
            const file = await settingsManager_1.SettingsManager.getSettingsFile(Target.getPath(), config);
            file.getConditionData(isTarget1).changeData({ b: { c: false } });
            file.getConditionData(isTarget2).changeData({ b: { c: true }, a: 4 });
            // Load some settings, and check their values
            const settings = await settings_1.Settings.createInstance(target1);
            expect(settings.get.a).toBe(3);
            expect(settings.get.b.c).toBe(false);
        });
    });
    describe("ChangeData", () => {
        it("Should not be able to change settings that don't apply to the target", async () => {
            // Check if we can alter settings with conditions applying to the target
            const settings = await settings_1.Settings.createInstance(target1);
            settings.changeData({ a: 56 }, isTarget1);
            // Check if we get a proper error when trying to alter settings
            // with conditions that don't apply to the target
            await expect(settings.changeData({ a: 12 }, isTarget2)).rejects.toThrowError();
        });
        it("Should change the data correctly", async () => {
            const settings = await settings_1.Settings.createInstance(target1);
            settings.changeData({ a: 56 }, isTarget1);
            expect(settings.get).toEqual({ a: 56, b: { c: true }, d: {} });
        });
        it("Should handle different priorities correctly", async () => {
            const settings = await settings_1.Settings.createInstance(target1);
            settings.changeData({ a: 56, b: { c: false } }, isTarget1);
            settings.changeData({ a: 0 }, isTarget1higherPrior);
            settings.changeData({ a: 19 }, isTarget1);
            expect(settings.get).toEqual({ a: 0, b: { c: false }, d: {} });
        });
        it("Should invoke change events", async () => {
            const settings = await settings_1.Settings.createInstance(target1);
            const changed = [];
            settings.on("change", (prop, value, oldValue) => {
                changed.push({ prop: prop, value: value, oldValue: oldValue });
            });
            settings.changeData({ a: 2 }, isTarget1);
            settings.changeData({ a: 3 }, isTarget1);
            settings.changeData({ b: { c: false } }, isTarget1);
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
//# sourceMappingURL=settings.js.map