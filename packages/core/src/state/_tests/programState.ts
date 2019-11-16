import {DummyModule} from "../../module/_tests/dummyModules.helper";
import {ProgramState} from "../programState";

describe("ProgramState", () => {
    describe("AddModule + GetModule", () => {
        it("Should be able to retrieve a module by path", async () => {
            // Add a module
            const moduleID = ProgramState.getNextModuleID(DummyModule.getPath());
            const module = await DummyModule.createDummy({moduleID});
            ProgramState.addModule(module);
            const ID = module.getID();

            // Retrieve the module
            const retrievedModule = ProgramState.getModule(ID);

            // Check whether it is the same
            expect(retrievedModule).toBe(module);
        });
        it("Should return undefined if there is no such module", () => {
            // Retrieve a non existing module
            const retrievedModule = ProgramState.getModule("something");

            // Make sure it didn't return some actual module
            expect(retrievedModule).toBe(undefined);
        });
    });
});
