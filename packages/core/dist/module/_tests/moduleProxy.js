Object.defineProperty(exports, "__esModule", { value: true });
const dummyModules_helper_1 = require("./dummyModules.helper");
const moduleProxy_1 = require("../moduleProxy");
const moduleID_1 = require("../moduleID");
class Node extends dummyModules_helper_1.DummyModule {
    someMethod() {
        return "yes";
    }
}
const b = new moduleID_1.ModuleID("path", 0);
const a = { parent: null, data: null, type: null };
let nodeProxy;
let nodeProxy2;
describe("ModuleProxy", () => {
    beforeEach(async () => {
        nodeProxy = await Node.createInstance(a, b);
        nodeProxy2 = await Node.createInstance(a, b);
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
            const proxy = moduleProxy_1.ModuleProxy.createInstance(nodeProxy);
            expect(Object.getPrototypeOf(proxy).constructor).toBe(moduleProxy_1.ModuleProxy);
        });
    });
    describe("Connect", () => {
        it("Should set up a bidirectional source connection", () => {
            nodeProxy._connect(nodeProxy2);
            expect(nodeProxy["_source"]).toBe(nodeProxy2);
            expect(nodeProxy2["_source"]).toBe(nodeProxy);
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
            const proxy = MProxy.createInstance(await M.createInstance(a, b));
            const proxy2 = new moduleProxy_1.ModuleProxy(await M.createInstance(a, b));
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
            proxy = NodeProxy.createInstance(nodeProxy);
        });
        it("Should yield true if the proxy's target is of the given interface type", () => {
            expect(proxy.isInstanceof(dummyModules_helper_1.dummyInterfaceID)).toBeTruthy();
        });
        it("Should yield false if the proxy's target is not of the given interface type", () => {
            expect(proxy.isInstanceof(dummyModules_helper_1.dummyInterfaceID2)).toBeFalsy();
        });
    });
    describe("IsParentof", () => {
        let parentProxy;
        let parentProxy2;
        beforeEach(async () => {
            parentProxy = nodeProxy = await Node.createInstance(a, b);
            parentProxy2 = nodeProxy2 = await Node.createInstance(a, b);
        });
        it("Should yield true if the proxy's target is the parent of the given module", async () => {
            const childProxy = await dummyModules_helper_1.DummyModule.createInstance({ parent: parentProxy, data: null, type: null }, b);
            const child = childProxy._target;
            expect(parentProxy.isParentof(child)).toBeTruthy(); // Would be called from within child, with arg 'this'
        });
        it("Should yield false if the proxy's target is not the parent of the given module", async () => {
            const childProxy2 = await dummyModules_helper_1.DummyModule.createInstance({ parent: parentProxy2, data: null, type: null }, b);
            const child2 = childProxy2._target;
            expect(parentProxy.isParentof(child2)).toBeFalsy();
        });
    });
});
//# sourceMappingURL=moduleProxy.js.map