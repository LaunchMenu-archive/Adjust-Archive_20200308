import { ChildModule, ParentModule } from "@adjust/core/types";
export declare type SettingsSearchBar = ChildModule<{}>;
export declare type SettingsSearchBarParent = ParentModule<{
    /**
     * Informs the parent about the new search value
     * @param search The current search value
     */
    updateSearch(search: string): Promise<void>;
}>;
export declare type SettingsSearchBarContract = {
    parent: SettingsSearchBarParent;
    child: SettingsSearchBar;
};
export declare const SettingsSearchBarType: import("@adjust/core/types").ContractID<SettingsSearchBarContract>;
