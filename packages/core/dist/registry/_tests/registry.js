Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../registry");
const classModuleProvider_1 = require("../moduleProviders/classModuleProvider");
const dummyModules_helper_1 = require("../../module/_tests/dummyModules.helper");
const moduleClassCreator_1 = require("../../module/moduleClassCreator");
const programState_1 = require("../../state/programState");
const module_1 = require("../../module/module");
class P extends moduleClassCreator_1.createModule({
    type: dummyModules_helper_1.dummyInterfaceID,
    state: {},
    settings: {},
}) {
    static async createCustomInstance() {
        const moduleID = programState_1.ProgramState.getNextModuleID(P.getPath());
        const instance = await super.construct({ requestPath: module_1.Module.createRequestPath(moduleID, null, {}), data: null }, moduleID, {}, []);
        programState_1.ProgramState.addModule(instance);
        return instance;
    }
    async someMethod() { }
}
let p;
describe("Registry + ClassModuleProvider", () => {
    beforeEach(async () => {
        registry_1.Registry["moduleProviders"] = {};
        p = await P.createCustomInstance();
    });
    describe("AddProvider", () => {
        it("Should add and serve the provider", async () => {
            const provider = new classModuleProvider_1.ClassModuleProvider(dummyModules_helper_1.DummyModule.getConfig().type, dummyModules_helper_1.DummyModule);
            registry_1.Registry.addProvider(provider);
            // Check whether the provider can be retrieved
            const providers = await registry_1.Registry["getProviders"]({
                type: dummyModules_helper_1.dummyInterfaceID,
                use: "one",
                data: {},
                parent: null,
                openView: false,
            });
            expect(providers[0]).toBe(provider);
            expect(providers.length).toBe(1);
        });
    });
    describe("RemoveProvider", () => {
        it("Should remove and no longer serve the provider", async () => {
            const provider = new classModuleProvider_1.ClassModuleProvider(dummyModules_helper_1.DummyModule.getConfig().type, dummyModules_helper_1.DummyModule);
            registry_1.Registry.addProvider(provider);
            registry_1.Registry.removeProvider(provider);
            // Check whether the provider can be retrieved
            const providers = await registry_1.Registry["getProviders"]({
                type: dummyModules_helper_1.dummyInterfaceID,
                use: "one",
                data: {},
                parent: null,
                openView: false,
            });
            expect(providers.length).toBe(0);
        });
        it("Should return true if a provider was removed", () => {
            const provider = new classModuleProvider_1.ClassModuleProvider(dummyModules_helper_1.DummyModule.getConfig().type, dummyModules_helper_1.DummyModule);
            registry_1.Registry.addProvider(provider);
            const resp = registry_1.Registry.removeProvider(provider);
            expect(resp).toBe(true);
        });
        it("Should return false if no provider was removed", () => {
            const provider = new classModuleProvider_1.ClassModuleProvider(dummyModules_helper_1.DummyModule.getConfig().type, dummyModules_helper_1.DummyModule);
            const resp = registry_1.Registry.removeProvider(provider);
            expect(resp).toBe(false);
        });
    });
    describe("Request", () => {
        beforeEach(() => {
            registry_1.Registry.addProvider(new classModuleProvider_1.ClassModuleProvider(dummyModules_helper_1.DummyModule.getConfig().type, dummyModules_helper_1.DummyModule));
            registry_1.Registry.addProvider(new classModuleProvider_1.ClassModuleProvider(dummyModules_helper_1.DummyModule4.getConfig().type, dummyModules_helper_1.DummyModule4));
            registry_1.Registry.addProvider(new classModuleProvider_1.ClassModuleProvider(dummyModules_helper_1.DummyModule2.getConfig().type, dummyModules_helper_1.DummyModule2));
        });
        it("Should return a valid module of the requested type", async () => {
            const module = await registry_1.Registry.request({
                type: dummyModules_helper_1.dummyInterfaceID,
                use: "one",
                parent: p,
            });
            expect(await module.test("something")).toBe("something");
            const module2 = await registry_1.Registry.request({
                type: dummyModules_helper_1.dummyInterfaceID2,
                use: "one",
                data: { shit: "test" },
                parent: p,
            });
            expect(await module2.test2("something")).toBe(undefined);
        });
        it("Should return undefined if no such module exists", async () => {
            const module = await registry_1.Registry.request({
                type: dummyModules_helper_1.dummyInterfaceID3,
                use: "one",
                parent: p,
            });
            expect(module).toBe(undefined);
        });
        it("Should use the correct providers", async () => {
            // Request the usage of all providers
            const modules = await registry_1.Registry.request({
                type: dummyModules_helper_1.dummyInterfaceID,
                use: "all",
                parent: p,
            });
            expect(modules.length).toBe(2);
            await Promise.all(modules.map(async (module) => expect(await module.test("something")).toMatch(/something.*/)));
            // Request usage of s custom subset of providers
            const modules2 = await registry_1.Registry.request({
                type: dummyModules_helper_1.dummyInterfaceID,
                use: providers => providers
                    .filter(p => p.provider instanceof classModuleProvider_1.ClassModuleProvider &&
                    "something" in p.provider.getModuleClass())
                    .map(p => p.provider),
                parent: p,
            });
            expect(modules2.length).toBe(1);
            await Promise.all(modules2.map(async (module) => expect(await module.test("something")).toBe("something4")));
        });
    });
    // TODO: add tests for module loading
});
//# sourceMappingURL=registry.js.map