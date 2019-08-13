Object.defineProperty(exports, "__esModule", { value: true });
const classModuleProvider_1 = require("./moduleProviders/classModuleProvider");
function createRecursiveRequestFilter(module) {
    return (providers => {
        // Filter out any non class module providers
        const classProviders = providers.filter(p => p.provider instanceof classModuleProvider_1.ClassModuleProvider);
        // Get the index of this module class
        const thisIndex = classProviders.findIndex(p => p.provider.getModuleClass() == module.getClass());
        // Get the module with the next (lower priority) index
        const provider = classProviders[thisIndex + 1];
        return provider ? [provider.provider] : [];
    });
}
exports.createRecursiveRequestFilter = createRecursiveRequestFilter;
//# sourceMappingURL=requestFilters.js.map