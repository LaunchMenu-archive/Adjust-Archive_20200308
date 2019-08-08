/// <reference types="react" />
import { ModuleReference } from "@adjust/core";
import { LocationAncestor } from "../../../locationAncestor.type";
import LocationAncestorModule from "../../../locationAncestor";
import { LocationPath } from "../../../../_types/LocationPath";
import { ModuleLocation } from "../../../../../../module/_types/ModuleLocation";
import { Window } from "./window.type";
export declare const config: {
    initialState: {
        childLocationAncestor: Promise<LocationAncestor>;
        windowName: string;
    };
    settings: {
        width: {
            default: number;
            type: string;
        };
        height: {
            default: number;
            type: string;
        };
        x: {
            default: number;
            type: string;
        };
        y: {
            default: number;
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./window.type").WindowContract>;
};
declare const WindowModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        childLocationAncestor: Promise<LocationAncestor>;
        windowName: string;
    };
    settings: {
        width: {
            default: number;
            type: string;
        };
        height: {
            default: number;
            type: string;
        };
        x: {
            default: number;
            type: string;
        };
        y: {
            default: number;
            type: string;
        };
    };
    type: import("@adjust/core/types").InterfaceID<import("./window.type").WindowContract>;
}, typeof LocationAncestorModule>;
/**
 * type "Window" accepts location hints:
 * - width: Number (The initial width that the window should have)
 * - height: Number (The initial height that the window should have)
 * - x: Number (The initial x coordinate that the window should have)
 * - y: Number (The initial y coordinate that the window should have)
 */
export default class WindowModule extends WindowModule_base implements Window {
    protected ancestorName: string;
    protected window: Promise<Electron.BrowserWindow>;
    /** @override */
    onInit(fromReload: boolean): Promise<void>;
    /**
     * Opens the window that this module instance represents
     * @returns The opened or retrieved window, or undefined
     */
    protected openWindow(): Promise<Electron.BrowserWindow>;
    /**
     * Closes the window if it had been opened already
     */
    closeWindow(): Promise<void>;
    /** @override */
    protected onStop(): Promise<void>;
    /** @override */
    protected static onFileLoad(isMain: boolean, modulePath: string): void;
    /** @override */
    createLocation(location: ModuleLocation): Promise<LocationPath>;
    /** @override */
    removeLocation(locationPath: LocationPath): Promise<boolean>;
    /** @override */
    removeAncestor(): Promise<void>;
    /**
     * Opens the child location ancestor and returns it
     * @param create Whether or not to create the child if abscent
     * @returns The child location ancestor
     */
    protected getChild(create?: boolean): Promise<LocationAncestor>;
    /**
     * closes the child location ancestor if opened
     */
    protected closeChild(): Promise<void>;
    /** @override */
    openModule(module: ModuleReference, locationPath: LocationPath): Promise<LocationPath>;
    /** @override */
    closeModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
    /** @override */
    showModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
    /** @override */
    setEditMode(edit: boolean): Promise<void>;
    /** @override */
    setDropMode(drop: boolean): Promise<void>;
    /** @override */
    setName(name: string): Promise<void>;
    /**
     * Saves the size of the window
     * @param width The width that the window now has
     * @param height The height that the window now has
     */
    saveWindowSize(width: number, height: number): void;
    /**
     * Saves the location of the window
     * @param x The x coordinate of the location
     * @param y The y coordinate of the location
     */
    saveWindowLocation(x: number, y: number): void;
    setEdit(edit: boolean): Promise<void>;
    saveSettings(): Promise<void>;
}
declare const WindowView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof WindowModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig<any>, import("@adjust/core/types").ModuleInterface>, {}>>>;
export declare class WindowView extends WindowView_base {
    /**@override */
    componentWillMount(): void;
    /**
     * Renders the header with the window's controls
     */
    protected renderHeader(): JSX.Element;
    /**@override */
    protected renderView(): JSX.Element;
}
export {};
