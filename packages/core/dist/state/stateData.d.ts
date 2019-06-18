import { Json } from "../utils/_types/standardTypes";
import { SerializeableData } from "../utils/_types/serializeableData";
import { Data } from "../storage/data";
import { ParameterizedModule } from "../module/module";
export declare class StateData<S extends {
    [key: string]: SerializeableData;
}> extends Data<S> {
    /**@override  */
    serialize(): Json;
    /**
     * Loads the passed data into the module
     * @param data The actual data to load into this module instance
     * @param context The module whose state this is
     */
    deserialize(data: Json, context?: ParameterizedModule): void;
}
