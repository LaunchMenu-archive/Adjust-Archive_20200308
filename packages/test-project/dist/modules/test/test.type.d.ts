import { ChildModule, ParentModule } from "@adjust/gui/types";
export declare type Test = ChildModule<{
    doSomething(stuff: string): Promise<string>;
}>;
export declare type TestParent = ParentModule<{}>;
export declare type TestContract = {
    parent: TestParent;
    child: Test;
};
export declare const TestType: import("@adjust/gui/types").ContractID<TestContract>;
