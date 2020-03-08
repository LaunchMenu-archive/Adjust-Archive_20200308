import { LossyAsyncSerializeableData } from "./serializeableData";
/**
 * A object type that allows for serialization, by defining the location to call deserialize at
 * @param T is the date type that the deserialized data will have
 */
export declare type ITraceableTransformer<V> = {
    /**
     * Retrieves an object with all data required for deserialization
     * Make sure to implement the deserialization method at the given location!
     */
    serialize(): {
        /** The file path at which the deserialization method is located */
        deserializeFilePath: string;
        /** The path in the exported contents to the deserialization function */
        deserializePropertyPath: string;
        /** The data to pass to the deserializer */
        data: LossyAsyncSerializeableData;
    };
};
