Object.defineProperty(exports, "__esModule", { value: true });
class AbstractModuleProvider {
    /**
     * Creates a module provider for a certain interface
     * @param type The interface ID of the module that should be provided
     * @param filter A filter as to skip certain requests
     */
    constructor(type, filter = () => 1) {
        this.type = type;
        this.filter = filter;
    }
    /**
     * Retrieves the type that this provider can provide a module for
     * @returns The module type
     */
    getType() {
        return this.type;
    }
    /**
     * Retrieves the priority of this provider to provide a module
     * if 0 is returned, the provider shouldn't be used
     * @param request The request to provide for
     * @returns The priority for usage of this provider
     */
    getPriority(request) {
        if (this.type.ID != request.type.ID)
            return 0;
        // TODO: factor in user's ordering settings
        return Number(this.filter(request));
    }
}
exports.AbstractModuleProvider = AbstractModuleProvider;
//# sourceMappingURL=abstractModuleProvider.js.map