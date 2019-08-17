Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const React_1 = require("../React");
const themeExtender_1 = require("../modules/theming/themeExtender");
const core_2 = require("@emotion/core");
/**
 * A class that can visually represent the module
 */
class ModuleView extends core_1.ModuleView {
    /**
     * Renders the element the regular way, but adds a classname to apply the setting's css
     * @returns The jsx element
     */
    renderWithSettingsCss() {
        const styleOverride = this.settings.styleOverride;
        const el = super.render();
        // TODO: allow for theme props
        return (React_1.React.createElement(core_2.ClassNames, null, ({ css, cx }) => React_1.React.cloneElement(el, {
            className: (el.props.className ? el.props.className : "") +
                " " +
                css(styleOverride.css),
        })));
    }
    /**
     * @override The normal react render method
     */
    render() {
        // Render the loader while the state is not loaded
        if (Object.keys(this.state).length == 0)
            return this.renderLoader();
        // Otherwise call the usual render after setting the theme
        const styleOverride = this.settings.styleOverride;
        return (React_1.React.createElement(themeExtender_1.ThemeExtender, { themeChanges: styleOverride.theme, resetTheme: styleOverride.resetTheme }, theme => {
            this.theme = theme;
            if (styleOverride.css)
                return this.renderWithSettingsCss();
            return super.render();
        }));
    }
}
exports.ModuleView = ModuleView;
//# sourceMappingURL=moduleView.js.map