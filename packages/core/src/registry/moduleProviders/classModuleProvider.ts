import {InterfaceID} from "../_types/interfaceID";
import {NormalizedRequest} from "../_types/request";
import {ExtendsClass} from "../../utils/_types/standardTypes";
import {Module, ParameterizedModule} from "../../module/module";
import {AbstractModuleProvider} from "./abstractModuleProvider";
import {ProgramState} from "../../state/programState";
import {ModuleInterface} from "../../module/_types/moduleInterface";
import {PublicModuleMethods} from "../../module/_types/publicModuleMethods";

export class ClassModuleProvider<
    M extends ModuleInterface
> extends AbstractModuleProvider<M> {
    // The module class to create new instances from
    protected moduleClass: ExtendsClass<typeof Module>;

    /**
     * Creates a module provider that is able to create new modules from a given class
     * @param type The type of module that gets created
     * @param moduleClass The module class to create the instances from
     */
    constructor(type: InterfaceID<M>, moduleClass: ExtendsClass<typeof Module>) {
        super(type, moduleClass.getConfig().getPriority.bind(moduleClass));

        this.moduleClass = moduleClass;
    }

    /**
     * Retrieves the module class that this provider creates modules with
     * @returns The module class of this provider
     */
    public getModuleClass(): ExtendsClass<typeof Module> {
        return this.moduleClass;
    }

    /** @override */
    public async getModule(
        request: NormalizedRequest<M>
    ): Promise<M["child"] & PublicModuleMethods> {
        // Create a proxy for the parent, and add to the request
        let parentProxy;
        // Make sure the request was not for a root
        if (request.parent) {
            parentProxy = request.parent.createProxy();
            request = Object.assign({}, request, {parent: parentProxy});
        }

        // Retrieve the Module type and instanciate it
        const moduleID = ProgramState.getNextModuleID(this.moduleClass.getPath());
        const module: ParameterizedModule = await this.moduleClass.createInstance(
            request,
            moduleID
        );

        // Register the module
        ProgramState.addModule(module);

        // Create the proxy for the module and connect to the parent proxy
        const moduleProxy = module.createProxy();
        if (parentProxy) moduleProxy.connect(parentProxy);

        // Call module initialisation now the connection has completed
        await module.init(false);

        // Return the module
        return moduleProxy as any;
    }
}
