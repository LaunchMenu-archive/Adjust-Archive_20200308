import { ChildModule } from "../../../module/_types/moduleContract";
import DummyModule from "../../../module/_tests/dummyModules.helper";
export declare type dummyInterface = {
    test: (text: string) => Promise<string>;
};
export declare const dummyInterfaceID: import("../../../registry/_types/contractID").ContractID<{
    parent: {};
    child: ChildModule<dummyInterface>;
}>;
declare const Target_base: import("../../../module/_types/extendedModule").ExtendedModuleClass<{
    state: {};
    settings: {
        a: {
            default: number;
            type: import("../../../registry/_types/contractID").ContractID<import("../settingInputTypes/_types/SettingInput").SettingInputContract<number, {
                min?: number;
                max?: number;
                rounding?: number;
            }>>;
        };
        b: {
            c: {
                default: boolean;
                type: import("../../../registry/_types/contractID").ContractID<import("../settingInputTypes/_types/SettingInput").SettingInputContract<boolean, undefined>>;
            };
        };
        d: {
            default: {};
            type: import("../../../registry/_types/contractID").ContractID<import("../settingInputTypes/_types/SettingInput").SettingInputContract<import("../../../utils/_types/standardTypes").Json, undefined>>;
        };
    };
    type: import("../../../registry/_types/contractID").ContractID<{
        parent: {};
        child: ChildModule<dummyInterface>;
    }>;
}, typeof DummyModule>;
export declare class Target extends Target_base implements dummyInterface {
    static createCustomInstance(identifier: number): Promise<Target>;
    test(text: string): Promise<string>;
}
export {};
