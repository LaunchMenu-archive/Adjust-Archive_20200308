import { DeepReadonly, DeepPartial, Json } from "../utils/_types/standardTypes";
import { EventEmitter } from "../utils/eventEmitter";
import { DataChange } from "./_types/dataChange";
export declare class Data<S extends object> extends EventEmitter {
    readonly get: DeepReadonly<S>;
    protected storeUndefined: boolean;
    protected keepEmpty: boolean;
    /**
     * A class that stores data and emits events on changes of the data
     * @param initialData The initial data to store in the system, the set structure will also be based on this
     * @param storeUndefined Whether or not to explicitely store undefined
     * @param keepEmpty Whether or not to explicitely keep empty objects
     */
    constructor(initialData: S, storeUndefined?: boolean, keepEmpty?: boolean);
    /**
     * Changes properties in the data of the module, and rerenders the associated GUI
     * @param changedProps An object with all the changed properties and their values
     */
    changeData(changedProps: DataChange<S>): Promise<void>;
    /**
     * Serializes the data in order to store it
     * @returns The data of the module
     */
    serialize(): Json;
    /**
     * Loads the passed data into the module
     * @param data The actual data to load into this module instance
     */
    deserialize(data: Json): void;
    /**
     * Adds a listener for the alteration of data data
     * @param type The type of listener, I.e. data change
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification
     * @returns The name of the listener (generated if none was supplied)
     */
    on(type: "change", listener: (changedProps: DeepReadonly<DeepPartial<S>>, previousProps: DeepReadonly<DeepPartial<S>>) => void | Promise<any>, name?: string): string;
    /**
     * Simply registers any event type using EventEmitter
     */
    on(type: string, listener: (...args: any) => void | Promise<any>, name?: string): string;
}
