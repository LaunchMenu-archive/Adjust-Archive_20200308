import { SettingsConfig } from "../../storage/settings/_types/settingsConfig";
import { ModuleContract, ChildModule } from "../_types/moduleContract";
import { Module } from "../module";
export declare type dummyInterface = {
    test: (text: string) => Promise<string>;
};
export declare const dummyInterfaceID: import("../../registry/_types/contractID").ContractID<{
    parent: {};
    child: ChildModule<dummyInterface>;
}>;
declare const DummyModule_base: import("../_types/extendedModule").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("../../registry/_types/contractID").ContractID<{
        parent: {};
        child: ChildModule<dummyInterface>;
    }>;
}, import("../../utils/_types/standardTypes").ExtendsClass<typeof Module, Module<{
    isStopping: boolean;
    isStopped: boolean;
}, SettingsConfig<import("../../utils/_types/standardTypes").Empty>, ModuleContract>>>;
export declare class DummyModule extends DummyModule_base implements dummyInterface {
    test(text: string): Promise<string>;
}
export default DummyModule;
export declare type dummyInterface2 = {
    test2: (test: string) => Promise<void>;
};
export declare const dummyInterfaceID2: import("../../registry/_types/contractID").ContractID<{
    parent: {
        someMethod: () => Promise<void>;
    };
    child: ChildModule<dummyInterface2>;
    data: {
        shit: string;
    };
}>;
declare const DummyModule2_base: import("../_types/extendedModule").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("../../registry/_types/contractID").ContractID<{
        parent: {
            someMethod: () => Promise<void>;
        };
        child: ChildModule<dummyInterface2>;
        data: {
            shit: string;
        };
    }>;
}, import("../../utils/_types/standardTypes").ExtendsClass<typeof Module, Module<{
    isStopping: boolean;
    isStopped: boolean;
}, SettingsConfig<import("../../utils/_types/standardTypes").Empty>, ModuleContract>>>;
export declare class DummyModule2 extends DummyModule2_base implements dummyInterface2 {
    test2(text: string): Promise<void>;
}
export declare type dummyInterface3 = {
    test2: (test: string) => Promise<void>;
};
export declare const dummyInterfaceID3: import("../../registry/_types/contractID").ContractID<{
    parent: {};
    child: ChildModule<dummyInterface3>;
}>;
declare const DummyModule4_base: import("../_types/extendedModule").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("../../registry/_types/contractID").ContractID<{
        parent: {};
        child: ChildModule<dummyInterface>;
    }>;
}, import("../../utils/_types/standardTypes").ExtendsClass<typeof Module, Module<{
    isStopping: boolean;
    isStopped: boolean;
}, SettingsConfig<import("../../utils/_types/standardTypes").Empty>, ModuleContract>>>;
export declare class DummyModule4 extends DummyModule4_base implements dummyInterface {
    test(text: string): Promise<string>;
    static something(): boolean;
}
