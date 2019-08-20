/// <reference types="react" />
import { ModuleReference } from "@adjust/core";
import { ModuleLocation } from "../../../../../module/_types/ModuleLocation";
import LocationAncestorModule from "../../locationAncestor";
import { LocationPath } from "../../../_types/LocationPath";
import { LocationAncestor } from "../../locationAncestor.type";
import { OpenedTab, Tab } from "./_types/TabData";
import { TabHandleParent } from "./tabHandle/tabHandle.type";
export declare const tabManagerConfig: {
    initialState: {
        tabs: OpenedTab[];
        selectedTabID: string;
        tabsVisible: boolean;
        removed: boolean;
    };
    settings: {
        tabs: {
            default: Tab[];
            type: string;
        };
        handles: {
            scrollSpeed: {
                default: number;
                type: string;
            };
            wheelScrollSpeed: {
                default: number;
                type: string;
            };
        };
    };
    getPriority: () => number;
    type: import("@adjust/core/types").ContractID<import("../../locationAncestor.type").LocationAncestorContract>;
};
declare const TabManagerModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        tabs: OpenedTab[];
        selectedTabID: string;
        tabsVisible: boolean;
        removed: boolean;
    };
    settings: {
        tabs: {
            default: Tab[];
            type: string;
        };
        handles: {
            scrollSpeed: {
                default: number;
                type: string;
            };
            wheelScrollSpeed: {
                default: number;
                type: string;
            };
        };
    };
    getPriority: () => number;
    type: import("@adjust/core/types").ContractID<import("../../locationAncestor.type").LocationAncestorContract>;
}, typeof LocationAncestorModule>;
/**
 * type "tab" Accepts one of location hints:
 * - ID: String (The ID of the tab to open in)
 * - sameAs: String (The ID of a location in the same tab)
 * - new: String (Whether a new tab should be created)
 *
 * And if 'new' is set:
 * - name: String (The name that any newly created tab should have)
 * - before: String (The ID of the tab or location that this tab should be in front of)
 * - after: String (The ID of the tab or location that this tab should be behind, can't be used with before)
 */
/**
 * The tabs manager, responsible for keeping track and opening tabs
 */
export declare class TabManagerModule extends TabManagerModule_base implements LocationAncestor, TabHandleParent {
    protected ancestorName: string;
    /**
     * Retrieves the index of the tab if present
     * @param ID The ID of the tab whose index to retrieve
     * @param opened Whether to get the index from the opened tabs or all tabs
     * @returns The index of te tab
     */
    protected getTabIndex(ID: string, opened?: boolean): number;
    /**
     * Retrieves the data available for a tab, or creates it if absent and open is true
     * @param ID THe ID of the tab to obtain
     * @param open Whether or not to open the tab if not present
     * @param name The name of the tab to add
     * @param index The index to add the tab at
     * @returns The tab information
     */
    protected getTab(ID: string, open?: boolean, name?: string, index?: number): Promise<OpenedTab>;
    /**
     * Closes a tab with the given ID
     * @param ID The ID of the tab to close
     */
    protected closeTab(ID: string): Promise<void>;
    /**
     * Removes the tab with the given ID
     * @param ID The ID of the tab to remove
     * @returns A promise that resolves when all settings listeners have resolved
     */
    protected removeTab(ID: string): Promise<void>;
    /** @override */
    changeTabName(name: string, tabID: string): Promise<void>;
    /** @override */
    selectTab(tabID: string): Promise<void>;
    /**
     * Sets whether the tabs handles are visible and the selected tab ID based on the opened tabs
     */
    protected updateTabs(): Promise<void>;
    /** @override */
    createLocation(location: ModuleLocation): Promise<LocationPath>;
    /** @override */
    removeLocation(locationPath: LocationPath): Promise<boolean>;
    /** @override */
    removeAncestor(): Promise<void>;
    /** @override */
    openModule(module: ModuleReference, locationPath: LocationPath): Promise<LocationPath>;
    /** @override */
    closeModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
    /** @override */
    showModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
    /** @override */
    setDropMode(drop: boolean): Promise<void>;
    /** @override */
    setEditMode(edit: boolean): Promise<void>;
}
export default TabManagerModule;
declare const TabManagerView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof TabManagerModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig<any>, import("@adjust/core/types").ModuleContract>, {}>>>;
export declare class TabManagerView extends TabManagerView_base {
    /**
     * Render the tab handles
     */
    protected renderHandles(): JSX.Element;
    /**
     * Renders what the tab should look like if empty
     */
    protected renderEmpty(): JSX.Element;
    /** @override */
    renderView(): JSX.Element;
}
