import {DummyModule, dummyInterfaceID, dummyInterfaceID2} from "./dummyModules.helper";
import {ModuleProxy} from "../moduleProxy";
import {ModuleID} from "../moduleID";
import {RequestPath} from "../requestPath/requestPath";

class Node extends DummyModule {
    public someMethod(): string {
        return "yes";
    }
}
const b = new ModuleID("path", 0);
const a = {parent: undefined, data: undefined, requestPath: new RequestPath(b, {})};
const c = {};
const d = [];
let node;
let node2;

describe("ModuleProxy", () => {
    beforeEach(async () => {
        node = await Node.customConstruct(a, b, c, d);
        node2 = await Node.customConstruct(a, b, c, d);
    });
    describe("CreateClass", () => {
        it("Should create a new ModuleProxy class", () => {
            const NodeProxy = ModuleProxy.createClass(Node);
            expect(Object.getPrototypeOf(NodeProxy)).toBe(ModuleProxy);
        });
        it("Should contain the methods of the module", () => {
            const NodeProxy = ModuleProxy.createClass(Node);
            expect("someMethod" in NodeProxy.prototype).toBeTruthy();
        });
    });
    describe("CreateInstance", () => {
        it("Should create a new instance of this class", () => {
            const proxy = ModuleProxy.createInstance(node);
            expect(Object.getPrototypeOf(proxy).constructor).toBe(ModuleProxy);
        });
    });
    describe("Instanciation", () => {
        it("Should not error", () => {
            new ModuleProxy(node);
        });
    });
    describe("Connect", () => {
        it("Should set up a bidirectional source connection", () => {
            const proxy1 = new ModuleProxy(node);
            const proxy2 = new ModuleProxy(node2);
            proxy1._connect(proxy2);
            expect(proxy1["_source"]).toBe(proxy2);
            expect(proxy2["_source"]).toBe(proxy1);
        });
        it("Should make the callContext available to a programNode on method calls", async () => {
            // Create a custom programNode class
            class M extends Node {
                public someMethod(): string {
                    expect(this.getCallContext()).toBe(proxy2);
                    return "shit";
                }
            }

            // Create proxy class
            const MProxy = ModuleProxy.createClass(M);

            // Set up proxies
            const proxy = MProxy.createInstance(await M.customConstruct(a, b, c, d));
            const proxy2 = new ModuleProxy(await M.customConstruct(a, b, c, d));
            proxy.connect(proxy2);

            // Call the method
            expect(proxy.someMethod()).toBe("shit");
        });
    });
    describe("IsInstanceof", () => {
        let NodeProxy;
        let proxy;
        beforeEach(() => {
            NodeProxy = ModuleProxy.createClass(Node);
            proxy = NodeProxy.createInstance(node);
        });
        it("Should yield true if the proxy's target is of the given interface type", () => {
            expect(proxy.isInstanceof(dummyInterfaceID)).toBeTruthy();
        });
        it("Should yield false if the proxy's target is not of the given interface type", () => {
            expect(proxy.isInstanceof(dummyInterfaceID2)).toBeFalsy();
        });
    });
    describe("IsParentof", () => {
        let parent;
        let parentProxy;
        beforeEach(async () => {
            node = await Node.customConstruct(a, b, c, d);
            node2 = await Node.customConstruct(a, b, c, d);
            parent = node;
            parentProxy = parent.createProxy();
        });

        it("Should yield true if the proxy's target is the parent of the given module", async () => {
            const child = await DummyModule.customConstruct(
                {
                    data: {},
                    requestPath: undefined,
                },
                b,
                c,
                [parentProxy]
            );
            const childProxy = child.createProxy();
            parentProxy.connect(childProxy);
            expect(parentProxy.isParentof(child)).toBeTruthy(); // Would be called from within child, with arg 'this'
        });

        it("Should yield false if the proxy's target is not the parent of the given module", async () => {
            const parent2 = node2;
            const child2 = await DummyModule.customConstruct(
                {
                    data: {},
                    requestPath: undefined,
                },
                b,
                c,
                [parent2.createProxy()]
            );
            expect(parentProxy.isParentof(child2)).toBeFalsy();
        });
    });
});
