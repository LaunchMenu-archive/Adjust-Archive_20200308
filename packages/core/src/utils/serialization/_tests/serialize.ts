import {Serialize} from "../serialize";
import {dummyInterfaceID} from "../../../module/_tests/dummyModules.helper";
import {createModule} from "../../../module/moduleClassCreator";
import {ProgramState} from "../../../state/programState";
import {Module} from "../../../module/module";

class P extends createModule({
    type: dummyInterfaceID,
    state: {},
    settings: {},
}) {
    static async createCustomInstance() {
        const moduleID = ProgramState.getNextModuleID(P.getPath());
        const instance = await super.construct(
            {requestPath: Module.createRequestPath(moduleID, null, {}), data: null},
            moduleID,
            {},
            []
        );
        ProgramState.addModule(instance);
        return instance;
    }
    async someMethod() {}
}

describe("Serialize", () => {
    describe("Serialize", () => {
        it("Should keep json data", () => {
            const data = {
                stuff: 3,
                something: true,
                object: {crap: "stuff", ar: ["poop"]},
            };
            const serialized = Serialize.serialize(data);
            expect(serialized).toEqual(data);
        });
        it("Should serialize modules to a reference", async () => {
            const data = {
                someModule: {module: await P.createCustomInstance()},
            };
            const ID = data.someModule.module.getID();
            const serialized = Serialize.serialize(data);
            expect(serialized).toEqual({
                someModule: {module: {$type: "ModuleReference", data: ID.toString()}},
            });
        });
        it("Should 'escape' dollar signs of `type`", async () => {
            const data = {
                $type: "stuff",
                $$type: "stuff2",
            };
            const serialized = Serialize.serialize(data);
            expect(serialized).toEqual({
                $$type: "stuff",
                $$$type: "stuff2",
            });
        });
        it("Should be able to handle promises with a callback", async () => {
            const data = {
                something: {
                    test: true,
                    prom: Promise.resolve("stuff"),
                },
                spoop: {
                    smth: new Promise(resolve => {
                        setTimeout(() => resolve({test: 4}), 10);
                    }) as Promise<{test: number}>,
                },
            };
            const serialized = await new Promise(res => {
                let left = 2;
                const serialized = Serialize.serialize(data, (key, value) => {
                    if (key == "spoop.smth") {
                        expect(value).toEqual({test: 4});
                    } else if (key == "something.prom") {
                        expect(value).toEqual("stuff");
                    } else {
                        expect(false).toBeTruthy();
                    }
                    if (--left == 0) res(serialized);
                });
            });
            expect(serialized).toEqual({
                something: {
                    test: true,
                    prom: null,
                },
                spoop: {
                    smth: null,
                },
            });
        });
    });
    describe("Deserialize", () => {
        it("Should keep json data", () => {
            const data = {
                stuff: 3,
                something: true,
                object: {crap: "stuff", ar: ["poop"]},
            };
            const serialized = Serialize.deserialize(data, () => undefined);
            expect(serialized).toEqual(data);
        });
        it("Should deserialize a reference to a module", async () => {
            const data = {
                someModule: {module: {$type: "ModuleReference", data: "stuff"}},
            };
            const deserialized = Serialize.deserialize(data, path => path);
            expect(deserialized).toEqual({
                someModule: {module: "stuff"},
            });
        });
        it("Should 'unescape' dollar signs of `type`", async () => {
            const data = {
                $$type: "stuff",
                $$$type: "stuff2",
            };
            const serialized = Serialize.deserialize(data, () => undefined);
            expect(serialized).toEqual({
                $type: "stuff",
                $$type: "stuff2",
            });
        });
    });
});
