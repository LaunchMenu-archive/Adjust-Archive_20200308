Object.defineProperty(exports, "__esModule", { value: true });
const dummyModules_helper_1 = require("./dummyModules.helper");
const moduleClassCreator_1 = require("../moduleClassCreator");
// A config for our module
const config = {
    initialState: {
        val: "hello",
    },
    settings: {
        val: { default: 3, type: "number" },
    },
    type: dummyModules_helper_1.dummyInterfaceID,
};
// A config for a module that extends our module
const config2 = {
    initialState: {
        category: {
            val: 7,
        },
    },
    settings: {
        category: {
            val: { default: true, type: "number" },
        },
    },
    type: dummyModules_helper_1.dummyInterfaceID,
};
// Note that a lot of these 'test' are typescript tests to check how intellisense deals with stuff, not runtime tests
describe("ModuleClassCreator", () => {
    describe("CreateModule", () => {
        it("Should be able to be used to extend the default module class", () => {
            // Creating a new module
            class OurImplementation extends moduleClassCreator_1.createModule(config) {
                somethings(inp) {
                    this.setState({ val: "yes" });
                    this.setState({});
                    this.setState({ val: 3 });
                    // this.setState({val: false}); // errors, since val us string | number
                    // const p: string = this.settings.val; // error, cus stuff is of type number
                }
            }
            expect(OurImplementation.getConfig()).toEqual({
                initialState: {
                    val: "hello",
                    isStopping: false,
                    isStopped: false,
                },
                settings: {
                    val: { default: 3, type: "number" },
                },
                onInstall: expect.any(Function),
                abstract: undefined,
                type: dummyModules_helper_1.dummyInterfaceID,
                viewClass: undefined,
                getPriority: expect.any(Function),
            });
            const instance = Object.create(OurImplementation.prototype);
            expect(instance.somethings).not.toBeFalsy();
            expect(instance.setState).not.toBeFalsy();
        });
        it("Should be able to be used to extend any module class", () => {
            // Creating a new module
            class OurImplementation extends moduleClassCreator_1.createModule(config) {
                somethings(inp) { }
                somethingsElse(inp) {
                    return 3;
                }
            }
            // Creating a module that extends OurImplementation
            class ExtendsOurImplementation extends moduleClassCreator_1.createModule(config2, OurImplementation) {
                stuff() {
                    // this.somethings(); // errors since it requires an input
                    this.somethings({});
                    this.setState({ category: { val: 3 } });
                    const o = this.state.val; // Still has the original state
                    const p = this.state.category.val; // Also has the new state
                    this.setState({ val: 3, category: { val: 2 } }); // Can change the new and old parts of the state
                    this.settingsObject.changeData({ category: { val: 3 } });
                    this.settingsObject.changeData({ category: { val: true } });
                    // this.setState({category: {v: 3}}); // errors, since category has no v
                    // this.setState({something: "test"}); // errors, since something should be of type number
                }
                somethingsElse() {
                    return 8;
                }
            }
            expect(ExtendsOurImplementation.getConfig()).toEqual({
                initialState: {
                    val: "hello",
                    category: {
                        val: 7,
                    },
                    isStopping: false,
                    isStopped: false,
                },
                settings: {
                    val: { default: 3, type: "number" },
                    category: {
                        val: { default: true, type: "number" },
                    },
                },
                onInstall: expect.any(Function),
                abstract: undefined,
                type: dummyModules_helper_1.dummyInterfaceID,
                viewClass: undefined,
                getPriority: expect.any(Function),
            });
            const instance = Object.create(ExtendsOurImplementation.prototype);
            expect(instance.stuff).not.toBeFalsy();
            expect(instance.somethings).not.toBeFalsy();
            expect(instance.setState).not.toBeFalsy();
        });
    });
});
//# sourceMappingURL=moduleClassCreator.js.map