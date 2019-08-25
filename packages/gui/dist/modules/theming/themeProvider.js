Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const React_1 = require("../../React");
const moduleClassCreator_1 = require("../../module/moduleClassCreator");
const themer_type_1 = require("./themer.type");
exports.themeProviderConfig = moduleClassCreator_1.createConfig({
    state: {
        themer: null,
    },
    getPriority: () => 1,
    settings: {},
    type: core_1.ContextProviderType,
});
/**
 * A module to put the themer's context into the component tree
 */
class ThemeProviderModule extends moduleClassCreator_1.createModule(exports.themeProviderConfig, core_1.ContextProviderModule) {
    /** @override */
    async onInit(fromReload) {
        await super.onInit(fromReload);
        if (!fromReload)
            this.changeState({ themer: await this.request({ type: themer_type_1.ThemerType }) });
    }
    /** @override */
    async onThemeUpdate(field) {
        // Nothing really hass to happen when the theme changes
    }
}
exports.ThemeProviderModule = ThemeProviderModule;
exports.default = ThemeProviderModule;
class ThemeProviderView extends core_1.createModuleView(ThemeProviderModule, {}, core_1.ContextProviderView) {
    /** @override */
    renderProvider(children) {
        if (this.state.themer)
            return React_1.React.createElement(core_1.ViewWrapper, { view: this.state.themer }, children);
        return children;
    }
}
exports.ThemeProviderView = ThemeProviderView;
//# sourceMappingURL=themeProvider.js.map