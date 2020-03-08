import { SettingInputContract } from "./_types/SettingInput";
/**
 * The contract for string setting inputs
 */
export declare type SettingStringContract = SettingInputContract<string, undefined>;
export declare type SettingString = SettingStringContract["child"];
export declare type SettingStringParent = SettingStringContract["parent"];
/**
 * A type for simple numeric setting inputs
 */
export declare const SettingStringType: import("../../../registry/_types/contractID").ContractID<SettingInputContract<string, undefined>>;
