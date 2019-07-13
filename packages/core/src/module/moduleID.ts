import {ParameterizedModule, Module} from "./module";
import {Registry} from "../registry/registry";
import {ProgramState} from "../state/programState";
import {RequestPath} from "./requestPath/requestPath";

const separator = ":";

/**
 * A class that can be used to reference a module.
 * Can be used within an app to show a module's view without having a connection to that module.
 */
export class ModuleReference {
    // The path to the module class
    protected modulePath: string;

    // The id of this instance of the module class
    protected ID: number;

    /**
     * Creates a moduleID based on a module path and a unique ID
     * @param modulePath The path to the module class
     * @param id The unique ID for this class
     */
    constructor(modulePath: string, id: number);

    /**
     * Creates a moduleID based on an already existing module ID in either string or object form
     * @param moduleID The already existing module ID
     */
    constructor(moduleID: string | ModuleReference);
    constructor(modulePath: string | ModuleReference, id?: number) {
        if (id !== undefined && typeof modulePath == "string") {
            // Set the path and id directly
            this.modulePath = modulePath;
            this.ID = id;
        } else {
            // Get the path and id if the passed data is an already existing module id
            const parts = modulePath.toString().split(separator);
            this.modulePath = parts[0];
            this.ID = Number(parts[1]);
        }
    }

    /**
     * Retrieves the path to the class of the module
     * @returns The path
     */
    public getModulePath(): string {
        return this.modulePath;
    }

    /**
     * Retrieves the ID of the module
     * @returns the ID
     */
    public getID(): number {
        return this.ID;
    }
    /**@override */
    public toString(): string {
        return this.modulePath + separator + this.ID;
    }

    /**
     * Checks whether two module references are equivalent
     * @param ref The reference to compare this to
     * @returns Whether the references are quivalent
     */
    public equals(ref: ModuleReference): boolean {
        return ref.ID == this.ID && ref.modulePath == this.modulePath;
    }
}

/**
 * The class used internally to identify modules,
 * provides some utility methods to obtain data from this identifier
 */
export class ModuleID extends ModuleReference {
    /**
     * Retrieves the class of the module type this ID represents
     * @returns The module class
     */
    public getModuleClass(): typeof Module {
        let moduleClass: typeof Module;
        // Assume getModuleClass to behave syncrhonously, since install should have already occured
        Registry.getModuleClass(this.modulePath).then(mc => (moduleClass = mc));
        return moduleClass;
    }

    /**
     * Retrieves the request path that corresponds to this module ID
     * @returns The request path
     */
    public getRequestPath(): RequestPath {
        return this.getModule().getRequestPath();
    }

    /**
     * Retrieves the module that this ID uniquely identifies
     * @returns The module that this ID identifies
     */
    public getModule(): ParameterizedModule {
        return ProgramState.getModule(this);
    }
}
