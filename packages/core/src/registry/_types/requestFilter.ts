import {ModuleContract} from "../../module/_types/moduleContract";
import {AbstractModuleProvider} from "../moduleProviders/abstractModuleProvider";

/**
 * A filter that can be applied to module providers in your request
 */
export type RequestFilter<M extends ModuleContract> = (
    providers: ({
        provider: AbstractModuleProvider<M>;
        priority: number;
    })[]
) => AbstractModuleProvider<M>[];
