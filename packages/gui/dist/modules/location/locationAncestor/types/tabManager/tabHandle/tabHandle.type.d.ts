import { ChildModule, ParentModule } from "@adjust/core/types";
/**
 * The TabsHandle type, to represent the tab in the tabsManager.
 */
export declare type TabHandle = ChildModule<{
    /**
     * Updates the name of the tab
     * @param name The name that the tab now has
     */
    setName(name: string): Promise<void>;
    /**
     * Updates whether or not this tab is selected
     * @param selected Whether or not it's selected
     */
    setSelected(selected: boolean): Promise<void>;
    /**
     * Gets rid of all associated saved data of the tab
     */
    remove(): Promise<void>;
}>;
export declare type TabHandleParent = ParentModule<{
    /**
     * Updates the name of the tab
     * @param name The name that the tab wants to have
     * @param tabID The ID of the tab whose name to change
     */
    changeTabName(name: string, tabID: string): Promise<void>;
    /**
     * Selects the tab
     * @param tabID The ID of the tab to select
     */
    selectTab(tabID: string): Promise<void>;
}>;
export declare type TabHandleContract = {
    parent: TabHandleParent;
    child: TabHandle;
    data: {
        ID: string;
        path: string[];
    };
};
export declare const TabHandleType: import("@adjust/core/types").ContractID<TabHandleContract>;
