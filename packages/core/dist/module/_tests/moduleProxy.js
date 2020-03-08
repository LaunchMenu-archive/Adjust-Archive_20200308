Object.defineProperty(exports, "__esModule", { value: true });
const dummyModules_helper_1 = require("./dummyModules.helper");
const moduleProxy_1 = require("../moduleProxy");
class Node extends dummyModules_helper_1.DummyModule {
    someMethod() {
        return "yes";
    }
}
let node;
let node2;
describe("ModuleProxy", () => {
    beforeEach(async () => {
        node = await Node.createDummy();
        node2 = await Node.createDummy();
    });
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
            const proxy = moduleProxy_1.ModuleProxy.createInstance(node);
            expect(Object.getPrototypeOf(proxy).constructor).toBe(moduleProxy_1.ModuleProxy);
        });
    });
    describe("Instanciation", () => {
        it("Should not error", () => {
            new moduleProxy_1.ModuleProxy(node);
        });
    });
    describe("Connect", () => {
        it("Should set up a bidirectional source connection", () => {
            const proxy1 = new moduleProxy_1.ModuleProxy(node);
            const proxy2 = new moduleProxy_1.ModuleProxy(node2);
            proxy1._connect(proxy2);
            expect(proxy1["_source"]).toBe(proxy2);
            expect(proxy2["_source"]).toBe(proxy1);
        });
        it("Should make the callContext available to a programNode on method calls", async () => {
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
            const proxy = MProxy.createInstance(await M.createDummy());
            const proxy2 = new moduleProxy_1.ModuleProxy(await M.createDummy());
            proxy._connect(proxy2);
            // Call the method
            expect(proxy.someMethod()).toBe("shit");
        });
    });
    describe("IsInstanceof", () => {
        let NodeProxy;
        let proxy;
        beforeEach(() => {
            NodeProxy = moduleProxy_1.ModuleProxy.createClass(Node);
            proxy = NodeProxy.createInstance(node);
        });
        it("Should yield true if the proxy's target is of the given interface type", () => {
            expect(proxy.isInstanceof(dummyModules_helper_1.dummyInterfaceID)).toBeTruthy();
        });
        it("Should yield false if the proxy's target is not of the given interface type", () => {
            expect(proxy.isInstanceof(dummyModules_helper_1.dummyInterfaceID2)).toBeFalsy();
        });
    });
    describe("IsParentof", () => {
        let parent;
        let parentProxy;
        beforeEach(async () => {
            node = await Node.createDummy();
            node2 = await Node.createDummy();
            parent = node;
            parentProxy = parent.createProxy();
        });
        it("Should yield true if the proxy's target is the parent of the given module", async () => {
            const child = await dummyModules_helper_1.DummyModule.createDummy({ parent: parentProxy });
            const childProxy = child.createProxy();
            parentProxy._connect(childProxy);
            expect(parentProxy.isParentof(child)).toBeTruthy(); // Would be called from within child, with arg 'this'
        });
        it("Should yield false if the proxy's target is not the parent of the given module", async () => {
            const parent2 = node2;
            const child2 = await dummyModules_helper_1.DummyModule.createDummy({ parent: parent2.createProxy() });
            expect(parentProxy.isParentof(child2)).toBeFalsy();
        });
    });
});
//# sourceMappingURL=moduleProxy.js.map