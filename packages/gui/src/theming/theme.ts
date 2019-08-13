import {
    ThemeData,
    ThemeFontSize,
    ThemeSpacing,
    ThemeColors,
    ThemeShadows,
} from "./_types/themeData";
import * as mdIcons from "react-icons/md";
import {jsx} from "@emotion/core";

export class Theme {
    protected colors: ThemeColors;
    protected colorAliases: {[name: string]: string};
    protected iconGetters: {[name: string]: () => JSX.Element};
    protected spacing: ThemeSpacing;
    protected fontSize: ThemeFontSize;
    protected shadows: ThemeShadows;

    /**
     * Creates a theme object based on json data
     * @param theme The data to create the theme from
     */
    constructor(theme: ThemeData) {
        this.colors = theme.colors;
        this.colorAliases = theme.colorAliases;
        this.spacing = theme.spacing;
        this.fontSize = theme.fontSize;

        this.iconGetters = {};
        Object.entries(theme.icons).forEach(
            ([name, icon]) => (this.iconGetters[name] = this.getIconRetriever(icon))
        );
    }

    /**
     * Retrieves a getter method for an icon
     * @param icon The icon to normalize to a getter
     * @returns A getter method for the icon
     */
    protected getIconRetriever(
        icon: string | JSX.Element | (() => JSX.Element)
    ): () => JSX.Element {
        if (typeof icon == "string") {
            let match;
            if ((match = icon.match(/(react-icons\/md)\/(.*)/))) {
                return () => jsx(mdIcons[match[2]]);
            }

            return () => undefined;
        } else if (typeof icon == "function") {
            return icon;
        } else {
            return () => icon;
        }
    }

    /**
     * Retrieves a string color from the theme, or returns the argument if absent
     * @param colorName The name of the color to retrieve
     * @returns The color from the theme, or the argument
     */
    public getColor(colorName: string): string {
        if (this.colors[colorName]) return this.colors[colorName];
        if (this.colorAliases[colorName])
            return this.colors[this.colorAliases[colorName]] || colorName;
        return colorName;
    }

    /**
     * Retrieves a string spacing from the theme, or returns the argument if absent
     * @param spacingName The name of the spacing value to retrieve
     * @returns The spacing from the theme, or the argument
     */
    public getSpacing(spacingName: string | number): string {
        return this.spacing[spacingName] || spacingName;
    }

    /**
     * Retrieves a string font size from the theme, or returns the argument if absent
     * @param sizeName The name of the font size value to retrieve
     * @returns The font size from the theme, or the argument
     */
    public getFontSize(sizeName: string | number): string {
        return this.fontSize[sizeName] || sizeName;
    }

    /**
     * Retrieves a string shadow from the theme, or returns the argument if absent
     * @param shadowName The name of the shadow value to retrieve
     * @returns The shadow from the theme, or the argument
     */
    public getShadow(shadowName: string): string {
        return this.shadows[shadowName] || shadowName;
    }

    /**
     * Retrieves an icon from the theme
     * @param icon The name of the icon to retrieve
     * @returns The JSX icon element
     */
    public getIcon(icon: string): JSX.Element {
        return (this.iconGetters[icon] || (() => undefined))();
    }

    /**
     * Retrieves this theme as formatted for usage by fabric UI
     * @returns The fabric UI theme
     */
    public getFabricUItheme(): any {
        return {
            defaultFontStyle: {
                fontFamily: "Segoe UI, Monaco, Menlo, Consolas",
                fontWeight: "regular",
            },
            palette: this.colors,
        };
    }

    /**
     * Retrieves the icons of this theme as formatted for usage by fabric UI
     * @returns The fabric UI icons
     */
    public getFabricUIicons(): any {
        const icons = {};
        Object.entries(this.iconGetters).forEach(
            ([key, value]) => (icons[key] = value())
        );
        return {
            icons,
        };
    }

    /**
     * Retrieves this theme as formatted for usage by emotion
     @returns The emotion theme
     */
    public getEmotionTheme(): any {
        return {
            colors: this.colors,
        };
    }
}
