var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const registry_1 = require("../../registry/registry");
const moduleClassCreator_1 = require("../moduleClassCreator");
exports.dummyInterfaceID = registry_1.Registry.createInterfaceID(__filename + "1");
class DummyModule extends moduleClassCreator_1.createModule({ initialState: {}, settings: {}, type: exports.dummyInterfaceID }) {
    static async customConstruct(request, moduleID, initialState, parents) {
        return this.construct(request, moduleID, initialState, parents);
    }
    async test(text) {
        return text;
    }
}
exports.DummyModule = DummyModule;
exports.default = DummyModule; // In order to import it as a module from the registry
// @ts-ignore
DummyModule.path = ["", "..", "module", "_tests", "dummyModules.helper.js"].join(path_1.default.sep); // A path that can be imported
exports.dummyInterfaceID2 = registry_1.Registry.createInterfaceID(__filename + "2");
class DummyModule2 extends moduleClassCreator_1.createModule({ initialState: {}, settings: {}, type: exports.dummyInterfaceID2 }) {
    async test2(text) {
        // Example of type safe detection of what module called it
        const callContext = this.getCallContext();
        if (callContext.isInstanceof(exports.dummyInterfaceID2)) {
            console.log(callContext.test2);
        }
        else if (callContext.isParentof(this)) {
            console.log(callContext.someMethod);
        }
    }
}
exports.DummyModule2 = DummyModule2;
// @ts-ignore
DummyModule2.path = "test2";
exports.dummyInterfaceID3 = registry_1.Registry.createInterfaceID(__filename + "3");
class DummyModule4 extends moduleClassCreator_1.createModule({ initialState: {}, settings: {}, type: exports.dummyInterfaceID }) {
    async test(text) {
        return text + "4";
    }
    // Just something to identify this class by
    static something() {
        return true;
    }
}
exports.DummyModule4 = DummyModule4;
// @ts-ignore
DummyModule4.path = "test4";
//# sourceMappingURL=dummyModules.helper.js.map