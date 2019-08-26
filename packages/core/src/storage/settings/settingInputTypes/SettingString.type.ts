import {SettingInputContract} from "./_types/SettingInput";
import {Registry} from "../../../registry/registry";

/**
 * The contract for string setting inputs
 */
export type SettingStringContract = SettingInputContract<string, undefined>;
export type SettingString = SettingStringContract["child"];
export type SettingStringParent = SettingStringContract["parent"];

/**
 * A type for simple numeric setting inputs
 */
export const SettingStringType = Registry.createContractID<SettingStringContract>(
    __filename
);
