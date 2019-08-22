import {
    createModule,
    ModuleReference,
    UUID,
    createModuleView,
    ExtendedObject,
    AsyncMutualExcluder,
} from "@adjust/core";
import {DragEvent as ReactDragEvent} from "react";
import {ModuleLocation} from "../../../../../module/_types/ModuleLocation";
import LocationAncestorModule from "../../locationAncestor";
import {LocationPath} from "../../../_types/LocationPath";
import {
    LocationAncestorType,
    LocationAncestor,
    dragAndDropName,
} from "../../locationAncestor.type";
import {React} from "../../../../../React";
import {OpenedTab, Tab} from "./_types/TabData";
import {TabHandleType, TabHandleParent} from "./tabHandle/tabHandle.type";
import {Box} from "../../../../../components/Box";
import {ChildBox} from "../../../../../components/ChildBox";
import {ParentBox} from "../../../../../components/ParentBox";
import {HorizontalScroller} from "../../../../../components/HorizontalScroller";
import {TabHandleData} from "./_types/TabHandleData";

export const tabManagerConfig = {
    initialState: {
        tabs: [] as OpenedTab[],
        selectedTabID: null as string,
        tabsVisible: false,
    },
    settings: {
        tabs: {
            default: [] as Tab[],
            type: "tabs",
        },
        handles: {
            scrollSpeed: {
                default: 10,
                type: "number",
            },
            wheelScrollSpeed: {
                default: 20,
                type: "number",
            },
        },
    },
    getPriority: () => 2,
    type: LocationAncestorType,
};

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
export class TabManagerModule
    extends createModule(tabManagerConfig, LocationAncestorModule)
    implements LocationAncestor, TabHandleParent {
    // The name of this ancestor type to be used in the location path and hints
    protected ancestorName: string = "tab";

    // An async excluder to make sure that tabs aren't being modified at the same time
    protected excluder: AsyncMutualExcluder = new AsyncMutualExcluder();

    // Tab management
    /**
     * Retrieves the index of the tab if present
     * @param ID The ID of the tab whose index to retrieve
     * @param opened Whether to get the index from the opened tabs or all tabs
     * @returns The index of te tab
     */
    protected getTabIndex(ID: string, opened: boolean = false): number {
        return (opened ? this.state.tabs : this.settings.tabs).findIndex(
            tab => tab.ID == ID
        );
    }

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
    protected async getTab(
        ID: string,
        open: boolean = false,
        create: boolean = false,
        visible: boolean = null,
        tabHandleData?: TabHandleData,
        index: number = 0
    ): Promise<OpenedTab> {
        // Check if the tab is already opened
        let tabData = this.state.tabs.find(tab => tab.ID == ID);

        if (!tabData && open) {
            if (!create && this.getTabIndex(ID, false) == -1) return;

            // Request the child ancestor and the tab handle
            tabData = {
                ID,
                tabHandle: this.request({
                    type: TabHandleType,
                    data: {ID: ID, path: [...this.getData().path, ID]},
                }),
                childAncestor: this.getChildLocationAncestor(ID),
                visible: visible == null ? false : visible,
            };

            // Define the tab data if absent
            let tabStoredData = this.settings.tabs.find(tab => tab.ID == ID);
            if (!tabStoredData) {
                tabStoredData = {ID};
                this.setSettings(
                    {
                        tabs: [
                            ...this.settings.tabs.slice(0, index),
                            tabStoredData,
                            ...this.settings.tabs.slice(index),
                        ],
                    },
                    this.settingsConditions
                );
            } else {
                // Otherwise obtain the index of the tab from the settings
                index = this.getTabIndex(ID, false);
            }

            // Obtain the index the tab should have in the opened tabs list
            let openedIndex = 0;
            for (let beforeIndex = index - 1; beforeIndex >= 0; beforeIndex--) {
                const tabBeforeID = this.settings.tabs[beforeIndex].ID;
                const openedIndexBefore = this.getTabIndex(tabBeforeID, true);
                if (openedIndexBefore !== -1) {
                    openedIndex = openedIndexBefore + 1;
                    break;
                }
            }

            // Add the tab at this index
            this.setState({
                tabs: [
                    ...this.state.tabs.slice(0, openedIndex),
                    tabData,
                    ...this.state.tabs.slice(openedIndex),
                ],
            });

            // Set the tab's name
            if (!tabHandleData) tabHandleData = {name: ID};
            if (!tabHandleData.name) tabHandleData.name = ID;
            (await tabData.tabHandle).setInitialData(tabHandleData);

            // Update derived misc data
            await this.updateTabs();
        }

        // Update visible if required
        if (tabData && visible != null && tabData.visible != visible) {
            this.setState({
                tabs: this.state.tabs.map(tab =>
                    tab.ID == ID ? {...tab, visible} : tab
                ),
            });
        }

        return tabData;
    }

    /**
     * Closes a tab with the given ID
     * @param ID The ID of the tab to close
     */
    protected async closeTab(ID: string): Promise<void> {
        return this.excluder.schedule(async () => {
            // Get the tab if opened
            const tab = await this.getTab(ID, false, false, false);
            if (tab) {
                const openedIndex = this.getTabIndex(ID, true);

                // Remove it from the state
                this.setState({
                    tabs: [
                        ...this.state.tabs.slice(0, openedIndex),
                        ...this.state.tabs.slice(openedIndex + 1),
                    ],
                });

                // Close it
                (await tab.childAncestor).close();
                (await tab.tabHandle).close();

                // Update derived misc data
                await this.updateTabs();
            }
        });
    }

    /**
     * Removes the tab with the given ID
     * @param ID The ID of the tab to remove
     * @returns A promise that resolves when all settings listeners have resolved
     */
    protected async removeTab(ID: string): Promise<void> {
        // Make sure the tab exists
        const index = this.getTabIndex(ID);
        if (index !== -1) {
            // Retrieve all the tabs data in order to remove it
            let tabPromise = this.getTab(ID, true);

            // Remove the associated data ASAP
            this.setSettings(
                {
                    tabs: [
                        ...this.settings.tabs.slice(0, index),
                        ...this.settings.tabs.slice(index + 1),
                    ],
                },
                this.settingsConditions
            );
            const tab = await tabPromise;

            // Remove the tab handle and children
            await (await tab.tabHandle).remove();
            await (await tab.childAncestor).removeAncestor();

            // Close the tab
            await this.closeTab(ID);
        }
    }

    /** @override */
    public async selectTab(tabID: string): Promise<void> {
        // Deselect the old tab
        const oldTab = await this.getTab(this.state.selectedTabID);
        if (oldTab) (await oldTab.tabHandle).setSelected(false);

        // Store the newly selected tab
        this.setState({
            selectedTabID: tabID,
        });

        // Inform the tab about it being selected
        const newTab = await this.getTab(tabID);
        if (newTab) (await newTab.tabHandle).setSelected(true);
    }

    /**
     * Sets whether the tabs handles are visible and the selected tab ID based on the opened tabs
     */
    protected async updateTabs(): Promise<void> {
        // Make sure the selected tab ID is valid
        let tab = await this.getTab(this.state.selectedTabID);
        if (!tab) {
            tab = this.state.tabs.find(tab => tab.visible);
            if (tab) await this.selectTab(tab.ID);
        }

        // Only show the tabs if multiple tabs are opened
        const shouldShowTabs = this.state.tabs.length > 1;
        if (this.state.tabsVisible != shouldShowTabs) {
            this.setState({
                tabsVisible: shouldShowTabs,
            });
        }
    }

    // Location management
    /** @override */
    public async createLocation(location: ModuleLocation): Promise<LocationPath> {
        // Get the ID of tab
        let tabID;
        let hints = this.getLocationHints(location);
        if (hints["new"]) {
            tabID = UUID.generateShort();
        } else if ("sameAs" in hints) {
            const locationPath = await this.getLocationPath(hints["sameAs"]);
            tabID = locationPath.nodes[this.getData().path.length];
        } else if ("ID" in hints) {
            tabID = hints["ID"];
        }

        // Default to default
        if (!tabID)
            tabID = this.settings.tabs.length > 0 ? this.settings.tabs[0].ID : "default";

        // Obtain the tab
        let tab = await this.getTab(tabID, true);
        if (!tab) {
            // Get the data for the handle, and a default index
            const handleData = hints["handleData"] || {};
            handleData.name = hints["name"] || tabID;
            let index = this.settings.tabs.length;

            // Check whether before or after is specified
            if ("before" in hints || "after" in hints) {
                const ID = hints["before"] || hints["after"];
                // Get the tab's index to place relative to
                let relIndex = this.getTabIndex(ID);
                if (relIndex == -1) {
                    // If no tab was found, look for a location with this ID instead
                    const locationPath = await this.getLocationPath(ID);
                    const relTabID = locationPath.nodes[this.getData().path.length];
                    relIndex = this.getTabIndex(relTabID);
                }
                // Obtain the index of the new tab
                index = "before" in hints ? relIndex : relIndex + 1;
            }

            // If an index was specified, use it
            if ("index" in hints) index = hints["index"];

            // Create the tab
            tab = await this.getTab(tabID, true, true, false, handleData, index);
        }

        // Create the new location path, and return it
        return (await tab.childAncestor).createLocation(location);
    }

    /** @override */
    public async removeLocation(locationPath: LocationPath): Promise<boolean> {
        // Retrieve the tab ID
        const {ID, path} = this.getExtractID(locationPath);

        // Obtain the tab
        const tab = await this.getTab(ID, true);

        // Remove the location from the tab
        const removed = (await tab.childAncestor).removeLocation(path);
        if (removed) {
            // Check if there are any locations left in this tab
            const locationsAtPath = await this.getLocationsAtPath([
                ...this.getData().path,
                ID,
            ]);

            // Remove the entire tab when empty
            if (locationsAtPath.length == 0) {
                // Remove the ancestor
                await this.removeTab(ID);
            }

            // Close the tab if there are no more modules opened in it
            const modulesAtPath = await this.getModulesAtPath([
                ...this.getData().path,
                ID,
            ]);
            if (modulesAtPath.length == 0) await this.closeTab(ID);
        }

        // Return whether or not the location existed here, and was removed
        return removed;
    }

    /** @override */
    public async removeAncestor(): Promise<void> {
        return this.excluder.schedule(async () => {
            const promises = this.settings.tabs.map(async tab => {
                // Obtain the tab
                const tabData = await this.getTab(tab.ID, true, false, false);

                // Dispose the tab
                await (await tabData.childAncestor).removeAncestor();
                await (await tabData.tabHandle).remove();

                // Close the tab
                await (await tabData.childAncestor).close();
                await (await tabData.tabHandle).close();
            });

            // Clear the settings ASAP
            this.setSettings({tabs: []});
            await this.settingsObject
                .getSettingsFile()
                .removeConditionData(this.settingsConditions);

            // Await all the windows disposals
            await Promise.all(promises);
        });
    }

    // Module management
    /** @override */
    public async openModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<LocationPath> {
        // Retrieve the tab ID
        const {ID, path} = this.getExtractID(locationPath);

        // Obtain the tab
        const tab = await this.getTab(ID, true, true, true);

        // Forward opening the module to the tab's child ancestor
        return (await tab.childAncestor).openModule(module, path);
    }

    /** @override */
    public async closeModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        // Retrieve the tab ID
        const {ID, path} = this.getExtractID(locationPath);

        // Obtain the tab if present
        const tab = await this.getTab(ID);
        if (tab) {
            // Forward closing the module to the tab
            const closed = await (await tab.childAncestor).closeModule(module, path);

            if (closed) {
                // Close the tab if there are no more modules opened in it
                const modulesAtPath = await this.getModulesAtPath([
                    ...this.getData().path,
                    ID,
                ]);
                if (modulesAtPath.length == 0) await this.closeTab(ID);
            }

            return closed;
        }

        return false;
    }

    /** @override */
    public async showModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        // Retrieve the tab ID
        const {ID, path} = this.getExtractID(locationPath);

        // Obtain the tab if present
        const tab = await this.getTab(ID);
        if (tab) {
            // Focus this tab
            this.selectTab(tab.ID);

            // Forward closing the module to the tab
            return await (await tab.childAncestor).showModule(module, path);
        }

        return false;
    }

    // Edit management
    /** @override */
    public async setDropMode(drop: boolean): Promise<void> {
        // Update the state
        await super.setDropMode(drop);

        // Inform ancestors
        const promises = this.state.tabs.map(async tab => {
            await (await tab.childAncestor).setDropMode(drop);
            await (await tab.tabHandle).setDropMode(drop);
        });
        await Promise.all(promises);
    }

    /** @override */
    public async setEditMode(edit: boolean): Promise<void> {
        // Update the state
        await super.setEditMode(edit);

        // Check whether edit mode got enabled or disabled
        if (edit) {
            // Open all the tabs and inform them about the edit mode
            const promises = this.settings.tabs.map(async tabData => {
                const tab = await this.getTab(tabData.ID, true, false, true);
                await (await tab.childAncestor).setEditMode(edit);
                await (await tab.tabHandle).setEditMode(edit);
            });
            await Promise.all(promises);
        } else {
            // Inform ancestors of the change
            const promises = this.state.tabs.map(async tab => {
                const openedModules = await this.getModulesAtPath([
                    ...this.getData().path,
                    tab.ID,
                ]);
                // If there are modules in this tab, update the edit mode, otherwise close the tab
                if (openedModules.length > 0) {
                    await (await tab.childAncestor).setEditMode(edit);
                    await (await tab.tabHandle).setEditMode(edit);
                } else {
                    await this.closeTab(tab.ID);
                }
            });
            await Promise.all(promises);
        }
    }

    // Drag and drop methods
    /** @override */
    public async onDragStart(ID: string, handleData: TabHandleData): Promise<void> {
        const path = [...this.getData().path, ID];

        // Obtain all the locations within this tab
        const locations = await this.getParent().getLocationsAtPath(path);

        // Get the index of the tab
        const index = this.getTabIndex(ID, false);

        // Store them all in the move data, defaulting to this tab if not moved
        const newTabID = UUID.generateShort();
        this.getParent().setLocationsMoveData({
            locations: locations.map(location => ({
                ID: location.ID,
                hints: {
                    path: [...path],
                    [this.ancestorName]: {index, ...handleData, ID: newTabID},
                },
            })),
        });
    }

    /** @override */
    public async onDragEnd(ID: string): Promise<void> {
        this.getParent().updateMovedLocations();
    }

    /**
     * Updates data to open in a new tab of this manager
     */
    public async onDrop(): Promise<void> {
        // Retrieve the move data
        const parent = this.getParent();
        const currentData = await parent.getLocationsMoveData();

        // Set all hints to a path pointing at this location
        const path = this.getData().path;
        const newTabID = UUID.generateShort();
        currentData.locations.forEach(loc => {
            loc.hints = {
                path: [...path],
                [this.ancestorName]: {
                    ...(loc.hints && (loc.hints[this.ancestorName] as any)),
                    ID: newTabID,
                },
            };
        });

        // Update the data
        await parent.updateLocationsMoveData(currentData);
    }
}
export default TabManagerModule;

