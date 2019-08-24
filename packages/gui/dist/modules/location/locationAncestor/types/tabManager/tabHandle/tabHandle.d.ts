import { SettingsConditions } from "@adjust/core";
import { TabHandle } from "./tabHandle.type";
import { DragEvent as ReactDragEvent } from "react";
import { TabHandleData } from "../_types/TabHandleData";
export declare const tabHandleConfig: {
    state: {
        inEditMode: boolean;
        inDropMode: boolean;
        index: number;
        selected: boolean;
    };
    settings: {
        name: {
            default: string;
            type: string;
        };
    };
    type: import("@adjust/core/types").ContractID<import("./tabHandle.type").TabHandleContract>;
};
declare const TabHandleModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        inEditMode: boolean;
        inDropMode: boolean;
        index: number;
        selected: boolean;
    };
    settings: {
        name: {
            default: string;
            type: string;
        };
    };
    type: import("@adjust/core/types").ContractID<import("./tabHandle.type").TabHandleContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../../..").Module, import("../../../../../..").Module>>;
export declare class TabHandleModule extends TabHandleModule_base implements TabHandle {
    protected settingsConditions: SettingsConditions;
    /** @override */
    protected onInit(fromReload: boolean): Promise<void>;
    /** @override*/
    setIndex(index: number): Promise<void>;
    /** @override*/
    setInitialData(data: TabHandleData): Promise<void>;
    /** @override */
    setEditMode(edit: boolean): Promise<void>;
    /** @override */
    setDropMode(drop: boolean): Promise<void>;
    /** @override*/
    setSelected(selected: boolean): Promise<void>;
    /** @override*/
    remove(): Promise<void>;
    /**
     * Selects this tab in the tabs manager
     */
    select(): Promise<void>;
    /**
     * Starts moving the locations elsewhere
     */
    onDragStart(): Promise<void>;
    /**
     * Moves the locations when the drag ends
     */
    onDragEnd(): Promise<void>;
}
export default TabHandleModule;
declare const TabHandleView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof TabHandleModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../../..").ModuleView, import("../../../../../..").ModuleView<{}, {}, import("../../../../../..").Module, {}>>>;
export declare class TabHandleView extends TabHandleView_base {
    /**
     * Starts the dragging of a location
     * @param event The DOM event that starts the dragging
     */
    protected onDragStart(event: ReactDragEvent): void;
    /**
     * Updates the locations when draging a location finishes
     * @param event The DOM event of the user dragging data
     */
    protected onDragEnd(event: DragEvent): void;
    renderLoader(): JSX.Element;
    /** @override */
    renderView(): JSX.Element;
}
