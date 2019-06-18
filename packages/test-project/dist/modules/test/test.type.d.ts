import { PublicModuleMethods } from "@adjust/gui/types";
export declare type Test = {
    doSomething(stuff: string): Promise<string>;
} & PublicModuleMethods;
export declare type TestParent = {};
export declare type TestContract = {
    parent: TestParent;
    child: Test;
};
export declare const TestID: import("@adjust/gui/types").InterfaceID<TestContract>;
