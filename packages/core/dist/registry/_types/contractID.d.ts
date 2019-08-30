import { ModuleContract } from "../../module/_types/moduleContract";
import { ContractIDDetails } from "./contractDetails";
/**
 * The contract identifier type, which stores the contract type
 */
export declare type ContractID<T extends ModuleContract> = {
    ID: string;
    details: ContractIDDetails;
    toString: () => string;
    " ": T;
};
/**
 * A type representing a contract ID, whee the generic parameter argumets can be left out
 */
export declare type ParameterizedContractID = ContractID<ModuleContract>;
