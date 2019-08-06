import { PublicModuleMethods } from "../../module/_types/publicModuleMethods";
export declare type dummyInterface = {
    test: () => Promise<number>;
} & PublicModuleMethods;
export declare type dummyParentInterface = {
    something: () => Promise<void>;
};
export declare const dummyInterfaceID: import("../_types/interfaceID").InterfaceID<{
    parent: dummyParentInterface;
    child: dummyInterface;
}>;
declare const DummyModule_base: import("../../module/_types/extendedModule").ExtendedModuleClass<{
    initialState: {};
    settings: {};
    type: import("../_types/interfaceID").InterfaceID<{
        parent: dummyParentInterface;
        child: dummyInterface;
    }>;
}, import("../../utils/_types/standardTypes").ExtendsClass<typeof import("../../module/module").Module, import("../../module/module").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, import("../../storage/settings/_types/settingsConfig").SettingsConfig<{}>, import("../../module/_types/moduleInterface").ModuleInterface>>>;
export declare class DummyModule extends DummyModule_base implements dummyInterface {
    protected instanceVal: number;
    test(): Promise<number>;
}
export {};
