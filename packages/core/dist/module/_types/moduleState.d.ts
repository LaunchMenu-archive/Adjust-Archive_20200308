import { LossyAsyncSerializeableData } from "../../utils/serialization/_types/serializeableData";
/**
 * A base interface for the state (by default it doesn't have any data yet, but this might change in the future)
 */
export declare type ModuleState = {
    [key: string]: LossyAsyncSerializeableData | Promise<LossyAsyncSerializeableData>;
};
