import {SettingInputContract} from "./_types/SettingInput";
import {Registry} from "../../../registry/registry";

/**
 * The contract for Boolean setting inputs
 */
export type SettingBooleanContract = SettingInputContract<boolean, undefined>;
export type SettingBoolean = SettingBooleanContract["child"];
export type SettingBooleanParent = SettingBooleanContract["parent"];

/**
 * A type for simple numeric setting inputs
 */
export const SettingBooleanType = Registry.createContractID<SettingBooleanContract>(
    __filename,
    {
        name: "boolean",
        section: "settings.input",
    }
);
