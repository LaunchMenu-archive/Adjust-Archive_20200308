var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const viewNotFound_type_1 = require("./viewNotFound.type");
const moduleViewClassCreator_1 = require("../module/moduleViewClassCreator");
const moduleClassCreator_1 = require("../module/moduleClassCreator");
const registry_1 = require("../registry/registry");
const instanceModuleProvider_1 = require("../registry/moduleProviders/instanceModuleProvider");
exports.config = {
    initialState: {},
    getPriority: () => 1,
    settings: {},
    type: viewNotFound_type_1.ViewNotFoundID,
};
/**
 * This module is automatically added by the window manager to ensure some ViewNotFound module exists
 */
class ViewNotFoundModule extends moduleClassCreator_1.createModule(exports.config) {
    /** @override */
    async onInit() {
        registry_1.Registry.addProvider(new instanceModuleProvider_1.InstanceModuleProvider(viewNotFound_type_1.ViewNotFoundID, this, () => 2));
    }
    /** @override */
    async onReloadInit() {
        registry_1.Registry.addProvider(new instanceModuleProvider_1.InstanceModuleProvider(viewNotFound_type_1.ViewNotFoundID, this, () => 2));
    }
}
exports.default = ViewNotFoundModule;
/**
 * A reference to ViewNotFoundModule is hardcoded into moduleView's props,
 * such that `target` is only available to views of classes that extend ViewNotFoundModule.
 * So be sure to extend this class if you are implementing the ViewNotFound contract in order to get proper intellisense
 */
class ViewNotFoundView extends moduleViewClassCreator_1.createModuleView(ViewNotFoundModule) {
    renderView() {
        // `this.props.target` may be used to get info about the target to display,
        // but it may be absent if someone misuses this module (manually requesting it)
        if (!this.props.target)
            return react_1.default.createElement("span", null, "No view could be found for this module");
        return react_1.default.createElement("span", null,
            this.props.target.cls.getPath(),
            " didn't provide a view");
    }
}
exports.ViewNotFoundView = ViewNotFoundView;
ViewNotFoundModule.setViewClass(ViewNotFoundView);
//# sourceMappingURL=viewNotFound.js.map