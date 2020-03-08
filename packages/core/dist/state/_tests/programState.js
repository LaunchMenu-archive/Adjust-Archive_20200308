Object.defineProperty(exports, "__esModule", { value: true });
const dummyModules_helper_1 = require("../../module/_tests/dummyModules.helper");
const programState_1 = require("../programState");
describe("ProgramState", () => {
    describe("AddModule + GetModule", () => {
        it("Should be able to retrieve a module by path", async () => {
            // Add a module
            const moduleID = programState_1.ProgramState.getNextModuleID(dummyModules_helper_1.DummyModule.getPath());
            const module = await dummyModules_helper_1.DummyModule.createDummy({ moduleID });
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
});
//# sourceMappingURL=programState.js.map