Object.defineProperty(exports, "__esModule", { value: true });
const dummyModules_helper_1 = require("../../module/_tests/dummyModules.helper");
const programState_1 = require("../programState");
const extendedObject_1 = require("../../utils/extendedObject");
const requestPath_1 = require("../../module/requestPath/requestPath");
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
// Source: https://stackoverflow.com/a/11616993/8521718 (I was too lazy to do it myself)
function stringify(object) {
    let cache = [];
    JSON.stringify(object, function (key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Duplicate reference found
                try {
                    // If this value does not reference a parent it can be deduped
                    return JSON.parse(JSON.stringify(value));
                }
                catch (error) {
                    // discard key if value cannot be deduped
                    return;
                }
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // Enable garbage collection
}
describe("ProgramState", () => {
    describe("AddModule + GetModule", () => {
        it("Should be able to retrieve a module by path", async () => {
            // Add a module
            const moduleID = programState_1.ProgramState.getNextModuleID(dummyModules_helper_1.DummyModule.getPath());
            const module = await dummyModules_helper_1.DummyModule.customConstruct({
                requestPath: new requestPath_1.RequestPath(moduleID, {}),
                data: {},
            }, moduleID, {}, []);
            programState_1.ProgramState.addModule(module);
            const ID = module.getID();
            // Retrieve the module
            const retrievedModule = programState_1.ProgramState.getModule(ID);
            // Check whether it is the same
            expect(retrievedModule).toBe(module);
        });
        it("Should return undefined if there is no such module", () => {
            // Retrieve a non existing module
            const retrievedModule = programState_1.ProgramState.getModule("something");
            // Make sure it didn't return some actual module
            expect(retrievedModule).toBe(undefined);
        });
    });
    describe("Serialize", () => {
        it("Should correctly serialize", async () => {
            // Add yet another module
            const moduleID = programState_1.ProgramState.getNextModuleID(dummyModules_helper_1.DummyModule.getPath());
            const module = await dummyModules_helper_1.DummyModule.customConstruct({
                requestPath: new requestPath_1.RequestPath(moduleID, {}),
                data: {},
            }, moduleID, {}, []);
            programState_1.ProgramState.addModule(module);
            // Serialize the state
            const serialized = programState_1.ProgramState.serialize();
            // Check if this is valid json data
            expect(JSON.parse(JSON.stringify(serialized))).toEqual(serialized);
            // Make sure it stored at least a module
            const paths = Object.keys(serialized.modules);
            expect(paths.length > 0);
            // Make sure the maxids are tracked correctly
            const someModuleData = serialized.modules[paths[0]];
            const type = someModuleData.$type;
            const count = extendedObject_1.ExtendedObject.reduce(serialized.modules, (cur, data, path) => (data.$type == type ? 1 : 0) + cur, 0);
            expect(serialized.maxModuleIDS[type] > count);
        });
    });
    describe("Deserialize", () => {
        it("Should correctly deserialize", async () => {
            // Add yet another module
            const moduleID = programState_1.ProgramState.getNextModuleID(dummyModules_helper_1.DummyModule.getPath());
            const module = await dummyModules_helper_1.DummyModule.customConstruct({
                requestPath: new requestPath_1.RequestPath(moduleID, {}),
                data: {},
            }, moduleID, {}, []);
            programState_1.ProgramState.addModule(module);
            const ID = module.getID();
            // Serialize the state
            const serialized = programState_1.ProgramState.serialize();
            // Reset the program state
            programState_1.ProgramState["modules"] = {};
            programState_1.ProgramState["maxModuleIDs"] = {};
            // Deserialize the state
            programState_1.ProgramState.deserialize(serialized);
            // Get the same module from the state
            const retrievedModule = programState_1.ProgramState.getModule(ID);
            // Check if the retrieved module and defined module are the same
            expect(stringify(retrievedModule)).toBe(stringify(module));
        });
    });
});
//# sourceMappingURL=programState.js.map