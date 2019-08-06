import { PublicModuleMethods } from "../_types/publicModuleMethods";
import { ModuleState } from "../_types/moduleState";
import { SettingsConfig } from "../../storage/settings/_types/settingsConfig";
import { ModuleInterface } from "../_types/moduleInterface";
import { ModuleRequestData } from "../_types/moduleRequestData";
import { ModuleID } from "../moduleID";
import { Module } from "../module";
export declare type dummyInterface = {
    test: (text: string) => Promise<string>;
};
export declare const dummyInterfaceID: import("../../registry/_types/interfaceID").InterfaceID<{
    parent: {};
    child: dummyInterface & PublicModuleMethods;
}>;
declare const DummyModule_base: import("../_types/extendedModule").ExtendedModuleClass<{
    initialState: {};
    settings: {};
    type: import("../../registry/_types/interfaceID").InterfaceID<{
        parent: {};
        child: dummyInterface & PublicModuleMethods;
    }>;
}, import("../../utils/_types/standardTypes").ExtendsClass<typeof Module, Module<{
    isStopping: boolean;
    isStopped: boolean;
}, SettingsConfig<{}>, ModuleInterface>>>;
export declare class DummyModule extends DummyModule_base implements dummyInterface {
    static customConstruct<S extends ModuleState, C extends SettingsConfig, I extends ModuleInterface>(request: ModuleRequestData<I>, moduleID: ModuleID, initialState: S, parents: I["parent"][]): Promise<Module<S, C, I>>;
    test(text: string): Promise<string>;
}
export default DummyModule;
export declare type dummyInterface2 = {
    test2: (test: string) => Promise<void>;
};
export declare const dummyInterfaceID2: import("../../registry/_types/interfaceID").InterfaceID<{
    parent: {
        someMethod: () => Promise<void>;
    };
    child: dummyInterface2 & PublicModuleMethods;
    data: {
        shit: string;
    };
}>;
declare const DummyModule2_base: import("../_types/extendedModule").ExtendedModuleClass<{
    initialState: {};
    settings: {};
    type: import("../../registry/_types/interfaceID").InterfaceID<{
        parent: {
            someMethod: () => Promise<void>;
        };
        child: dummyInterface2 & PublicModuleMethods;
        data: {
            shit: string;
        };
    }>;
}, import("../../utils/_types/standardTypes").ExtendsClass<typeof Module, Module<{
    isStopping: boolean;
    isStopped: boolean;
}, SettingsConfig<{}>, ModuleInterface>>>;
export declare class DummyModule2 extends DummyModule2_base implements dummyInterface2 {
    test2(text: string): Promise<void>;
}
export declare type dummyInterface3 = {
    test2: (test: string) => Promise<void>;
};
export declare const dummyInterfaceID3: import("../../registry/_types/interfaceID").InterfaceID<{
    parent: {};
    child: dummyInterface3 & PublicModuleMethods;
}>;
declare const DummyModule4_base: import("../_types/extendedModule").ExtendedModuleClass<{
    initialState: {};
    settings: {};
    type: import("../../registry/_types/interfaceID").InterfaceID<{
        parent: {};
        child: dummyInterface & PublicModuleMethods;
    }>;
}, import("../../utils/_types/standardTypes").ExtendsClass<typeof Module, Module<{
    isStopping: boolean;
    isStopped: boolean;
}, SettingsConfig<{}>, ModuleInterface>>>;
export declare class DummyModule4 extends DummyModule4_base implements dummyInterface {
    test(text: string): Promise<string>;
    static something(): boolean;
}
