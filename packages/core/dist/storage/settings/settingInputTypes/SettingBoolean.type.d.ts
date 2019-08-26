import { SettingInputContract } from "./_types/SettingInput";
/**
 * The contract for Boolean setting inputs
 */
export declare type SettingBooleanContract = SettingInputContract<boolean, undefined>;
export declare type SettingBoolean = SettingBooleanContract["child"];
export declare type SettingBooleanParent = SettingBooleanContract["parent"];
/**
 * A type for simple numeric setting inputs
 */
export declare const SettingBooleanType: import("../../../registry/_types/contractID").ContractID<SettingInputContract<boolean, undefined>>;
