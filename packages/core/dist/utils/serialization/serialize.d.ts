import { Json } from "../_types/standardTypes";
import { SerializeableData, LossyAsyncSerializeableData } from "./_types/serializeableData";
/**
 * A class to perform any serialization and deserialization of data in order to transfer it
 */
export declare class Serialize {
    /**
     * Serializes a passed value
     * @param data The data to serialize
     * @returns The serialized data
     */
    static serialize(data: SerializeableData): Json;
    /**
     * Serializes a passed value
     * @param data The data to serialize, which may contain promises
     * @param asyncCallback The callback for when the promise resolves with the data
     * @param path The path of the data that is being serialized (if it's a sub object)
     * @returns The serialized data
     */
    static serialize(data: LossyAsyncSerializeableData, asyncCallback: (path: string, value: LossyAsyncSerializeableData, promise: Promise<any>) => void, path?: string): Json;
    /**
     * Deserializes arbitraty data structures that have been serialized by this class
     * @param data The data to ve deserialized
     * @param getModule A method to obtain a module representation from its path
     * @returns The deserialized version of the data
     */
    static deserialize(data: Json, getModule: (path: string) => any): SerializeableData;
}
