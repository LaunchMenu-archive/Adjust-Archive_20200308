import { ModuleInterface } from "../../module/_types/moduleInterface";
/**
 * The interface identifier type, which stores the interface type
 */
export declare type InterfaceID<T extends ModuleInterface> = {
    ID: string;
    toString: () => string;
};
/**
 * A type representing a interface ID, whee the generic parameter argumets can be left out
 */
export declare type ParameterizedInterfaceID = InterfaceID<ModuleInterface>;
