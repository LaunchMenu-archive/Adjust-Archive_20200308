import {WindowSelectorType, WindowSelector} from "./windowSelector.type";
import {WindowManager, UUID, ExtendedObject} from "@adjust/core";
import {DragEvent} from "react";
import {createModule} from "../../../../../../module/moduleClassCreator";
import {React} from "../../../../../../React";
import {dragAndDropName} from "../../../locationAncestor.type";
import {InputPrompt, InputPromptType} from "../../../../../prompts/inputPrompt.type";
import {WindowsData} from "../_types/windowData";
import {Window, WindowType} from "../window/window.type";
import LocationAncestorModule from "../../../locationAncestor";
import {createModuleView} from "../../../../../../module/moduleViewClassCreator";
import {Box} from "../../../../../../components/Box";

const sizes = {
    barHeight: 40,
    windowHeight: 500,
};
export const config = {
    initialState: {
        closedWindows: {} as WindowsData,
        windowModule: null as Promise<Window>,
    },
    settings: {},
    type: WindowSelectorType,
};

export default class WindowSelectorModule
    extends createModule(config, LocationAncestorModule)
    implements WindowSelector {
    // The name of the window
    protected windowID: string = "#windowSelector";

    // The window in which this module is shown
    protected window: Promise<Electron.BrowserWindow>;

    // Window management
    /**
     * Gets the window that's used for this selector, opens it if absent
     * @returns The opened or retrieved window
     */
    protected async getWindow(): Promise<Electron.BrowserWindow> {
        if (this.window) return this.window;
        return (this.window = WindowManager.openWindow(this.windowID, this.getID(), {
            useContentSize: true,
            height: sizes.barHeight,
        }));
    }

    /**
     * Closes the window if it had been opened already
     */
    protected async closeWindow(): Promise<void> {
        // Check if the window has been opened
        if (this.window) {
            // Close the window
            WindowManager.closeWindow(this.windowID);
            this.window = null;
        }
    }

    /** @override */
    public async onInit(fromReload: boolean): Promise<void> {
        const window = await this.getWindow();
        window.hide();
    }

    /** @override */
    protected async onStop(): Promise<void> {
        await this.closeWindow();
    }

    /** @override fowards the data to the selector's parent */
    public async changeWindowName(name: string, windowID: string): Promise<void> {
        await this.parent.changeWindowName(name, windowID);
    }

    /** @override fowards the data to the selector's parent */
    public async setWindowVisibility(visible: boolean, windowID: string): Promise<void> {
        await this.parent.setWindowVisibility(visible, windowID);
    }

    // Interface methods
    /** @override */
    public async setWindows(closed: WindowsData, opened: WindowsData): Promise<void> {
        await this.setState({
            closedWindows: {
                ...closed,
                // Make sure to remove previous window data
                [ExtendedObject.overwrite]: true,
            },
        });
    }

    /** @override */
    public async setEnabled(enabled: boolean): Promise<void> {
        const window = await this.getWindow();
        if (enabled) window.show();
        else {
            window.hide();
            this.showWindow(null);
        }
    }

    // Drop methods
    /**
     * Handles dropping of location(s) on the new window button
     */
    public async onDropNew(): Promise<void> {
        // Retrieve the move data
        const parent = this.getParent();
        const currentData = await parent.getLocationsMoveData();

        // Set all hints to a path pointing at this location
        const ID = UUID.generateShort();
        const path = [ID];
        currentData.locations.forEach(loc => {
            loc.hints = {
                path,
            };
        });

        // Update the data
        const movePromise = parent.updateLocationsMoveData(currentData);

        // Allow the user to rename the window
        const renamePromise = new Promise(async res => {
            // Obtain the name prompt
            const namePrompt = await this.request({
                type: InputPromptType,
                openView: true,
            });

            // Prompt the user for a name
            const name = await namePrompt.prompt("string", {
                title: "Window Name",
                description: "Please enter the name that the window should have",
                maxLength: 40,
                defaultValue: ID,
            });

            // If a name was passed, set it
            if (name) await this.parent.changeWindowName(name, ID);

            // Close the prompt
            await namePrompt.close();
        });

        // Await the promises
        await Promise.all([movePromise, renamePromise]);
    }

    /**
     * Shows the window contents of the window with the given ID
     * @param windowID The ID of the window to show, or undefined to hide
     */
    public async showWindow(windowID: string): Promise<void> {
        // Close the current window
        if (this.state.windowModule) {
            const windowModule = await this.state.windowModule;

            // Remove the window
            this.setState({windowModule: undefined});

            // Close the window
            windowModule.close();

            // Update the window size
            const window = await this.getWindow();
            window.setContentSize(window.getContentSize()[0], sizes.barHeight);
        }

        // Open the new window
        if (windowID) {
            // Obtain the new window
            this.setState({
                windowModule: this.request({
                    type: WindowType,
                    data: {
                        ID: windowID,
                        path: [...this.getData().path, windowID],
                        previewMode: true,
                    },
                }),
            });
            const windowModule = await this.state.windowModule;

            // Set the window to edit mode and drop mode
            await windowModule.setEditMode(true);
            await windowModule.setDropMode(true);

            // If the window module is still visible, expand the window size
            if (this.state.windowModule) {
                const window = await this.getWindow();
                window.setContentSize(window.getContentSize()[0], sizes.windowHeight);
            }
        }
    }
}

