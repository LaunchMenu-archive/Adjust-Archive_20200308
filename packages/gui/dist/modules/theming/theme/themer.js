Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const React_1 = require("../../../React");
const themer_type_1 = require("../themer.type");
const themeSettings_1 = require("../themeSettings");
const theme_1 = require("./theme");
const emotion_theming_1 = require("emotion-theming");
const lib_commonjs_1 = require("office-ui-fabric-react/lib-commonjs");
const box_1 = require("./box");
exports.themerConfig = {
    initialState: {},
    getPriority: () => 1,
    settings: themeSettings_1.themeSettings,
    type: themer_type_1.ThemerType,
};
/**
 * A module of this type is used as the root of the module
 */
class ThemerModule extends core_1.createModule(exports.themerConfig) {
    /** @override */
    async onInit(fromReload) {
        core_1.Registry.addProvider(new core_1.InstanceModuleProvider(themer_type_1.ThemerType, this, () => 2));
        this.settingsObject.on("change", field => this.updateTheme(field));
    }
    /**
     * Updates the theme object and notifies all the parents
     * @param field The field that has been altered
     */
    updateTheme(field) {
        this.theme = new theme_1.Theme(this.settings);
        this.getParents().forEach(parent => parent.onThemeUpdate(field));
    }
    /** @override */
    async getColor(colorName) {
        return this.theme.getColor(colorName);
    }
    /** @override */
    async getSpacing(spacingName) {
        return this.theme.getSpacing(spacingName);
    }
    /** @override */
    async getFontStyle(styleName) {
        return this.theme.getFontStyle(styleName);
    }
    /** @override */
    async getShadow(shadowName) {
        return this.theme.getShadow(shadowName);
    }
}
exports.ThemerModule = ThemerModule;
exports.default = ThemerModule;
class ThemerView extends core_1.createModuleView(ThemerModule) {
    /** @override  */
    renderView() {
        const theme = new theme_1.Theme(this.settings);
        const fabricTheme = theme.getFabricUItheme();
        const icons = theme.getFabricUIicons();
        lib_commonjs_1.registerIcons(icons);
        return (React_1.React.createElement(themer_type_1.ThemeContext.Provider, { value: { theme, Box: box_1.Box } },
            React_1.React.createElement(emotion_theming_1.ThemeProvider, { theme: () => theme },
                React_1.React.createElement(lib_commonjs_1.Customizer, { settings: { theme: fabricTheme } }, this.props.children))));
    }
}
exports.ThemerView = ThemerView;
//# sourceMappingURL=themer.js.map