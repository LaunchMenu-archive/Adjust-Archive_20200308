import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";
import {ISettingsIndex} from "../../_types/ISettingsIndex";

export type SettingsIndex = ChildModule<{
    /**
     * Sets the index data
     * @param index The index data to set
     */
    setData(index: ISettingsIndex): Promise<void>;

    /**
     * Sets the search term to filter on
     * @param search The search term
     */
    setSearch(search: RegExp | string): Promise<void>;
}>;
export type SettingsIndexParent = ParentModule<{
    /**
     * Selects a module with the given path
     * @param path The path of the module to select
     */
    selectModule(path: string): Promise<void>;

    /**
     * Selects a contract type with the given path
     * @param path The path of the contract type to select
     */
    selectType(path: string): Promise<void>;
}>;
export type SettingsIndexContract = {
    parent: SettingsIndexParent;
    child: SettingsIndex;
};

export const SettingsIndexType = Registry.createContractID<SettingsIndexContract>(
    __filename
);
