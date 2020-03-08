import { SettingInputContract } from "./_types/SettingInput";
import { Json } from "../../../utils/_types/standardTypes";
/**
 * The contract for Json setting inputs
 */
export declare type SettingJsonContract = SettingInputContract<Json, undefined>;
export declare type SettingJson = SettingJsonContract["child"];
export declare type SettingJsonParent = SettingJsonContract["parent"];
/**
 * A type for simple numeric setting inputs
 */
export declare const SettingJsonType: import("../../../registry/_types/contractID").ContractID<SettingInputContract<Json, undefined>>;
