/// <reference types="react" />
import { Test } from "./test.type";
export declare const config: {
    initialState: {
        stuff: string;
        children: import("@adjust/core/types").ChildModule<{
            setText(text: string): Promise<void>;
        }>[];
        somethingAsync: Promise<number>;
        smth: number;
    };
    settings: {
        stuff: {
            default: boolean;
            type: string;
        };
    };
    defineLocation: {
        ID: string;
        hints: {
            window: {
                sameAs: string;
            };
            tab: {
                after: string;
                ID: string;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./test.type").TestContract>;
};
declare const TestModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        stuff: string;
        children: import("@adjust/core/types").ChildModule<{
            setText(text: string): Promise<void>;
        }>[];
        somethingAsync: Promise<number>;
        smth: number;
    };
    settings: {
        stuff: {
            default: boolean;
            type: string;
        };
    };
    defineLocation: {
        ID: string;
        hints: {
            window: {
                sameAs: string;
            };
            tab: {
                after: string;
                ID: string;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./test.type").TestContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").Module, import("@adjust/gui").Module>>;
export default class TestModule extends TestModule_base implements Test {
    intervalID: number;
    /** @override */
    onInit(): Promise<void>;
    onStop(): Promise<void>;
    /** @override */
    testSomething(): Promise<number>;
    /** @override */
    doSomething(stuff: string): Promise<string>;
    changeChildText(): void;
    closeChild(): void;
    setStuff(): void;
}
declare const TestView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof TestModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").ModuleView, import("@adjust/gui").ModuleView<{}, {}, import("@adjust/gui").Module, {}>>>;
export declare class TestView extends TestView_base {
    protected renderView(): JSX.Element;
}
export {};
