import { DummyModule as DM } from "../../module/_tests/dummyModules.helper";
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
}, typeof DM>;
export declare class DummyModule extends DummyModule_base implements dummyInterface {
    protected instanceVal: number;
    test(): Promise<number>;
}
export {};
