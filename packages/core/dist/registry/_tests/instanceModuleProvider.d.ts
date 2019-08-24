import { ChildModule } from "../../module/_types/moduleContract";
export declare type dummyInterface = ChildModule<{
    test: () => Promise<number>;
}>;
export declare type dummyParentInterface = {
    something: () => Promise<void>;
};
export declare const dummyInterfaceID: import("../_types/contractID").ContractID<{
    parent: dummyParentInterface;
    child: ChildModule<{
        test: () => Promise<number>;
    }>;
}>;
declare const DummyModule_base: import("../../module/_types/extendedModule").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("../_types/contractID").ContractID<{
        parent: dummyParentInterface;
        child: ChildModule<{
            test: () => Promise<number>;
        }>;
    }>;
}, import("../../utils/_types/standardTypes").ExtendsClass<typeof import("../../module/module").Module, import("../../module/module").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, import("../../storage/settings/_types/settingsConfig").SettingsConfig<import("../../utils/_types/standardTypes").Empty>, import("../../module/_types/moduleContract").ModuleContract>>>;
export declare class DummyModule extends DummyModule_base implements dummyInterface {
    protected instanceVal: number;
    test(): Promise<number>;
}
export {};
