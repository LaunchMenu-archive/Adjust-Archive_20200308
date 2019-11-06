Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../../module/module");
const extendedObject_1 = require("../extendedObject");
const moduleProxy_1 = require("../../module/moduleProxy");
const moduleID_1 = require("../../module/moduleID");
function isModule(data) {
    return data instanceof module_1.Module || data instanceof moduleProxy_1.ModuleProxy;
}
function isTraceable(data) {
    return "serialize" in data && data.serialize instanceof Function;
}
// TODO: Make a way to differentiate between lossless and lossy Deserialization
/**
 * A class to perform any serialization and deserialization of data in order to transfer it
 */
class Serialize {
    static serialize(data, asyncCallback = () => { }, path) {
        // Check if the data has to be serialized
        if (data === null) {
            return null;
            // Transform undefined, since it doesn't exist in json
        }
        else if (data === undefined) {
            return {
                $type: "undefined",
            };
        }
        else if (typeof data == "object") {
            // If the data is a module, serialize it
            if (isModule(data))
                return {
                    $type: "ModuleReference",
                    data: data.getID().toString(),
                };
            // If the data is a module ID, serialize it
            if (data instanceof moduleID_1.ModuleReference)
                return {
                    $type: "ModuleReference",
                    data: data.toString(),
                };
            // If the data is a promise, await it
            if (data instanceof Promise) {
                // Perform a sort of caching on promises, to reduce asyncness and unnecessary updates
                if (data.result)
                    return this.serialize(data.result); //TODO: fix TS
                data.then(value => {
                    data.result = value; //TODO: fix TS
                    asyncCallback(path, value, data);
                });
                return null;
            }
            // If the data is an array, map it
            if (data instanceof Array)
                return data.map((value, index) => this.serialize(value, asyncCallback, path ? path + "." + index : index + ""));
            // If the data is an arbtitrary traceable value
            if (isTraceable(data))
                return {
                    $type: "Traceable",
                    data: this.serialize(data.serialize()),
                };
            // If it is an arbitrary object, map its values
            const out = extendedObject_1.ExtendedObject.mapPairs(data, (key, value) => [
                key.replace(/^(\$*(type|flags))/g, "$$$1"),
                this.serialize(value, asyncCallback, path ? path + "." + key : key + ""),
            ]);
            // Check if the object contains special key overwrite
            if (extendedObject_1.ExtendedObject.overwrite in data)
                out["$flags"] = { overwrite: data[extendedObject_1.ExtendedObject.overwrite] };
            return out;
        }
        else {
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
    static deserialize(data, getModule) {
        // Check if the data has to be deserialized
        if (data === null) {
            return null;
        }
        else if (typeof data == "object") {
            // Check of the data is some custom type
            if ("$type" in data) {
                // Check if the data is constant 'undefined'
                if (data.$type == "undefined")
                    return undefined;
                // Check if the data is a module
                if (data.$type == "ModuleReference" && "data" in data)
                    return getModule(data.data);
                // Check if the data is a tracable value
                if (data.$type == "Traceable") {
                    const s = data.data;
                    const exports = require(s.deserializeFilePath);
                    const func = extendedObject_1.ExtendedObject.getField(exports || {}, s.deserializePropertyPath);
                    if (func instanceof Function)
                        return func(s.data);
                    else
                        return null;
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
            const out = extendedObject_1.ExtendedObject.mapPairs(data, (key, value) => [
                key.replace(/^\$(\$*(type|flags))/g, "$1"),
                this.deserialize(value, getModule),
            ]);
            // Handle the flags
            if (flags && flags.overwrite !== undefined)
                out[extendedObject_1.ExtendedObject.overwrite] = flags.overwrite;
            return out;
        }
        else {
            // Simply return the data
            return data;
        }
    }
}
exports.Serialize = Serialize;
//# sourceMappingURL=serialize.js.map