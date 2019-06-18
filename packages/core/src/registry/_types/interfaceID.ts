import {ModuleInterface} from "../../module/_types/moduleInterface";

/**
 * The interface identifier type, which stores the interface type
 */
export type InterfaceID<T extends ModuleInterface> = {
    // The actual identifier for the interface
    ID: string;
    
    // A way of obtaining the ID from the interface
    toString: () => string;
};

/**
 * A type representing a interface ID, whee the generic parameter argumets can be left out
 */
export type ParameterizedInterfaceID = InterfaceID<ModuleInterface>;
