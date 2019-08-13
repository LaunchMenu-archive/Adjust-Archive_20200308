import {ModuleContract} from "../../module/_types/moduleContract";

/**
 * The contract identifier type, which stores the contract type
 */
export type ContractID<T extends ModuleContract> = {
    // The actual identifier for the contract
    ID: string;

    // A way of obtaining the ID from the contract
    toString: () => string;
};

/**
 * A type representing a contract ID, whee the generic parameter argumets can be left out
 */
export type ParameterizedContractID = ContractID<ModuleContract>;
