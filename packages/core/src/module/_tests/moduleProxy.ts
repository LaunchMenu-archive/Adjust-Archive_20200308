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

describe("ModuleProxy", () => {
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
            const proxy = ModuleProxy.createInstance(new Node(a, b, c, d));
            expect(Object.getPrototypeOf(proxy).constructor).toBe(ModuleProxy);
        });
    });
    describe("Instanciation", () => {
        it("Should not error", () => {
            new ModuleProxy(new Node(a, b, c, d));
        });
    });
    describe("Connect", () => {
        it("Should set up a bidirectional source connection", () => {
            const proxy1 = new ModuleProxy(new Node(a, b, c, d));
            const proxy2 = new ModuleProxy(new Node(a, b, c, d));
            proxy1.connect(proxy2);
            expect(proxy1["_source"]).toBe(proxy2);
            expect(proxy2["_source"]).toBe(proxy1);
        });
        it("Should make the callContext available to a programNode on method calls", () => {
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
            const proxy = MProxy.createInstance(new M(a, b, c, d));
            const proxy2 = new ModuleProxy(new M(a, b, c, d));
            proxy.connect(proxy2);

            // Call the method
            expect(proxy.someMethod()).toBe("shit");
        });
    });
    describe("IsInstanceof", () => {
        const NodeProxy = ModuleProxy.createClass(Node);
        const proxy = NodeProxy.createInstance(new Node(a, b, c, d));
        it("Should yield true if the proxy's target is of the given interface type", () => {
            expect(proxy.isInstanceof(dummyInterfaceID)).toBeTruthy();
        });
        it("Should yield false if the proxy's target is not of the given interface type", () => {
            expect(proxy.isInstanceof(dummyInterfaceID2)).toBeFalsy();
        });
    });
    describe("IsParentof", () => {
        const parent = new Node(a, b, c, d);
        const parentProxy = parent.createProxy();

        const child = new DummyModule(
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

        it("Should yield true if the proxy's target is the parent of the given module", () => {
            expect(parentProxy.isParentof(child)).toBeTruthy(); // Would be called from within child, with arg 'this'
        });

        const parent2 = new Node(a, b, c, d);
        const child2 = new DummyModule(
            {
                data: {},
                requestPath: undefined,
            },
            b,
            c,
            [parent2.createProxy()]
        );
        it("Should yield false if the proxy's target is not the parent of the given module", () => {
            expect(parentProxy.isParentof(child2)).toBeFalsy();
        });
    });
});
