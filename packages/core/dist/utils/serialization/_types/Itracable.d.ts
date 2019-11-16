import { Json } from "../../_types/standardTypes";
/**
 * A object type that allows for serialization, by defining the location to call deserialize at
 */
export declare type ITraceable = {
    /**
     * Retrieves an object with all data required for deserialization
     * Make sure to implemente the deserialization method at the given location!
     */
    serialize(): ITraceableData;
};
/**
 * The data that can be obtained from a traceable
 */
export declare type ITraceableData = {
    /** The file path at which the deserialization method is located */
    deserializeFilePath: string;
    /** The path in the exported contents to the deserialization function */
    deserializePropertyPath: string;
    /** The data to pass to the deserializer */
    data: Json;
};
