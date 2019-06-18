import { ModuleInterface } from "../../module/_types/moduleInterface";
import { AbstractModuleProvider } from "../moduleProviders/abstractModuleProvider";
/**
 * A filter that can be applied to module providers in your request
 */
export declare type RequestFilter<M extends ModuleInterface> = (providers: ({
    provider: AbstractModuleProvider<M>;
    priority: number;
})[]) => AbstractModuleProvider<M>[];
