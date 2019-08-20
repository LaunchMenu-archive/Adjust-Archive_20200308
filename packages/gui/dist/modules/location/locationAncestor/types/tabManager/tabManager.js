var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const locationAncestor_1 = __importDefault(require("../../locationAncestor"));
const locationAncestor_type_1 = require("../../locationAncestor.type");
const React_1 = require("../../../../../React");
const tabHandle_type_1 = require("./tabHandle/tabHandle.type");
const Box_1 = require("../../../../../components/Box");
const ChildBox_1 = require("../../../../../components/ChildBox");
const ParentBox_1 = require("../../../../../components/ParentBox");
const HorizontalScroller_1 = require("../../../../../components/HorizontalScroller");
exports.tabManagerConfig = {
    initialState: {
        tabs: [],
        selectedTabID: null,
        tabsVisible: false,
        removed: false,
    },
    settings: {
        tabs: {
            default: [],
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
    type: locationAncestor_type_1.LocationAncestorType,
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
class TabManagerModule extends core_1.createModule(exports.tabManagerConfig, locationAncestor_1.default) {
    constructor() {
        super(...arguments);
        // The name of this ancestor type to be used in the location path and hints
        this.ancestorName = "tab";
    }
    // Tab management
    /**
     * Retrieves the index of the tab if present
     * @param ID The ID of the tab whose index to retrieve
     * @param opened Whether to get the index from the opened tabs or all tabs
     * @returns The index of te tab
     */
    getTabIndex(ID, opened = false) {
        return (opened ? this.state.tabs : this.settings.tabs).findIndex(tab => tab.ID == ID);
    }
    /**
     * Retrieves the data available for a tab, or creates it if absent and open is true
     * @param ID THe ID of the tab to obtain
     * @param open Whether or not to open the tab if not present
     * @param name The name of the tab to add
     * @param index The index to add the tab at
     * @returns The tab information
     */
    async getTab(ID, open = true, name, index = 0) {
        // Check if the tab is already opened
        let tabData = this.state.tabs.find(tab => tab.ID == ID);
        if (!tabData && open) {
            // Request the child ancestor and the tab handle
            tabData = {
                ID,
                tabHandle: this.request({
                    type: tabHandle_type_1.TabHandleType,
                    data: { ID: ID, path: [...this.getData().path, ID] },
                }),
                childAncestor: this.getChildLocationAncestor(ID),
                closed: false,
            };
            // Define the tab data if absent
            let tabStoredData = this.settings.tabs.find(tab => tab.ID == ID);
            if (!tabStoredData) {
                tabStoredData = { ID, name: name || ID };
                this.setSettings({
                    tabs: [
                        ...this.settings.tabs.slice(0, index),
                        tabStoredData,
                        ...this.settings.tabs.slice(index),
                    ],
                }, this.settingsConditions);
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
    async closeTab(ID) {
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
    async removeTab(ID) {
        // Make sure the tab exists
        const index = this.getTabIndex(ID);
        if (index !== -1) {
            // Retrieve all the tabs data in order to remove it
            let tab = await this.getTab(ID);
            if (this.state.removed)
                return;
            // Remove the tab handle and children
            await (await tab.tabHandle).remove();
            await (await tab.childAncestor).removeAncestor();
            // Remove the associated data
            this.setSettings({
                tabs: [
                    ...this.settings.tabs.slice(0, index),
                    ...this.settings.tabs.slice(index + 1),
                ],
            }, this.settingsConditions);
            // Close the tab
            await this.closeTab(ID);
        }
    }
    /** @override */
    async changeTabName(name, tabID) {
        const index = this.getTabIndex(tabID);
        if (index !== -1) {
            const tab = this.settings.tabs.find(tab => tab.ID == tabID);
            this.setSettings({
                tabs: [
                    ...this.settings.tabs.slice(0, index),
                    Object.assign({}, tab, { name }),
                    ...this.settings.tabs.slice(index + 1),
                ],
            });
        }
        // Rename the tab if opened
        const tab = await this.getTab(tabID, false);
        if (tab)
            (await tab.tabHandle).setName(name);
    }
    /** @override */
    async selectTab(tabID) {
        // Deselect the old tab
        const oldTab = await this.getTab(this.state.selectedTabID, false);
        if (oldTab)
            (await oldTab.tabHandle).setSelected(false);
        // Store the newly selected tab
        this.setState({
            selectedTabID: tabID,
        });
        // Inform the tab about it being selected
        const newTab = await this.getTab(tabID, false);
        if (newTab)
            (await newTab.tabHandle).setSelected(true);
    }
    /**
     * Sets whether the tabs handles are visible and the selected tab ID based on the opened tabs
     */
    async updateTabs() {
        // Make sure the selected tab ID is valid
        let tab = await this.getTab(this.state.selectedTabID, false);
        if (!tab) {
            tab = this.state.tabs[0];
            if (tab)
                await this.selectTab(tab.ID);
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
    async createLocation(location) {
        // Get the ID of tab
        let tabID;
        let hints = this.getLocationHints(location);
        if (hints["new"]) {
            tabID = core_1.UUID.generateShort();
        }
        else if ("sameAs" in hints) {
            const locationPath = await this.getLocationPath(hints["sameAs"]);
            tabID = locationPath.nodes[this.getData().path.length];
        }
        else if ("ID" in hints) {
            tabID = hints["ID"];
        }
        // Default to default
        if (!tabID)
            tabID = "default";
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
    async removeLocation(locationPath) {
        // Retrieve the tab ID
        const { ID, path } = this.getExtractID(locationPath);
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
    async removeAncestor() {
        this.setState({ removed: true });
        const promises = this.settings.tabs.map(async (tab) => {
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
        this.setSettings({ tabs: [] });
        await this.settingsObject
            .getSettingsFile()
            .removeConditionData(this.settingsConditions);
        // Await all the windows disposals
        await Promise.all(promises);
    }
    // Module management
    /** @override */
    async openModule(module, locationPath) {
        // Retrieve the tab ID
        const { ID, path } = this.getExtractID(locationPath);
        // Obtain the tab
        const tab = await this.getTab(ID, true);
        // Forward opening the module to the tab's child ancestor
        return (await tab.childAncestor).openModule(module, path);
    }
    /** @override */
    async closeModule(module, locationPath) {
        // Retrieve the tab ID
        const { ID, path } = this.getExtractID(locationPath);
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
                if (modulesAtPath.length == 0)
                    await this.closeTab(ID);
            }
            return closed;
        }
        return false;
    }
    /** @override */
    async showModule(module, locationPath) {
        // Retrieve the tab ID
        const { ID, path } = this.getExtractID(locationPath);
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
    async setDropMode(drop) {
        // Update the state
        await super.setDropMode(drop);
        // Inform ancestors
        const promises = this.state.tabs.map(async (tab) => (await tab.childAncestor).setDropMode(drop));
        await Promise.all(promises);
    }
    /** @override */
    async setEditMode(edit) {
        // Update the state
        await super.setEditMode(edit);
        // Inform ancestors
        const promises = this.state.tabs.map(async (tab) => (await tab.childAncestor).setEditMode(edit));
        await Promise.all(promises);
    }
}
exports.TabManagerModule = TabManagerModule;
exports.default = TabManagerModule;
class TabManagerView extends core_1.createModuleView(TabManagerModule) {
    /**
     * Render the tab handles
     */
    renderHandles() {
        return (React_1.React.createElement(HorizontalScroller_1.HorizontalScroller, { stepSize: this.settings.handles.scrollSpeed, scrollStepSize: this.settings.handles.wheelScrollSpeed }, this.state.tabs.map(tab => tab.tabHandle)));
    }
    /**
     * Renders what the tab should look like if empty
     */
    renderEmpty() {
        return React_1.React.createElement(Box_1.Box, null, "Shit's empty");
    }
    /** @override */
    renderView() {
        const selectedTabData = this.state.tabs.find(tab => tab.ID == this.state.selectedTabID);
        const tabContent = (selectedTabData && selectedTabData.childAncestor) || this.renderEmpty();
        return (React_1.React.createElement(ChildBox_1.ChildBox, { className: "tabsManager", display: "flex", flexDirection: "column" },
            React_1.React.createElement(Box_1.Box, null, this.renderHandles()),
            React_1.React.createElement(ParentBox_1.ParentBox, { flex: "1", position: "relative" }, tabContent)));
    }
}
exports.TabManagerView = TabManagerView;
//# sourceMappingURL=tabManager.js.map