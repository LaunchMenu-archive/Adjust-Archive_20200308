import {Json} from "./_types/standardTypes";
import {SerializeableData, AsyncSerializeableData} from "./_types/serializeableData";
import {Module, ParameterizedModule} from "../module/module";
import {ExtendedObject} from "./extendedObject";
import {ModuleProxy} from "../module/moduleProxy";
import {PublicModuleMethods} from "../module/_types/publicModuleMethods";
import {ModuleReference} from "../module/moduleID";

function isModule(data): data is ParameterizedModule | ModuleProxy | PublicModuleMethods {
    return data instanceof Module || data instanceof ModuleProxy;
}

export class Serialize {
    /**
     * Serializes a passed value
     * @param data The data to serialize
     * @returns The serialized data
     */
    public static serialize(data: SerializeableData): Json;

    /**
     * Serializes a passed value
     * @param data The data to serialize, which may contain promises
     * @param asyncCallback The callback for when the promise resolves with the data
     * @param path The path of the data that is being serialized (if it's a sub object)
     * @returns The serialized data
     */
    public static serialize(
        data: AsyncSerializeableData,
        asyncCallback: (path: string, value: AsyncSerializeableData) => void,
        path?: string
    ): Json;

    public static serialize(
        data: SerializeableData,
        asyncCallback: (path: string, value: AsyncSerializeableData) => void = () => {},
        path?: string
    ): Json {
        // Check if the data has to be serialized
        if (data === null) {
            return null;
            // Transform undefined, since it doesn't exist in json
        } else if (data === undefined) {
            return {
                $type: "undefined",
            };
        } else if (typeof data == "object") {
            // If the data is a module, serialize it
            if (isModule(data))
                return {
                    $type: "ModuleReference",
                    data: ((data as any) as ParameterizedModule).getID().toString(),
                };

            // If the data is a module ID, serialize it
            if (data instanceof ModuleReference)
                return {
                    $type: "ModuleReference",
                    data: data.toString(),
                };

            // If the data is a promise, await it
            if (data instanceof Promise) {
                data.then(value => {
                    asyncCallback(path, value);
                });
                return undefined;
            }

            // If the data is an array, map it
            if (data instanceof Array)
                return data.map((value, index) =>
                    this.serialize(
                        value,
                        asyncCallback,
                        path ? path + "." + index : index + ""
                    )
                );

            // If it is an arbitrary object, map its values
            return ExtendedObject.mapPairs(data, (key, value) => [
                key.replace(/^(\$*type)/g, "$$$1"),
                this.serialize(value, asyncCallback, path ? path + "." + key : key + ""),
            ]) as Json;
        } else {
            // Simply return the data
            return data;
        }
    }

    /**
     * Deserializes arbitraty data structures that have been serialized by this class
     * @param data The data to ve deserialized
     * @param getModule A method to obtain a module representation from its path
     * @returns The deserialized version of the data
     */
    public static deserialize(
        data: Json,
        getModule: (path: string) => any
    ): SerializeableData {
        // Check if the data has to be deserialized
        if (data === null) {
            return null;
        } else if (typeof data == "object") {
            // Cjecl of the data is some custom type
            if ("$type" in data) {
                // Check if the data is constant 'undefined'
                if (data.$type == "undefined") return undefined;

                // Check if the data is a module
                if (data.$type == "ModuleReference" && "data" in data)
                    return getModule(data.data as string);
            }

            // If it is an array, map it
            if (data instanceof Array)
                return data.map(value => this.deserialize(value, getModule));

            // If it is an arbitrary object, map its values
            return ExtendedObject.mapPairs(data, (key, value) => [
                key.replace(/^\$(\$*type)/g, "$1"),
                this.deserialize(value, getModule),
            ]) as SerializeableData;
        } else {
            // Simply return the data
            return data;
        }
    }
}
