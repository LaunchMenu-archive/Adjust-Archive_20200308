Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const React_1 = require("../../../React");
const themer_type_1 = require("../themer.type");
const themeSettings_1 = require("../themeSettings");
const theme_1 = require("./theme");
const emotion_theming_1 = require("emotion-theming");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const box_1 = require("./box");
const moduleClassCreator_1 = require("../../../module/moduleClassCreator");
const core_2 = require("@emotion/core");
exports.themerConfig = moduleClassCreator_1.createConfig({
    state: {},
    getPriority: () => 1,
    settings: themeSettings_1.themeSettings,
    type: themer_type_1.ThemerType,
});
/**
 * A module of this type is used as the root of the module
 */
class ThemerModule extends moduleClassCreator_1.createModule(exports.themerConfig) {
    /** @override */
    async onPreInit() {
        core_1.Registry.addProvider(new core_1.InstanceModuleProvider(themer_type_1.ThemerType, this, () => 2));
    }
    /** @override */
    async onInit(fromReload) {
        this.getSettingsObject().on("change", field => this.updateTheme(field));
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
        office_ui_fabric_react_1.registerIcons(icons);
        return (React_1.React.createElement(React_1.React.Fragment, null,
            React_1.React.createElement(core_2.Global, { styles: {
                    body: theme.getFontStyle("medium"),
                    "::-webkit-scrollbar": {
                        width: theme.getSpacing("s"),
                    },
                    "::-webkit-scrollbar-track": {
                        background: theme.getColor("neutralLight"),
                        WebkitBoxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)",
                    },
                    "::-webkit-scrollbar-thumb": {
                        background: theme.getColor("neutralDark"),
                        WebkitBoxShadow: "inset 1px 1px 2px rgba(0,0,0,0.2)",
                    },
                    "::-webkit-scrollbar-thumb:hover": {
                        background: theme.getColor("themePrimary"),
                    },
                    "::-webkit-scrollbar-thumb:active": {
                        background: theme.getColor("themePrimary"),
                        WebkitBoxShadow: "inset 1px 1px 2px rgba(0,0,0,0.3)",
                    },
                } }),
            React_1.React.createElement(themer_type_1.ThemeContext.Provider, { value: { theme, Box: box_1.Box } },
                React_1.React.createElement(emotion_theming_1.ThemeProvider, { theme: () => theme },
                    React_1.React.createElement(office_ui_fabric_react_1.Customizer, { settings: { theme: fabricTheme } }, this.props.children)))));
    }
}
exports.ThemerView = ThemerView;
//# sourceMappingURL=themer.js.map