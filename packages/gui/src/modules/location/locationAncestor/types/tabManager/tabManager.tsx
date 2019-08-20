import {
    createModule,
    ModuleReference,
    UUID,
    createModuleView,
    ExtendedObject,
} from "@adjust/core";
import {ModuleLocation} from "../../../../../module/_types/ModuleLocation";
import LocationAncestorModule from "../../locationAncestor";
import {LocationPath} from "../../../_types/LocationPath";
import {LocationAncestorType, LocationAncestor} from "../../locationAncestor.type";
import {React} from "../../../../../React";
import {OpenedTab, Tab} from "./_types/TabData";
import {TabHandleType, TabHandleParent} from "./tabHandle/tabHandle.type";
import {Box} from "../../../../../components/Box";
import {ChildBox} from "../../../../../components/ChildBox";
import {ParentBox} from "../../../../../components/ParentBox";
import {HorizontalScroller} from "../../../../../components/HorizontalScroller";

export const tabManagerConfig = {
    initialState: {
        tabs: [] as OpenedTab[],
        selectedTabID: null as string,
        tabsVisible: false,
        removed: false, // Whether or not this tab manager has been removed from memory
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
 * - before: String (The ID of the tab or location that this tab should be in front of)
 * - after: String (The ID of the tab or location that this tab should be behind, can't be used with before)
 */

/**
 * The tabs manager, responsible for keeping track and opening tabs
 */
export class TabManagerModule
    extends createModule(tabManagerConfig, LocationAncestorModule)
    implements LocationAncestor, TabHandleParent {
    // The name of this ancestor type to be used in the location path and hints
    protected ancestorName: string = "tab";

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
     * @param name The name of the tab to add
     * @param index The index to add the tab at
     * @returns The tab information
     */
    protected async getTab(
        ID: string,
        open: boolean = true,
        name?: string,
        index: number = 0
    ): Promise<OpenedTab> {
        // Check if the tab is already opened
        let tabData = this.state.tabs.find(tab => tab.ID == ID);

        if (!tabData && open) {
            // Request the child ancestor and the tab handle
            tabData = {
                ID,
                tabHandle: this.request({
                    type: TabHandleType,
                    data: {ID: ID, path: [...this.getData().path, ID]},
                }),
                childAncestor: this.getChildLocationAncestor(ID),
                closed: false,
            };

            // Define the tab data if absent
            let tabStoredData = this.settings.tabs.find(tab => tab.ID == ID);
            if (!tabStoredData) {
                tabStoredData = {ID, name: name || ID};
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
            }

            // Obtain the index the tab should have in the opened tabs list
            let openedIndex = 0;
            for (let beforeIndex = index - 1; beforeIndex >= 0; beforeIndex--) {
                const tabBeforeID = this.settings.tabs[index].ID;
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
            (await tabData.tabHandle).setName(tabStoredData.name);

            // Update derived misc data
            await this.updateTabs();
        }

        return tabData;
    }

    /**
     * Closes a tab with the given ID
     * @param ID The ID of the tab to close
     */
    protected async closeTab(ID: string): Promise<void> {
        // Get the tab if opened
        const tab = await this.getTab(ID, false);
        if (tab) {
            const openedIndex = this.getTabIndex(ID, true);

            // Immediately indicate this tab is closed, for any existing references
            tab.closed = true;

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
            let tab = await this.getTab(ID);
            if (this.state.removed) return;

            // Remove the tab handle and children
            await (await tab.tabHandle).remove();
            await (await tab.childAncestor).removeAncestor();

            // Remove the associated data
            this.setSettings(
                {
                    tabs: [
                        ...this.settings.tabs.slice(0, index),
                        ...this.settings.tabs.slice(index + 1),
                    ],
                },
                this.settingsConditions
            );

            // Close the tab
            await this.closeTab(ID);
        }
    }

    /** @override */
    public async changeTabName(name: string, tabID: string): Promise<void> {
        const index = this.getTabIndex(tabID);
        if (index !== -1) {
            const tab = this.settings.tabs.find(tab => tab.ID == tabID);
            this.setSettings({
                tabs: [
                    ...this.settings.tabs.slice(0, index),
                    {...tab, name},
                    ...this.settings.tabs.slice(index + 1),
                ],
            });
        }

        // Rename the tab if opened
        const tab = await this.getTab(tabID, false);
        if (tab) (await tab.tabHandle).setName(name);
    }

    /** @override */
    public async selectTab(tabID: string): Promise<void> {
        // Deselect the old tab
        const oldTab = await this.getTab(this.state.selectedTabID, false);
        if (oldTab) (await oldTab.tabHandle).setSelected(false);

        // Store the newly selected tab
        this.setState({
            selectedTabID: tabID,
        });

        // Inform the tab about it being selected
        const newTab = await this.getTab(tabID, false);
        if (newTab) (await newTab.tabHandle).setSelected(true);
    }

    /**
     * Sets whether the tabs handles are visible and the selected tab ID based on the opened tabs
     */
    protected async updateTabs(): Promise<void> {
        // Make sure the selected tab ID is valid
        let tab = await this.getTab(this.state.selectedTabID, false);
        if (!tab) {
            tab = this.state.tabs[0];
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
        if (!tabID) tabID = "default";

        // Obtain the tab
        let tab = await this.getTab(tabID, true);
        if (!tab) {
            const name = hints["name"];
            let index = this.settings.tabs.length;
            if ("before" in hints || "after" in hints) {
                let relIndex = this.getTabIndex(hints["before"]);
                if (relIndex == -1) {
                    const locationPath = await this.getLocationPath(hints["sameAs"]);
                    const relTabID = locationPath.nodes[this.getData().path.length];
                    relIndex = this.getTabIndex(relTabID);
                }
                index = "before" in hints ? relIndex : relIndex + 1;
            }
            tab = await this.getTab(tabID, true, name, index);
        }

        // Create the new location path, and return it
        return (await tab.childAncestor).createLocation(location);
    }

    /** @override */
    public async removeLocation(locationPath: LocationPath): Promise<boolean> {
        // Retrieve the tab ID
        const {ID, path} = this.getExtractID(locationPath);

        // Obtain the tab
        const tab = await this.getTab(ID);

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
        }

        // Return whether or not the location existed here, and was removed
        return removed;
    }

    /** @override */
    public async removeAncestor(): Promise<void> {
        this.setState({removed: true});

        const promises = this.settings.tabs.map(async tab => {
            // Obtain the tab
            const tabData = await this.getTab(tab.ID);

            // Dispose the tab
            await (await tabData.childAncestor).removeAncestor();
            await (await tabData.tabHandle).remove();

            // Close the tab
            await (await tabData.childAncestor).close();
            await (await tabData.tabHandle).close();
        });

        // Clear the settings
        this.setSettings({tabs: []});
        await this.settingsObject
            .getSettingsFile()
            .removeConditionData(this.settingsConditions);

        // Await all the windows disposals
        await Promise.all(promises);
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
        const tab = await this.getTab(ID, true);

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
        const tab = await this.getTab(ID, false);
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
        const tab = await this.getTab(ID, false);
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
        const promises = this.state.tabs.map(async tab =>
            (await tab.childAncestor).setDropMode(drop)
        );
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
                const tab = await this.getTab(tabData.ID);
                await (await tab.childAncestor).setEditMode(edit);
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
                } else {
                    await this.closeTab(tab.ID);
                }
            });
            await Promise.all(promises);
        }
    }
}
export default TabManagerModule;

export class TabManagerView extends createModuleView(TabManagerModule) {
    /**
     * Render the tab handles
     */
    protected renderHandles(): JSX.Element {
        return (
            <HorizontalScroller
                stepSize={this.settings.handles.scrollSpeed}
                scrollStepSize={this.settings.handles.wheelScrollSpeed}>
                {this.state.tabs.map(tab => tab.tabHandle)}
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
