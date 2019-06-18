import {ModuleInterface} from "./moduleInterface";
import {ModuleRequestData} from "./moduleRequestData";

/**
 * All methods that a module can call on any child module
 */
export type PublicModuleMethods = {
    close(): Promise<void>;
};
