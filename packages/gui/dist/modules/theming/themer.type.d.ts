/// <reference path="../../React.d.ts" />
import { ChildModule, ParentModule } from "@adjust/core/types";
import { ITheme } from "./_types/ITheme";
import { IBoxComponent } from "./_types/IBoxComponent";
import { IThemeData } from "./themeSettings";
import { CSSProperties } from "react";
/**
 * A module used to provide consistent theming throughout the application
 */
export declare type Themer = ChildModule<{
    /**
     * Retrieves a string color from the theme
     * @param colorName The name of the color to retrieve
     * @returns The color from the theme
     */
    getColor(colorName: keyof IThemeData["palette"] | keyof IThemeData["customPalette"]): Promise<string>;
    /**
     * Retrieves a string spacing from the theme
     * @param spacingName The name of the spacing value to retrieve
     * @returns The spacing from the theme
     */
    getSpacing(spacingName: keyof IThemeData["spacing"]): Promise<string | number>;
    /**
     * Retrieves a string font from the theme
     * @param style The name of the font value to retrieve
     * @returns The font from the theme
     */
    getFontStyle(styleName: keyof IThemeData["fontStyles"]): Promise<CSSProperties>;
    /**
     * Retrieves a string shadow from the theme
     * @param shadowName The name of the shadow value to retrieve
     * @returns The shadow from the theme
     */
    getShadow(shadowName: keyof IThemeData["shadows"]): Promise<string>;
}>;
export declare type ThemerParent = ParentModule<{
    /**
     * A callback to indicate when the theme has been altered
     * @param field The field of the theme that has been altered
     */
    onThemeUpdate(field: string): Promise<void>;
}>;
export declare type ThemerContract = {
    parent: ThemerParent;
    child: Themer;
};
export declare const ThemerType: import("@adjust/core/types").ContractID<ThemerContract>;
/**
 * A context to expose the styled box element, and the theme that it should use
 */
export declare const ThemeContext: import("react").Context<{
    theme: ITheme;
    Box: IBoxComponent;
}>;
/**
 * Retrieves the theme
 */
export declare const useTheme: () => ITheme;
