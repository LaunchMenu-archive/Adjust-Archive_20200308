Object.defineProperty(exports, "__esModule", { value: true });
const dummyModules_helper_1 = require("./dummyModules.helper");
const moduleProxy_1 = require("../moduleProxy");
const moduleID_1 = require("../moduleID");
const requestPath_1 = require("../requestPath/requestPath");
class Node extends dummyModules_helper_1.DummyModule {
    someMethod() {
        return "yes";
    }
}
const b = new moduleID_1.ModuleID("path", 0);
const a = { parent: undefined, data: undefined, requestPath: new requestPath_1.RequestPath(b, {}) };
const c = {};
const d = [];
describe("ModuleProxy", () => {
    describe("CreateClass", () => {
        it("Should create a new ModuleProxy class", () => {
            const NodeProxy = moduleProxy_1.ModuleProxy.createClass(Node);
            expect(Object.getPrototypeOf(NodeProxy)).toBe(moduleProxy_1.ModuleProxy);
        });
        it("Should contain the methods of the module", () => {
            const NodeProxy = moduleProxy_1.ModuleProxy.createClass(Node);
            expect("someMethod" in NodeProxy.prototype).toBeTruthy();
        });
    });
    describe("CreateInstance", () => {
        it("Should create a new instance of this class", () => {
            const proxy = moduleProxy_1.ModuleProxy.createInstance(new Node(a, b, c, d));
            expect(Object.getPrototypeOf(proxy).constructor).toBe(moduleProxy_1.ModuleProxy);
        });
    });
    describe("Instanciation", () => {
        it("Should not error", () => {
            new moduleProxy_1.ModuleProxy(new Node(a, b, c, d));
        });
    });
    describe("Connect", () => {
        it("Should set up a bidirectional source connection", () => {
            const proxy1 = new moduleProxy_1.ModuleProxy(new Node(a, b, c, d));
            const proxy2 = new moduleProxy_1.ModuleProxy(new Node(a, b, c, d));
            proxy1.connect(proxy2);
            expect(proxy1["_source"]).toBe(proxy2);
            expect(proxy2["_source"]).toBe(proxy1);
        });
        it("Should make the callContext available to a programNode on method calls", () => {
            // Create a custom programNode class
            class M extends Node {
                someMethod() {
                    expect(this.getCallContext()).toBe(proxy2);
                    return "shit";
                }
            }
            // Create proxy class
            const MProxy = moduleProxy_1.ModuleProxy.createClass(M);
            // Set up proxies
            const proxy = MProxy.createInstance(new M(a, b, c, d));
            const proxy2 = new moduleProxy_1.ModuleProxy(new M(a, b, c, d));
            proxy.connect(proxy2);
            // Call the method
            expect(proxy.someMethod()).toBe("shit");
        });
    });
    describe("IsInstanceof", () => {
        const NodeProxy = moduleProxy_1.ModuleProxy.createClass(Node);
        const proxy = NodeProxy.createInstance(new Node(a, b, c, d));
        it("Should yield true if the proxy's target is of the given interface type", () => {
            expect(proxy.isInstanceof(dummyModules_helper_1.dummyInterfaceID)).toBeTruthy();
        });
        it("Should yield false if the proxy's target is not of the given interface type", () => {
            expect(proxy.isInstanceof(dummyModules_helper_1.dummyInterfaceID2)).toBeFalsy();
        });
    });
    describe("IsParentof", () => {
        const parent = new Node(a, b, c, d);
        const parentProxy = parent.createProxy();
        const child = new dummyModules_helper_1.DummyModule({
            data: {},
            requestPath: undefined,
        }, b, c, [parentProxy]);
        const childProxy = child.createProxy();
        parentProxy.connect(childProxy);
        it("Should yield true if the proxy's target is the parent of the given module", () => {
            expect(parentProxy.isParentof(child)).toBeTruthy(); // Would be called from within child, with arg 'this'
        });
        const parent2 = new Node(a, b, c, d);
        const child2 = new dummyModules_helper_1.DummyModule({
            data: {},
            requestPath: undefined,
        }, b, c, [parent2.createProxy()]);
        it("Should yield false if the proxy's target is not the parent of the given module", () => {
            expect(parentProxy.isParentof(child2)).toBeFalsy();
        });
    });
});
//# sourceMappingURL=moduleProxy.js.map