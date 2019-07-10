/// <reference types="react" />
import { ModuleReference } from "@adjust/core";
import { LocationAncestor } from "../locationAncestor.type";
import LocationAncestorModule from "../locationAncestor";
import { LocationPath } from "../../_types/LocationPath";
export declare const config: {
    initialState: {
        childLocationAncestor: LocationAncestor;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("../locationAncestor.type").LocationAncestorContract>;
};
declare const WindowModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        childLocationAncestor: LocationAncestor;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("../locationAncestor.type").LocationAncestorContract>;
}, typeof LocationAncestorModule>;
export default class WindowModule extends WindowModule_base implements LocationAncestor {
    protected ancestorName: string;
    /** @override */
    onInit(): void;
    /** @override */
    onReloadInit(): void;
    /** @override */
    openModule(module: ModuleReference, location: LocationPath): Promise<LocationPath>;
    /** @override */
    closeModule(module: ModuleReference, location: LocationPath): Promise<boolean>;
}
declare const WindowView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof WindowModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig, import("@adjust/core/types").ModuleInterface>>>>;
export declare class WindowView extends WindowView_base {
    /**
     * Renders the header with the window's controls
     */
    protected renderHeader(): JSX.Element;
    /**@override */
    protected renderView(): JSX.Element;
}
export {};
