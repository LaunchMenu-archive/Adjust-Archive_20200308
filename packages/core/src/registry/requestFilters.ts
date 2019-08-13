import {ClassModuleProvider} from "./moduleProviders/classModuleProvider";
import {ParameterizedModule, Module} from "../module/module";
import {RequestFilter} from "./_types/requestFilter";

export function createRecursiveRequestFilter<M extends ParameterizedModule>(
    module: M
): M extends Module<any, any, infer C> ? RequestFilter<C> : RequestFilter<any> {
    return (providers => {
        // Filter out any non class module providers
        const classProviders: {
            provider: ClassModuleProvider<any>;
            priority: number;
        }[] = providers.filter(p => p.provider instanceof ClassModuleProvider) as any;

        // Get the index of this module class
        const thisIndex = classProviders.findIndex(
            p => p.provider.getModuleClass() == module.getClass()
        );

        // Get the module with the next (lower priority) index
        const provider = classProviders[thisIndex + 1];
        return provider ? [provider.provider] : [];
    }) as any;
}
