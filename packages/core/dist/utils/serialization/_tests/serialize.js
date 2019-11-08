Object.defineProperty(exports, "__esModule", { value: true });
const serialize_1 = require("../serialize");
const dummyModules_helper_1 = require("../../../module/_tests/dummyModules.helper");
const moduleClassCreator_1 = require("../../../module/moduleClassCreator");
const programState_1 = require("../../../state/programState");
class P extends moduleClassCreator_1.createModule({
    type: dummyModules_helper_1.dummyInterfaceID,
    state: {},
    settings: {},
}) {
    static async createCustomInstance() {
        const moduleID = programState_1.ProgramState.getNextModuleID(P.getPath());
        const instance = await super.createInstance({ parent: null, data: null, type: null }, moduleID);
        programState_1.ProgramState.addModule(instance);
        return instance;
    }
    async someMethod() { }
}
describe("Serialize", () => {
    describe("Serialize", () => {
        it("Should keep json data", () => {
            const data = {
                stuff: 3,
                something: true,
                object: { crap: "stuff", ar: ["poop"] },
            };
            const serialized = serialize_1.Serialize.serialize(data);
            expect(serialized).toEqual(data);
        });
        it("Should serialize modules to a reference", async () => {
            const data = {
                someModule: { module: await P.createCustomInstance() },
            };
            const ID = data.someModule.module.getID();
            const serialized = serialize_1.Serialize.serialize(data);
            expect(serialized).toEqual({
                someModule: { module: { $type: "ModuleReference", data: ID.toString() } },
            });
        });
        it("Should 'escape' dollar signs of `type`", async () => {
            const data = {
                $type: "stuff",
                $$type: "stuff2",
            };
            const serialized = serialize_1.Serialize.serialize(data);
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
                        setTimeout(() => resolve({ test: 4 }), 10);
                    }),
                },
            };
            const serialized = await new Promise(res => {
                let left = 2;
                const serialized = serialize_1.Serialize.serialize(data, (key, value) => {
                    if (key == "spoop.smth") {
                        expect(value).toEqual({ test: 4 });
                    }
                    else if (key == "something.prom") {
                        expect(value).toEqual("stuff");
                    }
                    else {
                        expect(false).toBeTruthy();
                    }
                    if (--left == 0)
                        res(serialized);
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
                object: { crap: "stuff", ar: ["poop"] },
            };
            const serialized = serialize_1.Serialize.deserialize(data, () => undefined);
            expect(serialized).toEqual(data);
        });
        it("Should deserialize a reference to a module", async () => {
            const data = {
                someModule: { module: { $type: "ModuleReference", data: "stuff" } },
            };
            const deserialized = serialize_1.Serialize.deserialize(data, path => path);
            expect(deserialized).toEqual({
                someModule: { module: "stuff" },
            });
        });
        it("Should 'unescape' dollar signs of `type`", async () => {
            const data = {
                $$type: "stuff",
                $$$type: "stuff2",
            };
            const serialized = serialize_1.Serialize.deserialize(data, () => undefined);
            expect(serialized).toEqual({
                $type: "stuff",
                $$type: "stuff2",
            });
        });
    });
});
//# sourceMappingURL=serialize.js.map