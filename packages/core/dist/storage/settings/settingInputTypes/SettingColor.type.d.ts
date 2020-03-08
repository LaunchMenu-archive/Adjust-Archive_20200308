import { SettingInputContract } from "./_types/SettingInput";
/**
 * The contract for color setting inputs
 */
export declare type SettingColorContract = SettingInputContract<string, undefined>;
export declare type SettingColor = SettingColorContract["child"];
export declare type SettingColorParent = SettingColorContract["parent"];
/**
 * A type for simple numeric setting inputs
 */
export declare const SettingColorType: import("../../../registry/_types/contractID").ContractID<SettingInputContract<string, undefined>>;
