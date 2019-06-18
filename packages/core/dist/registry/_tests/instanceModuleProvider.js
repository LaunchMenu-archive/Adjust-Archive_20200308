Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../registry");
const classModuleProvider_1 = require("../moduleProviders/classModuleProvider");
const instanceModuleProvider_1 = require("../moduleProviders/instanceModuleProvider");
const moduleClassCreator_1 = require("../../module/moduleClassCreator");
const programState_1 = require("../../state/programState");
const requestPath_1 = require("../../module/requestPath/requestPath");
const moduleID_1 = require("../../module/moduleID");
exports.dummyInterfaceID = registry_1.Registry.createInterfaceID(__filename + "1");
class DummyModule extends moduleClassCreator_1.createModule({ initialState: {}, settings: {}, type: exports.dummyInterfaceID }) {
    constructor() {
        super(...arguments);
        this.instanceVal = 0;
    }
    async test() {
        return ++this.instanceVal;
    }
}
exports.DummyModule = DummyModule;
// @ts-ignore
DummyModule.path = "../module/_tests/dummyModules.helper.js"; // A path that can be imported (doesn't matter that it doesn't import this)
class DummyParent extends moduleClassCreator_1.createModule({ type: exports.dummyInterfaceID, initialState: {}, settings: {} }) {
    constructor(someMethod = () => { }) {
        super({ data: {}, requestPath: new requestPath_1.RequestPath(new moduleID_1.ModuleID("test", 0), {}) }, programState_1.ProgramState.getNextModuleID(DummyParent), {}, []);
        this.someMethod = someMethod;
        programState_1.ProgramState.addModule(this);
    }
    async something() {
        this.someMethod();
    }
}
// @ts-ignore
DummyParent.path = "../module/_tests/dummyModules.helper.js"; // A path that can be imported (doesn't matter that it doesn't import this)
describe("InstanceModuleProvider", () => {
    beforeEach(() => {
        registry_1.Registry["moduleProviders"] = {};
        registry_1.Registry.addProvider(new classModuleProvider_1.ClassModuleProvider(DummyModule.getConfig().type, DummyModule));
    });
    it("Should be used by the registry", async () => {
        // Retrieve such a module
        const module = await registry_1.Registry.request({
            type: exports.dummyInterfaceID,
            use: "one",
            parent: new DummyParent(),
        });
        const m = module;
        // Add a instance provider
        registry_1.Registry.addProvider(new instanceModuleProvider_1.InstanceModuleProvider(m.getConfig().type, m, () => 2));
        // Retrieve a module
        const module2 = await registry_1.Registry.request({
            type: exports.dummyInterfaceID,
            use: "one",
            parent: new DummyParent(),
        });
        // Check if it's the same, by testing whether the instanceVal is shared
        await module.test();
        expect(await module2.test()).toBe(2);
    });
    it("Should notify of new connections", async () => {
        let notifyCalled = false;
        let dummyParentCalled = false;
        const module = await registry_1.Registry.request({
            type: exports.dummyInterfaceID,
            use: "one",
            parent: new DummyParent(),
        });
        const m = module;
        // Add a instance provider
        registry_1.Registry.addProvider(new instanceModuleProvider_1.InstanceModuleProvider(m.getConfig().type, m, () => 2, (parent) => {
            parent.something();
            notifyCalled = true;
        }));
        // Retrieve this module hopefulyl same module
        const module2 = await registry_1.Registry.request({
            type: exports.dummyInterfaceID,
            use: "one",
            parent: new DummyParent(() => (dummyParentCalled = true)),
        });
        // Check if both methods are called
        expect(notifyCalled).toBeTruthy();
        expect(dummyParentCalled).toBeTruthy();
    });
});
//# sourceMappingURL=instanceModuleProvider.js.map