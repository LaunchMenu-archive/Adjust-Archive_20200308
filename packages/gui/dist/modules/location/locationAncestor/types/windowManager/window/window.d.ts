/// <reference types="react" />
import { ModuleReference, Module } from "@adjust/core";
import { LocationAncestor } from "../../../locationAncestor.type";
import LocationAncestorModule from "../../../locationAncestor";
import { LocationPath } from "../../../../_types/LocationPath";
import { ModuleLocation } from "../../../../../../module/_types/ModuleLocation";
import { Window } from "./window.type";
import { SettingInputContract } from "@adjust/core/types";
export declare const windowConfig: {
    state: {
        childLocationAncestor: Promise<import("@adjust/core/types").ChildModule<{
            openModule(module: ModuleReference, locationPath: LocationPath): Promise<LocationPath>;
            closeModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
            showModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
            createLocation(location: ModuleLocation): Promise<LocationPath>;
            removeLocation(locationPath: LocationPath): Promise<boolean>;
            removeAncestor(): Promise<void>;
            setEditMode(edit: boolean): Promise<void>;
            setDropMode(drop: boolean): Promise<void>;
        }>>;
        windowName: string;
    };
    settings: {
        width: {
            type: import("@adjust/core/types").ContractID<SettingInputContract<number, {
                min?: number;
                max?: number;
                rounding?: number;
            }>>;
        } & {
            default: number;
        };
        height: {
            type: import("@adjust/core/types").ContractID<SettingInputContract<number, {
                min?: number;
                max?: number;
                rounding?: number;
            }>>;
        } & {
            default: number;
        };
        x: {
            type: import("@adjust/core/types").ContractID<SettingInputContract<number, {
                min?: number;
                max?: number;
                rounding?: number;
            }>>;
        } & {
            default: number;
        };
        y: {
            type: import("@adjust/core/types").ContractID<SettingInputContract<number, {
                min?: number;
                max?: number;
                rounding?: number;
            }>>;
        } & {
            default: number;
        };
    };
    onLoad: (moduleClass: typeof Module) => void;
    type: import("@adjust/core/types").ContractID<import("./window.type").WindowContract>;
};
declare const WindowModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        childLocationAncestor: Promise<import("@adjust/core/types").ChildModule<{
            openModule(module: ModuleReference, locationPath: LocationPath): Promise<LocationPath>;
            closeModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
            showModule(module: ModuleReference, locationPath: LocationPath): Promise<boolean>;
            createLocation(location: ModuleLocation): Promise<LocationPath>;
            removeLocation(locationPath: LocationPath): Promise<boolean>;
            removeAncestor(): Promise<void>;
            setEditMode(edit: boolean): Promise<void>;
            setDropMode(drop: boolean): Promise<void>;
        }>>;
        windowName: string;
    };
    settings: {
        width: {
            type: import("@adjust/core/types").ContractID<SettingInputContract<number, {
                min?: number;
                max?: number;
                rounding?: number;
            }>>;
        } & {
            default: number;
        };
        height: {
            type: import("@adjust/core/types").ContractID<SettingInputContract<number, {
                min?: number;
                max?: number;
                rounding?: number;
            }>>;
        } & {
            default: number;
        };
        x: {
            type: import("@adjust/core/types").ContractID<SettingInputContract<number, {
                min?: number;
                max?: number;
                rounding?: number;
            }>>;
        } & {
            default: number;
        };
        y: {
            type: import("@adjust/core/types").ContractID<SettingInputContract<number, {
                min?: number;
                max?: number;
                rounding?: number;
            }>>;
        } & {
            default: number;
        };
    };
    onLoad: (moduleClass: typeof Module) => void;
    type: import("@adjust/core/types").ContractID<import("./window.type").WindowContract>;
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
    onInit(): Promise<void>;
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
declare const WindowView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof WindowModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../../..").ModuleView, import("../../../../../..").ModuleView<{}, {}, import("../../../../../..").Module, {}>>>;
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
