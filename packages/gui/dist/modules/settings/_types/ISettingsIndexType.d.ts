import { Package, ContractIDDetails } from "@adjust/core/types";
/**
 * Data to represent a contract type in the index
 */
export declare type ISettingsIndexType = {
    type: "contractType";
    ID: string;
    package: Package;
} & ContractIDDetails;
