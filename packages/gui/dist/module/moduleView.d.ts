/// <reference types="react" />
import { ModuleView as CoreModuleView } from "@adjust/core";
import { ModuleState, SettingsConfigSet } from "@adjust/core/types";
import { Module } from "./module";
import { ITheme } from "../modules/theming/_types/ITheme";
/**
 * A class that can visually represent the module
 */
export declare abstract class ModuleView<S extends ModuleState, C extends SettingsConfigSet, M extends Module, D extends any> extends CoreModuleView<S, C, M, D> {
    protected theme: ITheme;
    /**
     * Renders the element the regular way, but adds a classname to apply the setting's css
     * @returns The jsx element
     */
    protected renderWithSettingsCss(): JSX.Element;
    /**
     * @override The normal react render method
     */
    render(): JSX.Element;
}
