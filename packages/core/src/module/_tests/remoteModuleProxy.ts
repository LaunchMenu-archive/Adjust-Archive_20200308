import {DummyModule, dummyInterfaceID} from "./dummyModules.helper";
import {RemoteModuleProxy} from "../remoteModuleProxy";
import {Registry} from "../../registry/registry";
import {ClassModuleProvider} from "../../registry/moduleProviders/classModuleProvider";
import {ParameterizedModule} from "../module";

describe("RemoteNodeProxy", () => {
    describe("CreateClass", () => {
        it("Should create a new RemoteNodeProxy class", () => {
            const ModuleProxy = RemoteModuleProxy.createClass(DummyModule);
            expect(Object.getPrototypeOf(ModuleProxy)).toBe(RemoteModuleProxy);
        });
        it("Should contain the methods of the programNode", () => {
            const ModuleProxy = RemoteModuleProxy.createClass(DummyModule);
            expect("smth" in ModuleProxy.prototype).toBeTruthy();
        });
    });
    describe("CreateInstance", () => {
        it("Should create a new instance of this class", async () => {
            Registry.addProvider(
                new ClassModuleProvider(DummyModule.getConfig().type, DummyModule)
            );
            const module = await Registry.request({
                type: dummyInterfaceID,
                use: "one",
                parent: undefined,
            });
            const proxy = RemoteModuleProxy.createInstance(
                ((module as any) as ParameterizedModule).getID()
            );
            expect(Object.getPrototypeOf(proxy).constructor).toBe(RemoteModuleProxy);
        });
    });
    // TODO: add some tests with actual behavior
});
