import {IThemeData} from "../themeSettings";
import {CSSProperties} from "react";
import {DeepPartial} from "@adjust/core/types";
import {ITheme as FabricITheme} from "@uifabric/styling";

export type ITheme = {
    /**
     * Retrieves a string color from the theme
     * @param colorName The name of the color to retrieve
     * @returns The color from the theme
     */
    getColor(
        colorName: keyof IThemeData["palette"] | keyof IThemeData["customPalette"]
    ): string;

    /**
     * Retrieves an icon from the theme
     * @param icon The name of the icon to retrieve
     * @returns The JSX icon element
     */
    getIcon(
        icon: keyof IThemeData["icons"]
    ): React.ComponentClass | React.FunctionComponent;

    /**
     * Retrieves a string spacing from the theme
     * @param spacingName The name of the spacing value to retrieve
     * @returns The spacing from the theme
     */
    getSpacing(spacingName: keyof IThemeData["spacing"]): string | number;

    /**
     * Retrieves a string font from the theme
     * @param style The name of the font value to retrieve
     * @returns The font from the theme
     */
    getFontStyle(styleName: keyof IThemeData["fontStyles"]): CSSProperties;

    /**
     * Retrieves a string shadow from the theme
     * @param shadowName The name of the shadow value to retrieve
     * @returns The shadow from the theme
     */
    getShadow(shadowName: keyof IThemeData["shadows"]): string;

    // Augmentation methods
    /**
     * Creates a new instance of the theme, with passed data overridng the current
     * @param data The properties to override
     * @returns The extended theme
     */
    extendTheme(data: DeepPartial<IThemeData>): ITheme;

    /**
     * Retrieves a theme that this theme got extended from
     * @param index The nth theme from the root to this node, accepts negative index to be offset from the last
     * @returns A theme that this theme got extended from
     */
    getSuperTheme(index: number): ITheme;

    /**
     * Retrieves the number of themes that this theme got extended from
     * @returns The number of super themes
     */
    getSuperThemeCount(): number;

    // Office ui fabric compatibility methods
    /**
     * Retrieves this theme as formatted for usage by fabric UI
     * @returns The fabric UI theme
     */
    getFabricUItheme(): FabricITheme;

    /**
     * Retrieves the icons of this theme as formatted for usage by fabric UI
     * @returns The fabric UI icons
     */
    getFabricUIicons(): any;
};
