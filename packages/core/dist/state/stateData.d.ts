import { Json } from "../utils/_types/standardTypes";
import { AsyncSerializeableData } from "../utils/_types/serializeableData";
import { Data } from "../storage/data";
import { ParameterizedModule } from "../module/module";
export declare class StateData<S extends {
    [key: string]: AsyncSerializeableData | Promise<AsyncSerializeableData>;
}> extends Data<S> {
    /**
     * A class that stores state data and emit events on changes of the data
     * @param initialData The initial data to store in the system, the set structure will also be based on this
     */
    constructor(initialData: S);
    /**
     * Serializes the data in order to store it
     * @param asyncCallback A callback for any promises within the data that could resolve
     * @returns The data of the module
     */
    serialize(asyncCallback?: (path: string, value: AsyncSerializeableData) => void): Json;
    /**
     * Loads the passed data into the module
     * @param data The actual data to load into this module instance
     * @param context The module whose state this is
     */
    deserialize(data: Json, context?: ParameterizedModule): void;
}
