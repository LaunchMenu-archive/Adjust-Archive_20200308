var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mdIcons = __importStar(require("react-icons/md"));
const core_1 = require("@emotion/core");
class Theme {
    /**
     * Creates a theme object based on json data
     * @param theme The data to create the theme from
     */
    constructor(theme) {
        this.colors = theme.colors;
        this.colorAliases = theme.colorAliases;
        this.spacing = theme.spacing;
        this.fontSize = theme.fontSize;
        this.iconGetters = {};
        Object.entries(theme.icons).forEach(([name, icon]) => (this.iconGetters[name] = this.getIconRetriever(icon)));
    }
    /**
     * Retrieves a getter method for an icon
     * @param icon The icon to normalize to a getter
     * @returns A getter method for the icon
     */
    getIconRetriever(icon) {
        if (typeof icon == "string") {
            let match;
            if ((match = icon.match(/(react-icons\/md)\/(.*)/))) {
                return () => core_1.jsx(mdIcons[match[2]]);
            }
            return () => undefined;
        }
        else if (typeof icon == "function") {
            return icon;
        }
        else {
            return () => icon;
        }
    }
    /**
     * Retrieves a string color from the theme, or returns the argument if absent
     * @param colorName The name of the color to retrieve
     * @returns The color from the theme, or the argument
     */
    getColor(colorName) {
        if (this.colors[colorName])
            return this.colors[colorName];
        if (this.colorAliases[colorName])
            return this.colors[this.colorAliases[colorName]] || colorName;
        return colorName;
    }
    /**
     * Retrieves a string spacing from the theme, or returns the argument if absent
     * @param spacingName The name of the spacing value to retrieve
     * @returns The spacing from the theme, or the argument
     */
    getSpacing(spacingName) {
        return this.spacing[spacingName] || spacingName;
    }
    /**
     * Retrieves a string font size from the theme, or returns the argument if absent
     * @param sizeName The name of the font size value to retrieve
     * @returns The font size from the theme, or the argument
     */
    getFontSize(sizeName) {
        return this.fontSize[sizeName] || sizeName;
    }
    /**
     * Retrieves a string shadow from the theme, or returns the argument if absent
     * @param shadowName The name of the shadow value to retrieve
     * @returns The shadow from the theme, or the argument
     */
    getShadow(shadowName) {
        return this.shadows[shadowName] || shadowName;
    }
    /**
     * Retrieves an icon from the theme
     * @param icon The name of the icon to retrieve
     * @returns The JSX icon element
     */
    getIcon(icon) {
        return (this.iconGetters[icon] || (() => undefined))();
    }
    /**
     * Retrieves this theme as formatted for usage by fabric UI
     * @returns The fabric UI theme
     */
    getFabricUItheme() {
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
    getFabricUIicons() {
        const icons = {};
        Object.entries(this.iconGetters).forEach(([key, value]) => (icons[key] = value()));
        return {
            icons,
        };
    }
    /**
     * Retrieves this theme as formatted for usage by emotion
     @returns The emotion theme
     */
    getEmotionTheme() {
        return {
            colors: this.colors,
        };
    }
}
exports.Theme = Theme;
//# sourceMappingURL=theme.js.map