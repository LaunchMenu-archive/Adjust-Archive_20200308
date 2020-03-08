Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("../utils/eventEmitter");
const extendedObject_1 = require("../utils/extendedObject");
class Data extends eventEmitter_1.EventEmitter {
    /**
     * A class that stores data and emits events on changes of the data
     * @param initialData The initial data to store in the system, the set structure will also be based on this
     * @param storeUndefined Whether or not to explicitely store undefined
     * @param keepEmpty Whether or not to explicitely keep empty objects
     */
    constructor(initialData, storeUndefined = true, keepEmpty = true) {
        super();
        this.storeUndefined = storeUndefined;
        this.keepEmpty = keepEmpty;
        // Set up the initial data
        // @ts-ignore
        this.get = {};
        this.changeData(initialData);
    }
    /**
     * Changes properties in the data of the module, and rerenders the associated GUI
     * @param changedProps An object with all the changed properties and their values
     */
    async changeData(changedProps) {
        // Get the current values for the changed properties
        const originalProps = extendedObject_1.ExtendedObject.copyData(this.get, {}, changedProps);
        // Alter the values in the Data of the passed properties
        extendedObject_1.ExtendedObject.copyData(changedProps, this.get, undefined, this.storeUndefined, this.keepEmpty);
        // Emit an event to notify listeners of the change
        await this.emitAsync("change", changedProps, originalProps);
    }
    // Serialization
    /**
     * Serializes the data in order to store it
     * @returns The data of the module
     */
    serialize() {
        return extendedObject_1.ExtendedObject.copyData(this.get, {});
    }
    /**
     * Loads the passed data into the module
     * @param data The actual data to load into this module instance
     */
    deserialize(data) {
        this.changeData(data);
    }
    on(type, listener, name) {
        return super.on(type, listener, name);
    }
}
exports.Data = Data;
//# sourceMappingURL=data.js.map