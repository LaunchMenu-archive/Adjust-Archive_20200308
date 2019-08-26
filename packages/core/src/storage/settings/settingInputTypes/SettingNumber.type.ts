import {SettingInputContract} from "./_types/SettingInput";
import {Registry} from "../../../registry/registry";

/**
 * The contract for number setting inputs
 */
export type SettingNumberContract = SettingInputContract<
    number,
    {min?: number; max?: number; rounding?: number}
>;
export type SettingNumber = SettingNumberContract["child"];
export type SettingNumberParent = SettingNumberContract["parent"];

/**
 * A type for simple numeric setting inputs
 */
export const SettingNumberType = Registry.createContractID<SettingNumberContract>(
    __filename
);
