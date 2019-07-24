Object.defineProperty(exports, "__esModule", { value: true });
const programState_1 = require("./programState");
const data_1 = require("../storage/data");
const serialize_1 = require("../utils/serialize");
class StateData extends data_1.Data {
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
            // Check if there is a context to connect to
            const contextProxy = module.parents.find(parent => parent._target == context);
            if (!contextProxy) {
                // TODO: add error once architecture has been changed such that locations don't require passing modules around
                // throw Error(`module doesn't specify context as parent`);
                return moduleProxy;
            }
            // Connect the procies, and return the module proxy
            moduleProxy.connect(contextProxy);
            return moduleProxy;
        }));
    }
}
exports.StateData = StateData;
//# sourceMappingURL=stateData.js.map