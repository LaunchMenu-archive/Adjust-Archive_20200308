import {Registry} from "@adjust/gui";
import {ChildModule, ParentModule} from "@adjust/gui/types";

export type Test = ChildModule<{
    doSomething(stuff: string): Promise<string>;
}>;
export type TestParent = ParentModule<{}>;
export type TestContract = {
    parent: TestParent;
    child: Test;
};

// Export the type
export const TestType = Registry.createContractID<TestContract>(__filename);