export class TabManagerView extends createModuleView(TabManagerModule) {
    // Drag and drop methods
    /**
     * Checks whether this is valid data for a drop
     * @param event The DOM event of the user dragging data
     */
    protected onDragOver(event: ReactDragEvent): void {
        if (this.state.inDropMode) event.preventDefault(); // Allows for dropping
    }

    /**
     * Updates the locations when draging a location finishes
     * @param event The DOM event of the user dragging data
     */
    protected onDrop(event: ReactDragEvent): void {
        event.preventDefault(); // Allows for dropping
        const data = event.dataTransfer.getData("text");
        if (data == dragAndDropName && this.state.inDropMode) {
            this.module.onDrop();
        }
    }

    // Rendering methods
    /**
     * Render the tab handles
     */
    protected renderHandles(): JSX.Element {
        return (
            <HorizontalScroller
                stepSize={this.settings.handles.scrollSpeed}
                scrollStepSize={this.settings.handles.wheelScrollSpeed}>
                {this.state.tabs.filter(tab => tab.visible).map(tab => tab.tabHandle)}
                {this.state.inDropMode && (
                    <Box
                        display="inline-block"
                        background="primary"
                        verticalAlign="bottom"
                        padding="s"
                        onDragOver={e => this.onDragOver(e)}
                        onDrop={e => this.onDrop(e)}>
                        Add
                    </Box>
                )}
            </HorizontalScroller>
        );
    }

    /**
     * Renders what the tab should look like if empty
     */
    protected renderEmpty(): JSX.Element {
        return <Box>Shit's empty</Box>;
    }

    /** @override */
    public renderView(): JSX.Element {
        const selectedTabData = this.state.tabs.find(
            tab => tab.ID == this.state.selectedTabID
        );
        const tabContent =
            (selectedTabData && selectedTabData.childAncestor) || this.renderEmpty();

        return (
            <ChildBox className="tabsManager" display="flex" flexDirection="column">
                <Box>{this.renderHandles()}</Box>
                <ParentBox flex="1" position="relative">
                    {tabContent}
                </ParentBox>
            </ChildBox>
        );
    }
}
