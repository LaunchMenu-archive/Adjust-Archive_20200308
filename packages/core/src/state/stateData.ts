import {Json} from "../utils/_types/standardTypes";
import {ProgramState} from "./programState";
import {
    SerializeableData,
    AsyncSerializeableData,
} from "../utils/_types/serializeableData";
import {Data} from "../storage/data";
import {Serialize} from "../utils/serialize";
import {ModuleProxy} from "../module/moduleProxy";
import {ParameterizedModule} from "../module/module";

export class StateData<
    S extends {
        [key: string]: AsyncSerializeableData | Promise<AsyncSerializeableData>;
    }
> extends Data<S> {
    /**
     * A class that stores state data and emit events on changes of the data
     * @param initialData The initial data to store in the system, the set structure will also be based on this
     */
    constructor(initialData: S) {
        super(initialData, false);
    }

    /**
     * Serializes the data in order to store it
     * @param asyncCallback A callback for any promises within the data that could resolve
     * @returns The data of the module
     */
    public serialize(
        asyncCallback: (path: string, value: AsyncSerializeableData) => void = () => {}
    ): Json {
        return Serialize.serialize(this.get as SerializeableData, asyncCallback);
    }

    /**
     * Loads the passed data into the module
     * @param data The actual data to load into this module instance
     * @param context The module whose state this is
     */
    public deserialize(data: Json, context?: ParameterizedModule): void {
        this.changeData(Serialize.deserialize(data, path => {
            // Get the module from the state
            const module = ProgramState.getModule(path);

            // Create a proxy for the module
            const moduleProxy = module.createProxy();

            // Check if there is a context to connect to
            const contextProxy = module.parents.find(
                parent => (parent._target as any) == context
            ) as any;
            if (!contextProxy) {
                // TODO: add error once architecture has been changed such that locations don't require passing modules around
                // throw Error(`module doesn't specify context as parent`);
                return moduleProxy;
            }

            // Connect the procies, and return the module proxy
            moduleProxy.connect(contextProxy);
            return moduleProxy;
        }) as any);
    }
}
