import {Grid, Button, Box} from "@material-ui/core";
import {WindowSelectorID, WindowSelector} from "./windowSelector.type";
import {WindowManager, createModuleView, UUID} from "@adjust/core";
import {DragEvent} from "react";
import {createModule} from "../../../../../../module/moduleClassCreator";
import {React} from "../../../../../../React";
import {dragAndDropName} from "../../../locationAncestor.type";
import {InputPrompt, InputPromptID} from "../../../../../prompts/inputPrompt.type";

export const config = {
    initialState: {
        namePrompt: null as InputPrompt,
    },
    settings: {},
    type: WindowSelectorID,
};

export default class WindowSelectorModule extends createModule(config)
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
        return (this.window = WindowManager.openWindow(this.windowID, this.getID()));
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

    // Interface methods
    /** @override */
    public async setWindowNames(windows: string[]): Promise<void> {}

    /** @override */
    public async setEnabled(enabled: boolean): Promise<void> {
        const window = await this.getWindow();
        if (enabled) window.show();
        else window.hide();
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
            this.setState({
                namePrompt: await this.request({type: InputPromptID, openView: true}),
            });

            // Prompt the user for a name
            const name = await this.state.namePrompt.prompt("string", {
                title: "Window Name",
                description: "Please enter the name that the window should have",
                maxLength: 40,
                defaultValue: ID,
            });

            // If a name was passed, set it
            if (name) await this.parent.changeWindowName(name, ID);

            // Close the prompt
            const close = this.state.namePrompt.close();
            this.setState({
                namePrompt: undefined,
            });
            await close;
        });

        // Await the promises
        await Promise.all([movePromise, renamePromise]);
    }
}

export class WindowSelectorView extends createModuleView(WindowSelectorModule) {
    // Drag and drop methods
    /**
     * Checks whether this is valid data for a drop
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
    /**@override */
    protected renderView(): JSX.Element {
        return (
            <Box display="flex" flexDirection="row" css={{width: "100%", height: "100%"}}>
                <Box
                    display="flex"
                    onDragOver={e => this.onDragOver(e)}
                    onDrop={e => this.onDropNew(e)}>
                    New window
                </Box>
            </Box>
        );
    }
}
