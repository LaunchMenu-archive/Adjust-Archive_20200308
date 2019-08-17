Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const moduleView_1 = require("./moduleView");
// Specify that the default module to be used is our extend module
class ModuleViewClassCreator extends core_1.ModuleViewClassCreator {
    /** @override */
    static createModuleView(module, initialState, moduleView) {
        // Set the module view class to the default module if not specified
        if (!moduleView)
            moduleView = moduleView_1.ModuleView;
        // Call the method as per usual
        return super.createModuleView(module, initialState, moduleView);
    }
}
exports.ModuleViewClassCreator = ModuleViewClassCreator;
/**
 * A shortcut for the module view creation method
 */
exports.createModuleView = ModuleViewClassCreator.createModuleView.bind(ModuleViewClassCreator);
//# sourceMappingURL=moduleViewClassCreator.js.map