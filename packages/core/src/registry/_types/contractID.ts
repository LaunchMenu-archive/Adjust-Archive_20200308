import {ModuleContract} from "../../module/_types/moduleContract";
import {ContractIDDetails} from "./contractDetails";

/**
 * The contract identifier type, which stores the contract type
 */
export type ContractID<T extends ModuleContract> = {
    // The actual identifier for the contract
    ID: string;

    // Details about the contract
    details: ContractIDDetails;

    // A way of obtaining the ID from the contract
    toString: () => string;

    // Wont every be present, just a way of retaining the contract data
    " ": T;
};

/**
 * A type representing a contract ID, whee the generic parameter argumets can be left out
 */
export type ParameterizedContractID = ContractID<ModuleContract>;
