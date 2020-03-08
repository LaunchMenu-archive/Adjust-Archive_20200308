/// <reference types="react" />
import { SettingsSearchBar } from "./SettingsSearchBar.type";
declare const SettingsSearchBarModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        search: string;
    };
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsSearchBar.type").SettingsSearchBarContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../..").Module, import("../../..").Module>>;
export declare class SettingsSearchBarModule extends SettingsSearchBarModule_base implements SettingsSearchBar {
    /**
     * Updates the current search value, and informs the parent after some debounce delay
     * @param search The new search value
     */
    setSearch(search: string): void;
    /**
     * Sends the new search value to the parent
     */
    updateSearch(): void;
}
export default SettingsSearchBarModule;
declare const SettingsSearchBarView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsSearchBarModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../..").ModuleView, import("../../..").ModuleView<{}, {}, import("../../..").Module, {}>>>;
export declare class SettingsSearchBarView extends SettingsSearchBarView_base {
    renderView(): JSX.Element;
}
