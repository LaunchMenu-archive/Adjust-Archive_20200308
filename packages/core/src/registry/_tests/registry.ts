import Path from "path";
import {Registry} from "../registry";
import {ClassModuleProvider} from "../moduleProviders/classModuleProvider";
import {
    DummyModule,
    dummyInterfaceID,
    DummyModule4,
    DummyModule2,
    dummyInterfaceID2,
    dummyInterfaceID3,
} from "../../module/_tests/dummyModules.helper";
import {createModule} from "../../module/moduleClassCreator";
import {ProgramState} from "../../state/programState";
import {Module} from "../../module/module";

class P extends createModule({
    type: dummyInterfaceID,
    initialState: {},
    settings: {},
}) {
    static async createCustomInstance() {
        const moduleID = ProgramState.getNextModuleID(P.getPath());
        const instance = await super.construct(
            {requestPath: Module.createRequestPath(moduleID, null, {}), data: null},
            moduleID,
            {},
            []
        );
        ProgramState.addModule(instance);
        return instance;
    }
    async someMethod() {}
}
let p;

describe("Registry + ClassModuleProvider", () => {
    beforeEach(async () => {
        Registry["moduleProviders"] = {};
        p = await P.createCustomInstance();
    });
    describe("AddProvider", () => {
        it("Should add and serve the provider", async () => {
            const provider = new ClassModuleProvider(
                DummyModule.getConfig().type,
                DummyModule
            );
            Registry.addProvider(provider);

            // Check whether the provider can be retrieved
            const providers = await Registry["getProviders"]({
                type: dummyInterfaceID,
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
            const provider = new ClassModuleProvider(
                DummyModule.getConfig().type,
                DummyModule
            );
            Registry.addProvider(provider);
            Registry.removeProvider(provider);

            // Check whether the provider can be retrieved
            const providers = await Registry["getProviders"]({
                type: dummyInterfaceID,
                use: "one",
                data: {},
                parent: null,
                openView: false,
            });

            expect(providers.length).toBe(0);
        });
        it("Should return true if a provider was removed", () => {
            const provider = new ClassModuleProvider(
                DummyModule.getConfig().type,
                DummyModule
            );
            Registry.addProvider(provider);
            const resp = Registry.removeProvider(provider);

            expect(resp).toBe(true);
        });
        it("Should return false if no provider was removed", () => {
            const provider = new ClassModuleProvider(
                DummyModule.getConfig().type,
                DummyModule
            );
            const resp = Registry.removeProvider(provider);

            expect(resp).toBe(false);
        });
    });
    describe("Request", () => {
        beforeEach(() => {
            Registry.addProvider(
                new ClassModuleProvider(DummyModule.getConfig().type, DummyModule)
            );
            Registry.addProvider(
                new ClassModuleProvider(DummyModule4.getConfig().type, DummyModule4)
            );
            Registry.addProvider(
                new ClassModuleProvider(DummyModule2.getConfig().type, DummyModule2)
            );
        });

        it("Should return a valid module of the requested type", async () => {
            const module = await Registry.request({
                type: dummyInterfaceID,
                use: "one",
                parent: p,
            });
            expect(await module.test("something")).toBe("something");

            const module2 = await Registry.request({
                type: dummyInterfaceID2,
                use: "one",
                data: {shit: "test"},
                parent: p,
            });
            expect(await module2.test2("something")).toBe(undefined);
        });
        it("Should return undefined if no such module exists", async () => {
            const module = await Registry.request({
                type: dummyInterfaceID3,
                use: "one",
                parent: p,
            });
            expect(module).toBe(undefined);
        });
        it("Should use the correct providers", async () => {
            // Request the usage of all providers
            const modules = await Registry.request({
                type: dummyInterfaceID,
                use: "all",
                parent: p,
            });
            expect(modules.length).toBe(2);
            await Promise.all(
                modules.map(async module =>
                    expect(await module.test("something")).toMatch(/something.*/)
                )
            );

            // Request usage of s custom subset of providers
            const modules2 = await Registry.request({
                type: dummyInterfaceID,
                use: providers =>
                    providers
                        .filter(
                            p =>
                                p.provider instanceof ClassModuleProvider &&
                                "something" in p.provider.getModuleClass()
                        )
                        .map(p => p.provider),
                parent: p,
            });
            expect(modules2.length).toBe(1);
            await Promise.all(
                modules2.map(async module =>
                    expect(await module.test("something")).toBe("something4")
                )
            );
        });
    });
    // TODO: add tests for module loading
});
