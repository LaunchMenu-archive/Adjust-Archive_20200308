import { LossyAsyncSerializeableData } from "./_types/serializeableData";
import { ITraceableTransformer } from "./_types/ITracableTransformer";
import { RevertTransformedSerializedData } from "./_types/RevertTransformedSerializableData";
import { ITraceable } from "./_types/ITracable";
export declare class Constants {
    protected path: string;
    protected locked: boolean;
    protected exportPropertyName: string;
    protected funcs: ((...args: LossyAsyncSerializeableData[]) => any)[];
    protected constants: any[];
    /**
     * Creates a constants object that should be obtainable from the given path
     * @param path The path this object is obtainable from
     */
    constructor(path: string);
    /**
     * Starts a timer that will verify whether the constants are setup properly,
     * and to lock registration of new constants.
     * This is done to ensure (to the best of our abilities) that constants are only defined upon initialization
     * And to make sure these constants are properly exported and accessible for deserialization
     */
    protected startTimer(): void;
    /**
     * The deserialization methjod of the provided constants
     */
    protected deserialize: (data: any) => any;
    /**
     * Creates a function that can be called with data, such that the real function will be called elsewhere with the given params upon deserialization
     * @param func The constant function that should be callable from elsewhere
     * @returns A function to create the serializable function call
     */
    defineFunction<A extends any[], V>(func: (...args: A) => V): (...args: {
        [P in keyof A]: RevertTransformedSerializedData<A[P]>;
    }) => ITraceableTransformer<V>;
    /**
     * Defines a constant value that's accesible froma anywhere, such that it can be serialized and deserialized
     * @param value The value to be declared
     * @returns The value with a serialization method
     */
    define<V>(value: V): V extends object ? V & ITraceable : ITraceableTransformer<V>;
}
