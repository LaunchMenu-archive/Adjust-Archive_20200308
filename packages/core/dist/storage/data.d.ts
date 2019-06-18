import { DeepReadonly, DeepPartial, Json } from "../utils/_types/standardTypes";
import { Setters } from "./_types/setters";
import { EventEmitter } from "../utils/eventEmitter";
import { JsonPartial } from "./_types/jsonPartial";
export declare class Data<S extends object> extends EventEmitter {
    readonly get: DeepReadonly<S>;
    readonly set: DeepReadonly<Setters<S>>;
    protected storeUndefined: boolean;
    /**
     * A class that stores data and emits events on changes of the data
     * @param initialData The initial data to store in the system, the set structure will also be based on this
     * @param storeUndefined Whether or not to explicitely store undefined, and whether to keep empty objects
     */
    constructor(initialData: S, storeUndefined?: boolean);
    /**
     * Changes properties in the data of the module, and rerenders the associated GUI
     * @param changedProps An object with all the changed properties and their values
     */
    changeData(changedProps: JsonPartial<S>): Promise<void>;
    /**
     * Goes through the initial data in order to map all fields to setter methods on the set object
     * @param object The object for which to create setter functions
     * @param path The path of the given object from the root in this data
     * @returns The mapped object where all values are callable setter functions
     */
    static createSetters<T extends object>(object: T, change: (path: object) => any, path?: string): Setters<T>;
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
