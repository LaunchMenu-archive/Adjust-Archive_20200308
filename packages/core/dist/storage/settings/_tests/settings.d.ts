import { PublicModuleMethods } from "../../../module/_types/publicModuleMethods";
import { Module } from "../../../module/module";
export declare type dummyInterface = {
    test: (text: string) => Promise<string>;
};
export declare const dummyInterfaceID: import("../../../registry/_types/interfaceID").InterfaceID<{
    parent: {};
    child: dummyInterface & PublicModuleMethods;
}>;
declare const Target_base: import("../../../module/_types/extendedModule").ExtendedModuleClass<{
    initialState: {};
    settings: {
        a: {
            default: number;
            type: string;
        };
        b: {
            c: {
                default: boolean;
                type: string;
            };
        };
        d: {
            default: {};
            type: string;
        };
    };
    type: import("../../../registry/_types/interfaceID").InterfaceID<{
        parent: {};
        child: dummyInterface & PublicModuleMethods;
    }>;
}, import("../../../utils/_types/standardTypes").ExtendsClass<typeof Module, Module<{
    isStopping: boolean;
    isStopped: boolean;
}, {}, import("../../../module/_types/moduleInterface").ModuleInterface>>>;
export declare class Target extends Target_base implements dummyInterface {
    static createCustomInstance(identifier: number): Promise<Target>;
    test(text: string): Promise<string>;
}
export {};
