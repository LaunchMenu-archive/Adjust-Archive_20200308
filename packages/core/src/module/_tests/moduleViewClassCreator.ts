import {dummyInterfaceID, dummyInterfaceID2} from "./dummyModules.helper";
import {createModule} from "../moduleClassCreator";
import {createModuleView} from "../moduleViewClassCreator";
import {SettingNumberType} from "../../storage/settings/settingInputTypes/SettingNumber.type";

// A config for our module
const config = {
    state: {
        val: "hello" as string | number,
    },
    settings: {
        val: {default: 3, type: SettingNumberType},
    },
    type: dummyInterfaceID2,
};

// Note that a lot of these 'test' are typescript tests to check how intellisense deals with stuff, not runtime tests
describe("ModuleViewClassCreator", () => {
    // Creating a new module
    class SomeModule extends createModule(config) {
        someMethod(): void {}
    }
    class ExtendsSomeModule extends createModule(config, SomeModule) {
        someOtherMethod(): void {}
    }

    describe("CreateModuleView", () => {
        it("Should be able to be used to extend the default moduleView class", () => {
            class SomeModuleView extends createModuleView(SomeModule) {
                doSomething() {
                    /* Has the correct method on its module */
                    this.module.someMethod();
                    // this.module.somethingElse(); // Errors since method doesn't exist

                    /* Has correct data in it's state*/
                    this.state.val;
                    this.settings.val;
                    // this.state.shit; // Errors since value doesn't exist

                    /* May not change original state */
                    // this.changeState({val: 3});
                }
                protected renderView(): JSX.Element {
                    throw new Error("Method not implemented.");
                }
            }
            class SomeModuleView2 extends createModuleView(SomeModule, {stuff: 3}) {
                doSomething() {
                    /* Also has augmented state */
                    this.state.stuff;

                    /* May only change aditional state */
                    this.setState({stuff: 3});

                    /* Can use settings from state (intellisense doesn't work because of contravariances...) */
                    this.setState((state: any) => ({stuff: state["~settings"].val}));
                }
                componentDidCatch = () => {};
                protected renderView(): JSX.Element {
                    throw new Error("Method not implemented.");
                }

                protected renderLoader(): JSX.Element {
                    super.renderLoader();
                    return void 0;
                }
            }

            expect(SomeModuleView.state).toEqual({});
            expect(SomeModuleView2.state).toEqual({stuff: 3});
        });
        it("Should be able to be used to extend any moduleView class", () => {
            class SomeModuleView extends createModuleView(SomeModule, {stuff: 3}) {
                doSomething(): string {
                    this.data.shit;
                    // this.data.crap; // Errors since crap doesn't exist on request data
                    return "test";
                }
                doSomethingElse() {}
                protected renderView(): JSX.Element {
                    throw new Error("Method not implemented.");
                }
            }
            class ExtendsSomeModuleView extends createModuleView(
                ExtendsSomeModule,
                {something: "test"},
                SomeModuleView
            ) {
                doSomething() {
                    super.doSomething();

                    /* Should be able to call methods */
                    this.doSomethingElse();
                    this.module.someMethod();
                    this.module.someOtherMethod();

                    /* Also has augmented state */
                    this.state.stuff;

                    /* May only change aditional state */
                    this.setState({something: "te", stuff: 2});
                    this.setState(state => ({something: "te", stuff: 9}));

                    /* Can't make up stuff */
                    // this.changeState({something: "te", crap: 2}); // Errors since crap doesn't exist
                    return "3";
                }
            }

            expect(ExtendsSomeModuleView.state).toEqual({
                stuff: 3,
                something: "test",
            });
        });
    });
});
