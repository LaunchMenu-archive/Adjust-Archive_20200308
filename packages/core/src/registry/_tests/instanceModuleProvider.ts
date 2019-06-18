import {Registry} from "../registry";
import {ClassModuleProvider} from "../moduleProviders/classModuleProvider";
import {InstanceModuleProvider} from "../moduleProviders/instanceModuleProvider";
import {ParameterizedModule} from "../../module/module";
import {createModule} from "../../module/moduleClassCreator";
import {ProgramState} from "../../state/programState";
import {PublicModuleMethods} from "../../module/_types/publicModuleMethods";
import {RequestPath} from "../../module/requestPath/requestPath";
import {ModuleID} from "../../module/moduleID";

export type dummyInterface = {
    test: () => Promise<number>;
} & PublicModuleMethods;
export type dummyParentInterface = {
    something: () => Promise<void>;
};
export const dummyInterfaceID = Registry.createInterfaceID<{
    parent: dummyParentInterface;
    child: dummyInterface;
}>(__filename + "1");
export class DummyModule
    extends createModule({initialState: {}, settings: {}, type: dummyInterfaceID})
    implements dummyInterface {
    protected instanceVal: number = 0;

    public async test(): Promise<number> {
        return ++this.instanceVal;
    }
}
// @ts-ignore
DummyModule.path = "../module/_tests/dummyModules.helper.js"; // A path that can be imported (doesn't matter that it doesn't import this)

class DummyParent
    extends createModule({type: dummyInterfaceID, initialState: {}, settings: {}})
    implements dummyParentInterface {
    protected someMethod: () => void;
    constructor(someMethod: () => void = () => {}) {
        super(
            {data: {}, requestPath: new RequestPath(new ModuleID("test", 0), {})},
            ProgramState.getNextModuleID(DummyParent),
            {},
            []
        );
        this.someMethod = someMethod;
        ProgramState.addModule(this);
    }
    async something(): Promise<void> {
        this.someMethod();
    }
}
// @ts-ignore
DummyParent.path = "../module/_tests/dummyModules.helper.js"; // A path that can be imported (doesn't matter that it doesn't import this)

describe("InstanceModuleProvider", () => {
    beforeEach(() => {
        Registry["moduleProviders"] = {};
        Registry.addProvider(
            new ClassModuleProvider(DummyModule.getConfig().type, DummyModule)
        );
    });
    it("Should be used by the registry", async () => {
        // Retrieve such a module
        const module = await Registry.request({
            type: dummyInterfaceID,
            use: "one",
            parent: new DummyParent(),
        });
        const m: ParameterizedModule = module as any;

        // Add a instance provider
        Registry.addProvider(new InstanceModuleProvider(m.getConfig().type, m, () => 2));

        // Retrieve a module
        const module2 = await Registry.request({
            type: dummyInterfaceID,
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

        const module = await Registry.request({
            type: dummyInterfaceID,
            use: "one",
            parent: new DummyParent(),
        });
        const m: ParameterizedModule = module as any;

        // Add a instance provider
        Registry.addProvider(
            new InstanceModuleProvider(
                m.getConfig().type,
                m,
                () => 2,
                (parent: ParameterizedModule & dummyParentInterface) => {
                    parent.something();
                    notifyCalled = true;
                }
            )
        );

        // Retrieve this module hopefulyl same module
        const module2 = await Registry.request({
            type: dummyInterfaceID,
            use: "one",
            parent: new DummyParent(() => (dummyParentCalled = true)),
        });

        // Check if both methods are called
        expect(notifyCalled).toBeTruthy();
        expect(dummyParentCalled).toBeTruthy();
    });
});
