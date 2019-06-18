import { SerializedModule } from "../../module/_types/serializedModule";
/**
 * A type representing the serialized data of the program state
 */
export declare type SerializedProgramState = {
    maxModuleIDS: {
        [moduleID: string]: number;
    };
    modules: {
        [moduleID: string]: SerializedModule;
    };
};
