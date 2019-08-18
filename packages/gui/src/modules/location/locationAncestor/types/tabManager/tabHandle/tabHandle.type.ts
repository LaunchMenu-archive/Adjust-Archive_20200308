import {Registry} from "../../../../../../registry/registry";
import {ChildModule, ParentModule} from "@adjust/core/types";

/**
 * The TabsHandle type, to represent the tab in the tabsManager.
 */
export type TabHandle = ChildModule<{
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
export type TabHandleParent = ParentModule<{
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
export type TabHandleContract = {
    parent: TabHandleParent;
    child: TabHandle;
    data: {
        ID: string; // The ID of this tab itself
        path: string[]; // The IDs of locationAncestor along the way to the location, including ID of location ancestor itself
    };
};

export const TabHandleType = Registry.createContractID<TabHandleContract>(__filename);
