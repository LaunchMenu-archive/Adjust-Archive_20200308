import {Registry} from "@adjust/gui";
import {PublicModuleMethods} from "@adjust/gui/types";

export type Test = {
    doSomething(stuff: string): Promise<string>;
} & PublicModuleMethods;
export type TestParent = {};
export type TestContract = {
    parent: TestParent;
    child: Test;
};

// Export the interfaceID type
export const TestID = Registry.createInterfaceID<TestContract>(__filename);
