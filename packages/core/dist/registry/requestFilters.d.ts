import { ParameterizedModule, Module } from "../module/module";
import { RequestFilter } from "./_types/requestFilter";
export declare function createRecursiveRequestFilter<M extends ParameterizedModule>(module: M): M extends Module<any, any, infer C> ? RequestFilter<C> : RequestFilter<any>;
