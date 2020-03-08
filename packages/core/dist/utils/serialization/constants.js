Object.defineProperty(exports, "__esModule", { value: true });
const extendedObject_1 = require("../extendedObject");
/**
 * Constants defined using this class will only become usuable one event cycle after declaration
 */
class Constants {
    /**
     * Creates a constants object that should be obtainable from the given path
     * @param path The path this object is obtainable from
     */
    constructor(path) {
        // The registered functions
        this.funcs = [];
        // The registered constants
        this.constants = [];
        // Deserialization methods
        /**
         * The deserialization methjod of the provided constants
         */
        this.deserialize = data => {
            // If the data to be deserializeed was a function
            if (data.functionID !== undefined) {
                return this.funcs[data.functionID](...data.args);
            }
            else if (data.constantID !== undefined) {
                return this.constants[data.constantID];
            }
        };
        this.path = path;
        this.startTimer();
    }
    /**
     * Starts a timer that will verify whether the constants are setup properly,
     * and to lock registration of new constants.
     * This is done to ensure (to the best of our abilities) that constants are only defined upon initialization
     * And to make sure these constants are properly exported and accessible for deserialization
     */
    startTimer() {
        setTimeout(() => {
            // Prevent new constant definitions
            this.locked = true;
            // Check whether the constants were properly exported, and obtain the name
            const hostFile = require(this.path);
            extendedObject_1.ExtendedObject.forEach(hostFile, (exportName, exported) => {
                if (exported == this)
                    this.exportPropertyName = exportName;
            });
            if (!this.exportPropertyName)
                throw Error(`Constants were not exported properly by file ${this.path}, please export the created constants`);
        });
    }
    // Constant definition methdos
    /**
     * Creates a function that can be called with data, such that the real function will be called elsewhere with the given params upon deserialization
     * @param func The constant function that should be callable from elsewhere
     * @returns A function to create the serializable function call
     */
    defineFunction(func) {
        if (this.locked)
            throw Error("Constants may only be defined during file initialization");
        const ID = this.funcs.length;
        this.funcs.push(func);
        // Return a function that define an object with a proper serialization method
        return (...data) => ({
            serialize: () => ({
                deserializeFilePath: this.path,
                deserializePropertyPath: `${this.exportPropertyName}.deserialize`,
                data: {
                    args: data,
                    functionID: ID,
                },
            }),
        });
    }
    /**
     * Defines a constant value that's accesible froma anywhere, such that it can be serialized and deserialized
     * @param value The value to be declared
     * @returns The value with a serialization method
     */
    define(value) {
        if (this.locked)
            throw Error("Constants may only be defined during file initialization");
        const ID = this.constants.length;
        this.constants.push(value);
        // If the value is an object, add the serializer to the method, otherwise just export the serializer
        let output = {};
        if (value instanceof Object) {
            output = value;
        }
        // Add the serializer
        output.serialize = () => ({
            deserializeFilePath: this.path,
            deserializePropertyPath: `${this.exportPropertyName}.deserialize`,
            data: {
                constantID: ID,
            },
        });
        return output;
    }
}
exports.Constants = Constants;
//# sourceMappingURL=constants.js.map