import { ChildModule, ParentModule } from "@adjust/core/types";
import { TabHandleData } from "../_types/TabHandleData";
/**
 * The TabsHandle type, to represent the tab in the tabsManager.
 */
export declare type TabHandle = ChildModule<{
    /**
     * Set the initial data to represent the tab
     * @param data The data to represent the tab
     */
    setInitialData(data: TabHandleData): Promise<void>;
    /**
     * Sets whether or not the user is currently able to change the locations and their ancestors
     * @param edit Whether or not editing will be enabled
     */
    setEditMode(edit: boolean): Promise<void>;
    /**
     * Sets whether or not drop indicators should be shown on the ancestor
     * @param drop Whether or not droping will be enabled
     */
    setDropMode(drop: boolean): Promise<void>;
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
     * Selects the tab
     * @param tabID The ID of the tab to select
     */
    selectTab(tabID: string): Promise<void>;
    /**
     * Starts moving the locations elsewhere
     * @param ID The ID of the tab to move
     * @param handleData The data that the handle uses to represent itself
     */
    onDragStart(ID: string, handleData: TabHandleData): Promise<void>;
    /**
     * Moves the locations when the drag ends
     * @param ID The ID of the tab that finished dragging
     */
    onDragEnd(ID: string): Promise<void>;
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
