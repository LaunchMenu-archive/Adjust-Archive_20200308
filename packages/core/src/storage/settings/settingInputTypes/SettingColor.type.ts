import {SettingInputContract} from "./_types/SettingInput";
import {Registry} from "../../../registry/registry";

/**
 * The contract for color setting inputs
 */
export type SettingColorContract = SettingInputContract<string, undefined>;
export type SettingColor = SettingColorContract["child"];
export type SettingColorParent = SettingColorContract["parent"];

/**
 * A type for simple numeric setting inputs
 */
export const SettingColorType = Registry.createContractID<SettingColorContract>(
    __filename
);
