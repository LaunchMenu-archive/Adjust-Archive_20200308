import {AsyncSerializeableData} from "../../utils/_types/serializeableData";

/**
 * A base interface for the state (by default it doesn't have any data yet, but this might change in the future)
 */
export type ModuleState = {
    [key: string]: AsyncSerializeableData | Promise<AsyncSerializeableData>;
};
