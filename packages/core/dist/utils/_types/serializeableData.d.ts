import { ParameterizedModule } from "../../module/module";
import { PublicModuleMethods } from "../../module/_types/publicModuleMethods";
import { ModuleReference } from "../../module/moduleID";
/**
 * Data that can be serialized to json
 */
export declare type SerializeableData = ParameterizedModule | PublicModuleMethods | ModuleReference | string | boolean | number | {
    [key: string]: SerializeableData;
};
