import { Module } from "../../../module/module";
import { ChildModule } from "../../../module/_types/moduleContract";
export declare type dummyInterface = {
    test: (text: string) => Promise<string>;
};
export declare const dummyInterfaceID: import("../../../registry/_types/contractID").ContractID<{
    parent: {};
    child: ChildModule<dummyInterface>;
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
    type: import("../../../registry/_types/contractID").ContractID<{
        parent: {};
        child: ChildModule<dummyInterface>;
    }>;
}, import("../../../utils/_types/standardTypes").ExtendsClass<typeof Module, Module<{
    isStopping: boolean;
    isStopped: boolean;
}, import("../_types/settingsConfig").SettingsConfig<import("../../../utils/_types/standardTypes").Empty>, import("../../../module/_types/moduleContract").ModuleContract>>>;
export declare class Target extends Target_base implements dummyInterface {
    static createCustomInstance(identifier: number): Promise<Target>;
    test(text: string): Promise<string>;
}
export {};