export class WindowSelectorView extends createModuleView(WindowSelectorModule) {
    /** @override */
    public componentWillMount(): void {
        super.componentWillMount();

        // Setup event listeners to trigger onDragLeave,
        // inspiration: https://www.tutorialspoint.com/How-to-detect-the-dragleave-event-in-Firefox-when-draggingoutside-the-window-with-HTML
        const collection = new Set();
        window.addEventListener("dragenter", ev => {
            collection.add(ev.target);
        });
        window.addEventListener("dragleave", ev => {
            collection.delete(ev.target);
            if (collection.size === 0) this.onDragLeave();
        });
        window.addEventListener("drop", ev => {
            collection.delete(ev.target);
            if (collection.size === 0) this.onDragLeave();
        });
    }

    /**
     * Gets called when data is dragged to outside this window
     */
    protected onDragLeave(): void {
        this.module.showWindow(null);
    }

    // Drag and drop methods
    /**
     * Handles showing the window for this name
     * @param windowID The ID of the window to show
     * @param event The DOM event of the user dragging data
     */
    protected onDragEnterWindow(windowID: string, event: DragEvent): void {
        event.preventDefault(); // Allows for dropping
        this.module.showWindow(windowID);
    }

    /**
     * Allows for a drop here
     * @param event The DOM event of the user dragging data
     */
    protected onDragOver(event: DragEvent): void {
        event.preventDefault(); // Allows for dropping
    }

    /**
     * Handles the dropping of location(s) on the new window button
     * @param event The DOM event of the user dragging data
     */
    protected onDropNew(event: DragEvent): void {
        event.preventDefault(); // Allows for dropping
        const data = event.dataTransfer.getData("text");
        if (data == dragAndDropName) {
            this.module.onDropNew();
        }
    }

    // Rendering methods
    /**
     * Renders the selected window
     */
    protected renderWindow(): JSX.Element {
        return this.state.windowModule;
    }

    /**
     * Renders the window names
     */
    protected renderWindowNames(): JSX.Element[] {
        return Object.entries(this.state.closedWindows).map(([ID, data]) => {
            return (
                <Box
                    onDragEnter={e => this.onDragEnterWindow(ID, e)}
                    background="primary"
                    margin="m"
                    key={ID}>
                    {data.name}
                </Box>
            );
        });
    }

    /**@override */
    protected renderView(): JSX.Element {
        return (
            <Box
                display="flex"
                flexDirection="column"
                css={{width: "100%", height: "100%"}}>
                <Box
                    className="selector"
                    display="flex"
                    flexDirection="row"
                    css={{width: "100%", height: sizes.barHeight}}>
                    {this.renderWindowNames()}
                    <Box
                        background="primary"
                        margin="m"
                        onDragOver={e => this.onDragOver(e)}
                        onDrop={e => this.onDropNew(e)}>
                        New window
                    </Box>
                </Box>
                <Box className="window" flexGrow={1} css={{position: "relative"} as any}>
                    {this.renderWindow()}
                </Box>
            </Box>
        );
    }
}
