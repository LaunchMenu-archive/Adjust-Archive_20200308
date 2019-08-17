Object.defineProperty(exports, "__esModule", { value: true });
const getIcon_1 = require("./getIcon");
const React_1 = require("../../../React");
const core_1 = require("@adjust/core");
const styling_1 = require("@uifabric/styling");
class Theme {
    /**
     * Creates a theme object based on json data
     * @param theme The data to create the theme from
     * @param superThemes The themes that this theme got extended from
     */
    constructor(theme, superThemes = []) {
        this.palette = theme.palette;
        this.customPalette = theme.customPalette;
        this.icons = theme.icons;
        this.spacing = theme.spacing;
        this.fontStyles = theme.fontStyles;
        this.shadows = theme.shadows;
        this.superThemes = superThemes;
    }
    /** @override */
    getColor(colorName) {
        for (var i = 0; i < 100; i++) {
            if (this.palette[colorName])
                colorName = this.palette[colorName];
            else if (this.customPalette[colorName])
                colorName = this.customPalette[colorName];
            else
                return i == 0 ? undefined : colorName;
        }
    }
    /** @override */
    getIcon(icon) {
        return getIcon_1.getIcon(icon);
    }
    /** @override */
    getSpacing(spacingName) {
        for (var i = 0; i < 100; i++) {
            if (this.spacing[spacingName])
                spacingName = this.spacing[spacingName];
            else
                return i == 0 ? undefined : spacingName;
        }
    }
    /** @override */
    getFontStyle(styleName) {
        for (var i = 0; i < 100; i++) {
            if (this.fontStyles[styleName])
                styleName = this.fontStyles[styleName];
            else
                return i == 0 ? undefined : styleName;
        }
    }
    /** @override */
    getShadow(shadowName) {
        for (var i = 0; i < 100; i++) {
            if (this.shadows[shadowName])
                shadowName = this.shadows[shadowName];
            else
                return i == 0 ? undefined : shadowName;
        }
    }
    // Augmentation methods
    /** @override */
    extendTheme(data) {
        return new Theme({
            palette: Object.assign({}, this.palette, data.palette),
            customPalette: Object.assign({}, this.customPalette, data.customPalette),
            icons: Object.assign({}, this.icons, data.icons),
            spacing: Object.assign({}, this.spacing, data.spacing),
            fontStyles: core_1.ExtendedObject.copyData(data.fontStyles, core_1.ExtendedObject.copyData(this.fontStyles, {})),
            shadows: Object.assign({}, this.shadows, data.shadows),
        }, [...this.superThemes, this]);
    }
    /** @override */
    getSuperThemeCount() {
        return this.superThemes.length;
    }
    /** @override */
    getSuperTheme(index) {
        const count = this.getSuperThemeCount();
        index = ((index % count) + count) % count;
        return this.superThemes[index];
    }
    // Office ui fabric compatibility methods
    /** @override */
    getFabricUItheme() {
        return styling_1.createTheme({
            defaultFontStyle: this.getFontStyle("medium"),
            palette: this.palette,
            fonts: this.fontStyles,
            spacing: {
                s2: this.spacing.xs,
                s1: this.spacing.s,
                m: this.spacing.m,
                l1: this.spacing.l,
                l2: this.spacing.xl,
            },
            effects: {
                elevation4: this.shadows.tiny,
                elevation8: this.shadows.small,
                elevation16: this.shadows.medium,
                elevation64: this.shadows.large,
            },
        });
    }
    /** @override */
    getFabricUIicons() {
        return {
            icons: core_1.ExtendedObject.map(this.icons, value => React_1.React.createElement(this.getIcon(value))),
        };
    }
}
exports.Theme = Theme;
//# sourceMappingURL=theme.js.map