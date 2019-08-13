/// <reference types="react" />
import { ThemeData, ThemeFontSize, ThemeSpacing, ThemeColors, ThemeShadows } from "./_types/themeData";
export declare class Theme {
    protected colors: ThemeColors;
    protected colorAliases: {
        [name: string]: string;
    };
    protected iconGetters: {
        [name: string]: () => JSX.Element;
    };
    protected spacing: ThemeSpacing;
    protected fontSize: ThemeFontSize;
    protected shadows: ThemeShadows;
    /**
     * Creates a theme object based on json data
     * @param theme The data to create the theme from
     */
    constructor(theme: ThemeData);
    /**
     * Retrieves a getter method for an icon
     * @param icon The icon to normalize to a getter
     * @returns A getter method for the icon
     */
    protected getIconRetriever(icon: string | JSX.Element | (() => JSX.Element)): () => JSX.Element;
    /**
     * Retrieves a string color from the theme, or returns the argument if absent
     * @param colorName The name of the color to retrieve
     * @returns The color from the theme, or the argument
     */
    getColor(colorName: string): string;
    /**
     * Retrieves a string spacing from the theme, or returns the argument if absent
     * @param spacingName The name of the spacing value to retrieve
     * @returns The spacing from the theme, or the argument
     */
    getSpacing(spacingName: string | number): string;
    /**
     * Retrieves a string font size from the theme, or returns the argument if absent
     * @param sizeName The name of the font size value to retrieve
     * @returns The font size from the theme, or the argument
     */
    getFontSize(sizeName: string | number): string;
    /**
     * Retrieves a string shadow from the theme, or returns the argument if absent
     * @param shadowName The name of the shadow value to retrieve
     * @returns The shadow from the theme, or the argument
     */
    getShadow(shadowName: string): string;
    /**
     * Retrieves an icon from the theme
     * @param icon The name of the icon to retrieve
     * @returns The JSX icon element
     */
    getIcon(icon: string): JSX.Element;
    /**
     * Retrieves this theme as formatted for usage by fabric UI
     * @returns The fabric UI theme
     */
    getFabricUItheme(): any;
    /**
     * Retrieves the icons of this theme as formatted for usage by fabric UI
     * @returns The fabric UI icons
     */
    getFabricUIicons(): any;
    /**
     * Retrieves this theme as formatted for usage by emotion
     @returns The emotion theme
     */
    getEmotionTheme(): any;
}
