Object.defineProperty(exports, "__esModule", { value: true });
const abstractModuleProvider_1 = require("./abstractModuleProvider");
const programState_1 = require("../../state/programState");
class ClassModuleProvider extends abstractModuleProvider_1.AbstractModuleProvider {
    /**
     * Creates a module provider that is able to create new modules from a given class
     * @param type The type of module that gets created
     * @param moduleClass The module class to create the instances from
     */
    constructor(type, moduleClass) {
        super(type, moduleClass.getConfig().getPriority.bind(moduleClass));
        this.moduleClass = moduleClass;
    }
    /**
     * Retrieves the module class that this provider creates modules with
     * @returns The module class of this provider
     */
    getModuleClass() {
        return this.moduleClass;
    }
    /** @override */
    async getModule(request) {
        // Create a proxy for the parent, and add to the request
        let parentProxy;
        // Make sure the request was not for a root
        if (request.parent) {
            parentProxy = request.parent.createProxy();
            request = Object.assign({}, request, { parent: parentProxy });
        }
        // Retrieve the Module type and instanciate it
        const moduleID = programState_1.ProgramState.getNextModuleID(this.moduleClass.getPath());
        const module = await this.moduleClass.createInstance(request, moduleID);
        // Register the module
        programState_1.ProgramState.addModule(module);
        // Create the proxy for the module and connect to the parent proxy
        const moduleProxy = module.createProxy();
        if (parentProxy)
            moduleProxy.connect(parentProxy);
        // Call module initialisation now the connection has completed
        await module.init(false);
        // Return the module
        return moduleProxy;
    }
}
exports.ClassModuleProvider = ClassModuleProvider;
//# sourceMappingURL=classModuleProvider.js.map