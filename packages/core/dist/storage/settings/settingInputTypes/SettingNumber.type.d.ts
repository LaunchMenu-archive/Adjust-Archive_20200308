import { SettingInputContract } from "./_types/SettingInput";
/**
 * The contract for number setting inputs
 */
export declare type SettingNumberContract = SettingInputContract<number, {
    min?: number;
    max?: number;
    rounding?: number;
}>;
export declare type SettingNumber = SettingNumberContract["child"];
export declare type SettingNumberParent = SettingNumberContract["parent"];
/**
 * A type for simple numeric setting inputs
 */
export declare const SettingNumberType: import("../../../registry/_types/contractID").ContractID<SettingInputContract<number, {
    min?: number;
    max?: number;
    rounding?: number;
}>>;
