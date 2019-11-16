import { ModuleReference, AsyncMutualExcluder } from "@adjust/core";
import { DragEvent as ReactDragEvent } from "react";
import { ModuleLocation } from "../../../../../module/_types/ModuleLocation";
import LocationAncestorModule from "../../locationAncestor";
import { LocationPath } from "../../../_types/LocationPath";
import { LocationAncestor } from "../../locationAncestor.type";
import { OpenedTab, Tab } from "./_types/TabData";
import { TabHandleParent } from "./tabHandle/tabHandle.type";
import { TabHandleData } from "./_types/TabHandleData";
export declare const tabManagerConfig: {
    state: {
        tabs: OpenedTab[];
        selectedTabID: string;
        tabsVisible: boolean;
    };
    settings: {
        tabs: {
            default: Tab[];
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
        };
        handles: {
            scrollSpeed: {
                default: number;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            };
            wheelScrollSpeed: {
                default: number;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            };
        };
    };
    getPriority: () => number;
    type: import("@adjust/core/types").ContractID<import("../../locationAncestor.type").LocationAncestorContract>;
};
declare const TabManagerModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        tabs: OpenedTab[];
        selectedTabID: string;
        tabsVisible: boolean;
    };
    settings: {
        tabs: {
            default: Tab[];
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
        };
        handles: {
            scrollSpeed: {
                default: number;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            };
            wheelScrollSpeed: {
                default: number;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
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
 * - index: number (The exact index that the tab should have in the list)
 * - before: String (The ID of the tab or location that this tab should be in front of)
 * - after: String (The ID of the tab or location that this tab should be behind, can't be used with before)
 * - handleData: object (Any additional data that the tab handle wants to represent the tab)
 */
/**
 * The tabs manager, responsible for keeping track and opening tabs
 */
export declare class TabManagerModule extends TabManagerModule_base implements LocationAncestor, TabHandleParent {
    protected ancestorName: string;
    protected excluder: AsyncMutualExcluder;
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
     * @param create Whether or not to create the tab if not existent, and requested to be open
     * @param visible Whether or not the tab should be visibly opened, may be null to leave unaltered
     * @param tabHandleData The data to represent the tab
     * @param index The index to add the tab at
     * @returns The tab information
     */
    protected getTab(ID: string, open?: boolean, create?: boolean, visible?: boolean, tabHandleData?: TabHandleData, index?: number): Promise<OpenedTab>;
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
    /** @override */
    onDragStart(ID: string, handleData: TabHandleData): Promise<void>;
    /** @override */
    onDragEnd(ID: string): Promise<void>;
    /**
     * Updates data to open in a new tab of this manager
     */
    onDrop(): Promise<void>;
}
export default TabManagerModule;
declare const TabManagerView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof TabManagerModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class TabManagerView extends TabManagerView_base {
    /**
     * Checks whether this is valid data for a drop
     * @param event The DOM event of the user dragging data
     */
    protected onDragOver(event: ReactDragEvent): void;
    /**
     * Updates the locations when draging a location finishes
     * @param event The DOM event of the user dragging data
     */
    protected onDrop(event: ReactDragEvent): void;
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
