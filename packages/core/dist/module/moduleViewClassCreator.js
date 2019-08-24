Object.defineProperty(exports, "__esModule", { value: true });
const extendedObject_1 = require("../utils/extendedObject");
const moduleView_1 = require("./moduleView");
class ModuleViewClassCreator {
    /**
     * Creates a new class extending the passed class, with a dynamic name
     * @param name The name for the class
     * @param cls The class to extend
     */
    static createNamedClass(name, cls) {
        return new Function("cls", `return class ${name} extends cls {}`)(cls);
    }
    /**
     * A function to create a new module view class
     * @param module The module class to create the view for
     * @param state The initial state to augment the module state with
     * @param moduleView The module view class to extend
     */
    static createModuleView(module, state, moduleView) {
        // Set the initialState to the default state if not specified
        if (!state)
            state = {};
        // Set the module view class to the default module if not specified
        if (!moduleView)
            moduleView = moduleView_1.ModuleView;
        // Create the class
        const cls = this.createNamedClass(moduleView.name, moduleView);
        // Get the initial state of the super class
        const superState = moduleView.state;
        // Combine the settings of both configs, giving priority to the new config
        const combinedStates = extendedObject_1.ExtendedObject.copyData(superState, {});
        extendedObject_1.ExtendedObject.copyData(state, combinedStates);
        // Assign the combined initialState to the class
        cls.state = combinedStates;
        // Return the created class
        return cls;
    }
}
exports.ModuleViewClassCreator = ModuleViewClassCreator;
/**
 * A shortcut for the module view creation method
 */
exports.createModuleView = ModuleViewClassCreator.createModuleView.bind(ModuleViewClassCreator);
//# sourceMappingURL=moduleViewClassCreator.js.map