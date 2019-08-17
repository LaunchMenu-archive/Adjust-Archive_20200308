import { CSSProperties } from "react";
import { ITheme } from "../_types/ITheme";
import { IThemeData } from "../themeSettings";
import { DeepPartial } from "@adjust/core/types";
import { ITheme as FabricITheme } from "@uifabric/styling";
export declare class Theme implements ITheme {
    protected palette: IThemeData["palette"];
    protected customPalette: IThemeData["customPalette"];
    protected icons: IThemeData["icons"];
    protected spacing: IThemeData["spacing"];
    protected fontStyles: IThemeData["fontStyles"];
    protected shadows: IThemeData["shadows"];
    protected superThemes: Theme[];
    /**
     * Creates a theme object based on json data
     * @param theme The data to create the theme from
     * @param superThemes The themes that this theme got extended from
     */
    constructor(theme: IThemeData, superThemes?: Theme[]);
    /** @override */
    getColor(colorName: keyof IThemeData["palette"] | keyof IThemeData["customPalette"]): string;
    /** @override */
    getIcon(icon: string): React.ComponentClass | React.FunctionComponent;
    /** @override */
    getSpacing(spacingName: keyof IThemeData["spacing"]): string | number;
    /** @override */
    getFontStyle(styleName: keyof IThemeData["fontStyles"]): CSSProperties;
    /** @override */
    getShadow(shadowName: keyof IThemeData["shadows"]): string;
    /** @override */
    extendTheme(data: DeepPartial<IThemeData>): ITheme;
    /** @override */
    getSuperThemeCount(): number;
    /** @override */
    getSuperTheme(index: number): ITheme;
    /** @override */
    getFabricUItheme(): FabricITheme;
    /** @override */
    getFabricUIicons(): any;
}
