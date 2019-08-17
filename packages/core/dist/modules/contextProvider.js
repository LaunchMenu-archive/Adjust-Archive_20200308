var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const moduleViewClassCreator_1 = require("../module/moduleViewClassCreator");
const moduleClassCreator_1 = require("../module/moduleClassCreator");
const registry_1 = require("../registry/registry");
const instanceModuleProvider_1 = require("../registry/moduleProviders/instanceModuleProvider");
const contextProvider_type_1 = require("./contextProvider.type");
const requestFilters_1 = require("../registry/requestFilters");
const moduleViewWrapper_1 = require("../module/moduleViewWrapper");
exports.contextProviderConfig = {
    initialState: {
        childProvider: null,
    },
    getPriority: () => 1,
    settings: {},
    type: contextProvider_type_1.ContextProviderType,
};
/**
 * A module of this type is used as the root of the window to provide contexts
 */
class ContextProviderModule extends moduleClassCreator_1.createModule(exports.contextProviderConfig) {
    /** @override */
    async onInit(fromReload) {
        registry_1.Registry.addProvider(new instanceModuleProvider_1.InstanceModuleProvider(contextProvider_type_1.ContextProviderType, this, () => 2));
        // If this is the creation of the module, create a child
        if (!fromReload)
            this.setState({
                childProvider: (await this.request({
                    type: contextProvider_type_1.ContextProviderType,
                    use: requestFilters_1.createRecursiveRequestFilter(this),
                }))[0],
            });
    }
}
exports.ContextProviderModule = ContextProviderModule;
exports.default = ContextProviderModule;
class ContextProviderView extends moduleViewClassCreator_1.createModuleView(ContextProviderModule) {
    /**
     * Renders the data provider in the component tree
     * @param children The children to put in the provider
     */
    renderProvider(children) {
        // Should be overwritten, this default has no effect
        return children;
    }
    /** @override */
    renderView() {
        let providerChild = this.props.children;
        if (this.state.childProvider)
            providerChild = (react_1.default.createElement(moduleViewWrapper_1.ViewWrapper, { view: this.state.childProvider }, this.props.children));
        return this.renderProvider(providerChild);
    }
}
exports.ContextProviderView = ContextProviderView;
//# sourceMappingURL=contextProvider.js.map