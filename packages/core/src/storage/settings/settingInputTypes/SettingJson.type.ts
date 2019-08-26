import {SettingInputContract} from "./_types/SettingInput";
import {Registry} from "../../../registry/registry";
import {Json} from "../../../utils/_types/standardTypes";

/**
 * The contract for Json setting inputs
 */
export type SettingJsonContract = SettingInputContract<Json, undefined>;
export type SettingJson = SettingJsonContract["child"];
export type SettingJsonParent = SettingJsonContract["parent"];

/**
 * A type for simple numeric setting inputs
 */
export const SettingJsonType = Registry.createContractID<SettingJsonContract>(__filename);
