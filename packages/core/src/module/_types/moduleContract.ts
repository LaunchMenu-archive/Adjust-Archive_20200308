import {Json} from "../../utils/_types/standardTypes";

/**
 * A generic type describing the child of a contract
 * @param C The methods that the child should have
 */
export type ChildModule<
    C extends {
        [method: string]: (...args: any[]) => Promise<any>;
    }
> = {
    close(): Promise<void>;
} & C;

/**
 * A generic type describing the parent of a contract
 * @param P The methods that the parent should have
 */
export type ParentModule<
    P extends {
        [method: string]: (...args: any[]) => Promise<any>;
    }
> = P;

/**
 * An interface describing the relation between modules
 */
export interface ModuleContract {
    parent: ParentModule<any>;
    child: ChildModule<any>;
    data?: {[key: string]: Json};
}

/**
 * Checks whether the provided module contract is valid
 */
export type IsContractValid<M extends ModuleContract, R extends any> = M extends null
    ? "You must provide a generic type parameter"
    : M["child"] extends ChildModule<infer C>
    ? M["parent"] extends ParentModule<infer P>
        ? R
        : "Please wrap your contract's parent type in ParentModule<>"
    : "Please wrap your contract's child type in ChildModule<>";
