import {ParameterizedModule} from "../../module/module";
import {PublicModuleMethods} from "../../module/_types/publicModuleMethods";
import {ModuleReference} from "../../module/moduleID";

/**
 * Data that can be serialized to json
 */
export type SerializeableData =
    | ParameterizedModule
    | PublicModuleMethods
    | ModuleReference
    | string
    | boolean
    | number
    | {
          [key: string]: SerializeableData;
      }
    | {
          length: number;
          [key: number]: SerializeableData;
      };

/**
 * Data that can be serialized to json, when including a promise callback
 */
export type AsyncSerializeableData =
    | ParameterizedModule
    | PublicModuleMethods
    | ModuleReference
    | string
    | boolean
    | number
    | {
          [key: string]: AsyncSerializeableData | Promise<AsyncSerializeableData>;
      }
    | {
          length: number;
          [key: number]: AsyncSerializeableData | Promise<AsyncSerializeableData>;
      };
