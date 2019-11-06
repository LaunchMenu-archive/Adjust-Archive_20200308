import {Json} from "../_types/standardTypes";
import {SerializeableData, AsyncSerializeableData} from "./_types/serializeableData";
import {Module, ParameterizedModule} from "../../module/module";
import {ExtendedObject} from "../extendedObject";
import {ModuleProxy} from "../../module/moduleProxy";
import {ModuleReference} from "../../module/moduleID";
import {ChildModule} from "../../module/_types/moduleContract";
import {ITraceable, ITraceableData} from "./_types/ITracable";
import {ITraceableTransformer} from "./_types/ITracableTransformer";

function isModule(data): data is ParameterizedModule | ModuleProxy | ChildModule<{}> {
    return data instanceof Module || data instanceof ModuleProxy;
}
function isTraceable(data): data is ITraceable | ITraceableTransformer<any> {
    return "serialize" in data && data.serialize instanceof Function;
}

// TODO: Make a way to differentiate between lossless and lossy Deserialization

/**
 * A class to perform any serialization and deserialization of data in order to transfer it
 */
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
        asyncCallback: (
            path: string,
            value: AsyncSerializeableData,
            promise: Promise<any>
        ) => void,
        path?: string
    ): Json;

    public static serialize(
        data: SerializeableData,
        asyncCallback: (
            path: string,
            value: AsyncSerializeableData,
            promise: Promise<any>
        ) => void = () => {},
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
                // Perform a sort of caching on promises, to reduce asyncness and unnecessary updates
                if ((data as any).result) return this.serialize((data as any).result); //TODO: fix TS

                data.then(value => {
                    (data as any).result = value; //TODO: fix TS
                    asyncCallback(path, value, data);
                });
                return null;
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

            // If the data is an arbtitrary traceable value
            if (isTraceable(data))
                return {
                    $type: "Traceable",
                    data: this.serialize(data.serialize()),
                };

            // If it is an arbitrary object, map its values
            const out = ExtendedObject.mapPairs(data, (key, value) => [
                key.replace(/^(\$*(type|flags))/g, "$$$1"),
                this.serialize(value, asyncCallback, path ? path + "." + key : key + ""),
            ]) as Json;

            // Check if the object contains special key overwrite
            if (ExtendedObject.overwrite in data)
                out["$flags"] = {overwrite: data[ExtendedObject.overwrite]};

            return out;
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
            // Check of the data is some custom type
            if ("$type" in data) {
                // Check if the data is constant 'undefined'
                if (data.$type == "undefined") return undefined;

                // Check if the data is a module
                if (data.$type == "ModuleReference" && "data" in data)
                    return getModule(data.data as string);

                // Check if the data is a tracable value
                if (data.$type == "Traceable") {
                    const s: ITraceableData = data.data as any;
                    const exports = require(s.deserializeFilePath);
                    const func = ExtendedObject.getField(
                        exports || {},
                        s.deserializePropertyPath
                    );
                    if (func instanceof Function) return func(s.data);
                    else return null;
                }
            }

            // If it is an array, map it
            if (data instanceof Array)
                return data.map(value => this.deserialize(value, getModule));

            // If the object contains any flags, store them
            let flags;
            if (data["$flags"]) {
                flags = data["$flags"];
                delete data["$flags"];
            }

            // If it is an arbitrary object, map its values
            const out = ExtendedObject.mapPairs(data, (key, value) => [
                key.replace(/^\$(\$*(type|flags))/g, "$1"),
                this.deserialize(value, getModule),
            ]) as SerializeableData;

            // Handle the flags
            if (flags && flags.overwrite !== undefined)
                out[ExtendedObject.overwrite] = flags.overwrite;

            return out;
        } else {
            // Simply return the data
            return data;
        }
    }
}
