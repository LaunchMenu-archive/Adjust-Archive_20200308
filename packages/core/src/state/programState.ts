import {ParameterizedModule, Module} from "../module/module";
import {SerializedProgramState} from "./_types/SerializedProgramState";
import {Registry} from "../registry/registry";
import {ExtendedObject} from "../utils/extendedObject";
import {ModuleID} from "../module/moduleID";
import {ExtendsClass} from "../utils/_types/standardTypes";

/**
 * Keeps references to all of the module instances that essentially make up the entire program
 */
class ProgramStateSingleton {
    // The currently stored modules
    protected modules: {[moduleID: string]: ParameterizedModule} = {};

    // The maximum module id that has been created for a certain module type
    protected maxModuleIDs: {[modulePath: string]: number} = {};

    // Module tracking
    /**
     * Gets the next available ID for a module of the specified type
     * @param modulePath The path to the module for which to get a UID
     * @returns The created UID
     */
    public getNextModuleID(modulePath: string | ExtendsClass<typeof Module>): ModuleID {
        // Normalize the module path
        if (typeof modulePath != "string") modulePath = modulePath.getPath();

        // Initialise the max ID if not done so already
        if (!this.maxModuleIDs[modulePath]) this.maxModuleIDs[modulePath] = 0;

        // Claim the next non taken ID, and update it
        return new ModuleID(modulePath, this.maxModuleIDs[modulePath]++);
    }

    /**
     * Adds the module to the program state
     * @param module The module that should be added
     * @returns The moduleID that was created for the passed module
     */
    public addModule(module: ParameterizedModule): void {
        // Extract the module ID of the module
        const moduleID = module.getID();

        // Add the module to the list
        this.modules[moduleID.toString()] = module;
    }

    /**
     * Removes the node from the program state
     * @param node The node to remove
     */
    public removeModule(module: ParameterizedModule): void {
        // Extract the module ID of the module
        const moduleID = module.getID();

        // Remove the module from the list
        delete this.modules[moduleID.toString()];
    }

    /**
     * Retrieves a module by its ID
     * @param moduleID The ID of the module
     * @returns The module instance if available
     */
    public getModule(moduleID: ModuleID | string): ParameterizedModule {
        // Normalize the module ID
        moduleID = moduleID + "";

        // Get the specific module
        const module = this.modules[moduleID.toString()];

        // Return the result
        return module;
    }

    // Serilization
    /**
     * Serializes all modules into a single object
     * @returns The overall object containing all serialized modules
     */
    public serialize(): SerializedProgramState {
        // TODO: call stop on modules first
        return {
            maxModuleIDS: Object.assign({}, this.maxModuleIDs),
            modules: ExtendedObject.map(this.modules, module => module.serialize()),
        };
    }

    /**
     * Loads the passed data into the program state
     * @param modules The actual data to create the modules from
     */
    public deserialize(data: SerializedProgramState): void {
        // Make sure the programState is currently empty
        if (Object.keys(this.modules).length != 0)
            throw new Error(
                "A previous state can only be loaded into an empty program state"
            );

        // Load the current maximum IDs
        this.maxModuleIDs = Object.assign({}, data.maxModuleIDS);

        // Create the modules
        this.modules = ExtendedObject.map(data.modules, (moduleData, moduleID) => {
            // Get the class of the module
            const moduleClass = Registry.getModuleClass(moduleData.$type);

            // TODO: add error handling if no moduleClass could be found
            // Create a new instance of this class, deserializing the setup related data
            const module: ParameterizedModule = moduleClass.recreateInstance(
                moduleData,
                new ModuleID(moduleID)
            );

            // Return the instance
            return module;
        });

        // Perform deserialization of the state
        ExtendedObject.forEach(data.modules, (key, moduleData) => {
            // Get the actual module
            const module = this.modules[key];

            // Deserialize the data
            module.deserialize(moduleData.data);
        });
    }
}
export const ProgramState = new ProgramStateSingleton();
