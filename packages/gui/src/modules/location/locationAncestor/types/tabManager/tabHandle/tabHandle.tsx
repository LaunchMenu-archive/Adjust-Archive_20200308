import {SettingsConditions, DataSettingsConditions, UUID} from "@adjust/core";
import {TabHandleType, TabHandle} from "./tabHandle.type";
import {createModule} from "../../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../../module/moduleViewClassCreator";
import {React} from "../../../../../../React";
import {Pivot, PivotItem} from "office-ui-fabric-react";
import {dragAndDropName} from "../../../locationAncestor.type";
import {DragEvent as ReactDragEvent} from "react";
import {Box} from "../../../../../../components/Box";
import {LocationsMoveData} from "../../../../_types/LocationsMoveData";
import {TabHandleData} from "../_types/TabHandleData";

export const tabHandleConfig = {
    details: {
        name: "John",
        description: "Cool kid",
        icon: "someURL",
    },
    state: {
        inEditMode: false,
        inDropMode: false,
        index: 0,
        selected: false,
    },
    settings: {
        name: {
            default: "John",
            type: "string",
        },
    },
    type: TabHandleType,
};

export class TabHandleModule extends createModule(tabHandleConfig) implements TabHandle {
    // The settings conditions to save data under
    protected settingsConditions: SettingsConditions;

    /** @override */
    protected async onInit(fromReload: boolean): Promise<void> {
        await super.onInit(fromReload);

        // Save data under the ID of this ancestor
        this.settingsConditions = new DataSettingsConditions(
            {path: this.getData().path},
            1
        );
    }

    /** @override*/
    public async setIndex(index: number): Promise<void> {
        this.changeState({index});
    }

    /** @override*/
    public async setInitialData(data: TabHandleData): Promise<void> {
        this.getSettingsObject().setInitialData(
            {name: data.name},
            this.settingsConditions
        );
    }

    /** @override */
    public async setEditMode(edit: boolean): Promise<void> {
        this.changeState({inEditMode: edit});
    }

    /** @override */
    public async setDropMode(drop: boolean): Promise<void> {
        this.changeState({inDropMode: drop});
    }

    /** @override*/
    public async setSelected(selected: boolean): Promise<void> {
        this.changeState({selected});
    }

    /** @override*/
    public async remove(): Promise<void> {
        this.getSettingsObject().removeConditionData(this.settingsConditions);
    }

    /**
     * Selects this tab in the tabs manager
     */
    public async select(): Promise<void> {
        this.getParent().selectTab(this.getData().ID);
    }

    // Drag and drop methods
    /**
     * Starts moving the locations elsewhere
     */
    public async onDragStart(): Promise<void> {
        this.getParent().onDragStart(this.getData().ID, {name: this.settings.name});
    }

    /**
     * Moves the locations when the drag ends
     */
    public async onDragEnd(): Promise<void> {
        this.getParent().onDragEnd(this.getData().ID);
    }
}

export default TabHandleModule;

export class TabHandleView extends createModuleView(TabHandleModule) {
    // Drag and drop methods
    /**
     * Starts the dragging of a location
     * @param event The DOM event that starts the dragging
     */
    protected onDragStart(event: ReactDragEvent): void {
        if (this.state.inEditMode) {
            event.dataTransfer.setData("text", dragAndDropName);
            this.module.onDragStart();
        }
    }

    /**
     * Updates the locations when draging a location finishes
     * @param event The DOM event of the user dragging data
     */
    protected onDragEnd(event: DragEvent): void {
        if (this.state.inEditMode) this.module.onDragEnd();
    }

    // Rendering methods
    public renderLoader(): JSX.Element {
        return <span></span>;
    }

    /** @override */
    public renderView(): JSX.Element {
        return (
            <Box
                display="inline-block"
                onDragStart={e => this.onDragStart(e)}
                elRef={el => {
                    // Use the element's ondragend, since react's ondragend doesn't trigger once the element has unmounted
                    if (el) el.ondragend = e => this.onDragEnd(e);
                }}
                draggable={this.state.inEditMode}>
                <Pivot
                    selectedKey={(this.state.selected ? "0" : null) as any}
                    headersOnly
                    onLinkClick={() => this.module.select()}
                    onDragOver={() => this.module.select()}
                    css={{display: "inline-block"}}>
                    <PivotItem headerText={this.settings.name} itemKey="0" />
                </Pivot>
            </Box>
        );
    }
}
