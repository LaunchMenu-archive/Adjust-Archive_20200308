import { ParameterizedModule, Module } from "../module/module";
import { SerializedProgramState } from "./_types/SerializedProgramState";
import { ModuleID } from "../module/moduleID";
import { ExtendsClass } from "../utils/_types/standardTypes";
/**
 * Keeps references to all of the module instances that essentially make up the entire program
 */
declare class ProgramStateSingleton {
    protected modules: {
        [moduleID: string]: ParameterizedModule;
    };
    protected maxModuleIDs: {
        [modulePath: string]: number;
    };
    /**
     * Gets the next available ID for a module of the specified type
     * @param modulePath The path to the module for which to get a UID
     * @returns The created UID
     */
    getNextModuleID(modulePath: string | ExtendsClass<typeof Module>): ModuleID;
    /**
     * Adds the module to the program state
     * @param module The module that should be added
     * @returns The moduleID that was created for the passed module
     */
    addModule(module: ParameterizedModule): void;
    /**
     * Removes the node from the program state
     * @param node The node to remove
     */
    removeModule(module: ParameterizedModule): void;
    /**
     * Retrieves a module by its ID
     * @param moduleID The ID of the module
     * @returns The module instance if available
     */
    getModule(moduleID: ModuleID | string): ParameterizedModule;
    /**
     * Serializes all modules into a single object
     * @returns The overall object containing all serialized modules
     */
    serialize(): SerializedProgramState;
    /**
     * Loads the passed data into the program state
     * @param modules The actual data to create the modules from
     */
    deserialize(data: SerializedProgramState): void;
}
export declare const ProgramState: ProgramStateSingleton;
export {};
