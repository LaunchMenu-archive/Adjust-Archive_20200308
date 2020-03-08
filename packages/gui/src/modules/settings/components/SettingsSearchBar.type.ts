import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";

export type SettingsSearchBar = ChildModule<{}>;
export type SettingsSearchBarParent = ParentModule<{
    /**
     * Informs the parent about the new search value
     * @param search The current search value
     */
    updateSearch(search: string): Promise<void>;
}>;
export type SettingsSearchBarContract = {
    parent: SettingsSearchBarParent;
    child: SettingsSearchBar;
};

export const SettingsSearchBarType = Registry.createContractID<SettingsSearchBarContract>(
    __filename
);
