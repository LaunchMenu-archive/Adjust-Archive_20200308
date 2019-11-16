Object.defineProperty(exports, "__esModule", { value: true });
const dummyModules_helper_1 = require("./dummyModules.helper");
const remoteModuleProxy_1 = require("../remoteModuleProxy");
const registry_1 = require("../../registry/registry");
const classModuleProvider_1 = require("../../registry/moduleProviders/classModuleProvider");
describe("RemoteNodeProxy", () => {
    describe("CreateClass", () => {
        it("Should create a new RemoteNodeProxy class", () => {
            const ModuleProxy = remoteModuleProxy_1.RemoteModuleProxy.createClass(dummyModules_helper_1.DummyModule);
            expect(Object.getPrototypeOf(ModuleProxy)).toBe(remoteModuleProxy_1.RemoteModuleProxy);
        });
        it("Should contain the methods of the programNode", () => {
            const ModuleProxy = remoteModuleProxy_1.RemoteModuleProxy.createClass(dummyModules_helper_1.DummyModule);
            expect("smth" in ModuleProxy.prototype).toBeTruthy();
        });
    });
    describe("CreateInstance", () => {
        it("Should create a new instance of this class", async () => {
            registry_1.Registry.addProvider(new classModuleProvider_1.ClassModuleProvider(dummyModules_helper_1.DummyModule.getConfig().type, dummyModules_helper_1.DummyModule));
            const module = await registry_1.Registry.request({
                type: dummyModules_helper_1.dummyInterfaceID,
                use: "one",
                parent: undefined,
            });
            const proxy = remoteModuleProxy_1.RemoteModuleProxy.createInstance(module.getID());
            expect(Object.getPrototypeOf(proxy).constructor).toBe(remoteModuleProxy_1.RemoteModuleProxy);
        });
    });
    // TODO: add some tests with actual behavior
});
//# sourceMappingURL=remoteModuleProxy.js.map