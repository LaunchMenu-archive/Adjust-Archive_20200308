Object.defineProperty(exports, "__esModule", { value: true });
const programState_1 = require("./programState");
const data_1 = require("../storage/data");
const serialize_1 = require("../utils/serialize");
class StateData extends data_1.Data {
    /**
     * A class that stores state data and emit events on changes of the data
     * @param initialData The initial data to store in the system, the set structure will also be based on this
     */
    constructor(initialData) {
        super(initialData, false);
    }
    /**
     * Serializes the data in order to store it
     * @param asyncCallback A callback for any promises within the data that could resolve
     * @returns The data of the module
     */
    serialize(asyncCallback = () => { }) {
        return serialize_1.Serialize.serialize(this.get, asyncCallback);
    }
    /**
     * Loads the passed data into the module
     * @param data The actual data to load into this module instance
     * @param context The module whose state this is
     */
    deserialize(data, context) {
        this.changeData(serialize_1.Serialize.deserialize(data, path => {
            // Get the module from the state
            const module = programState_1.ProgramState.getModule(path);
            // Create a proxy for the module
            const moduleProxy = module.createProxy();
            // Check if the module defines a proxy to this context, which we can connect to
            const contextProxy = module
                .getParents()
                .find(parent => parent._target == context);
            if (!contextProxy) {
                throw Error(`module doesn't specify context as parent`);
                // return moduleProxy;
            }
            // Connect the proxies, and return the module proxy
            moduleProxy._connect(contextProxy);
            return moduleProxy;
        }));
    }
}
exports.StateData = StateData;
//# sourceMappingURL=stateData.js.map