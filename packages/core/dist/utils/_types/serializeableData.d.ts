import { ParameterizedModule } from "../../module/module";
import { ModuleReference } from "../../module/moduleID";
import { ChildModule } from "../../module/_types/moduleContract";
/**
 * Data that can be serialized to json
 */
export declare type SerializeableData = ParameterizedModule | ChildModule<{}> | ModuleReference | string | boolean | number | {
    [key: string]: SerializeableData;
} | {
    length: number;
    [key: number]: SerializeableData;
};
/**
 * Data that can be serialized to json, when including a promise callback
 */
export declare type AsyncSerializeableData = ParameterizedModule | ChildModule<{}> | ModuleReference | string | boolean | number | {
    [key: string]: AsyncSerializeableData | Promise<AsyncSerializeableData>;
} | {
    length: number;
    [key: number]: AsyncSerializeableData | Promise<AsyncSerializeableData>;
};
