import { Json } from "./_types/standardTypes";
import { SerializeableData } from "./_types/serializeableData";
export declare class Serialize {
    /**
     * Serializes a passed value
     * @param data The data to serialize
     * @returns The serialized data
     */
    static serialize(data: SerializeableData): Json;
    /**
     * Deserializes arbitraty data structures that have been serialized by this class
     * @param data The data to ve deserialized
     * @param getModule A method to obtain a module representation from its path
     * @returns The deserialized version of the data
     */
    static deserialize(data: Json, getModule: (path: string) => any): SerializeableData;
}
