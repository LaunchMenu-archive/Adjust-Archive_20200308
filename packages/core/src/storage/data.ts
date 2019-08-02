import {DeepReadonly, DeepPartial, Json} from "../utils/_types/standardTypes";
import {EventEmitter} from "../utils/eventEmitter";
import {ExtendedObject} from "../utils/extendedObject";
import {JsonPartial} from "./_types/jsonPartial";

export class Data<S extends object> extends EventEmitter {
    public readonly get: DeepReadonly<S>; // The data of the object

    // TODO: add a way to directly register a listener for a certain field

    protected storeUndefined: boolean; // Whether or not undefined values should be kept in the data
    protected keepEmpty: boolean; // Whether or not empty objects should be kept in the data

    /**
     * A class that stores data and emits events on changes of the data
     * @param initialData The initial data to store in the system, the set structure will also be based on this
     * @param storeUndefined Whether or not to explicitely store undefined
     * @param keepEmpty Whether or not to explicitely keep empty objects
     */
    constructor(
        initialData: S,
        storeUndefined: boolean = true,
        keepEmpty: boolean = true
    ) {
        super();
        this.storeUndefined = storeUndefined;
        this.keepEmpty = keepEmpty;

        // Set up the initial data
        // @ts-ignore
        this.get = {};
        this.changeData(initialData as any);
    }

    /**
     * Changes properties in the data of the module, and rerenders the associated GUI
     * @param changedProps An object with all the changed properties and their values
     */
    public async changeData(changedProps: JsonPartial<S>): Promise<void> {
        // Get the current values for the changed properties
        const originalProps = ExtendedObject.copyData(this.get, {}, changedProps);

        // Alter the values in the Data of the passed properties
        ExtendedObject.copyData(
            changedProps,
            this.get,
            undefined,
            this.storeUndefined,
            this.keepEmpty
        );

        // Emit an event to notify listeners of the change
        await this.emitAsync("change", changedProps, originalProps);
    }

    // Serialization
    /**
     * Serializes the data in order to store it
     * @returns The data of the module
     */
    public serialize(): Json {
        return ExtendedObject.copyData(this.get as S, {});
    }

    /**
     * Loads the passed data into the module
     * @param data The actual data to load into this module instance
     */
    public deserialize(data: Json): void {
        this.changeData(data as any);
    }

    // Events
    /**
     * Adds a listener for the alteration of data data
     * @param type The type of listener, I.e. data change
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification
     * @returns The name of the listener (generated if none was supplied)
     */
    public on(
        type: "change",
        listener: (
            changedProps: DeepReadonly<DeepPartial<S>>,
            previousProps: DeepReadonly<DeepPartial<S>>
        ) => void | Promise<any>,
        name?: string
    ): string;

    /**
     * Simply registers any event type using EventEmitter
     */
    public on(
        type: string,
        listener: (...args: any) => void | Promise<any>,
        name?: string
    ): string;
    public on(
        type: string,
        listener: (...args: any) => void | Promise<any>,
        name?: string
    ): string {
        return super.on(type, listener, name);
    }
}
