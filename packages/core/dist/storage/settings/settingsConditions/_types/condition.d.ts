import { Module } from "../../../../module/module";
import { ModuleRequestData } from "../../../../module/_types/moduleRequestData";
import { Json } from "../../../../utils/_types/standardTypes";
/**
 * A condition to be applied to certain settings
 */
export declare type Condition = (request: ModuleRequestData<any>, moduleClass: typeof Module, data: Json[]) => boolean;
