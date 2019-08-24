/// <reference types="react" />
import { ContextProvider } from "./contextProvider.type";
export declare const contextProviderConfig: {
    state: {
        childProvider: {
            close(): Promise<void>;
        };
    };
    getPriority: () => number;
    settings: {};
    type: import("../registry/_types/contractID").ContractID<import("./contextProvider.type").ContextProviderContract>;
};
declare const ContextProviderModule_base: import("../module/_types/extendedModule").ExtendedModuleClass<{
    state: {
        childProvider: {
            close(): Promise<void>;
        };
    };
    getPriority: () => number;
    settings: {};
    type: import("../registry/_types/contractID").ContractID<import("./contextProvider.type").ContextProviderContract>;
}, import("../utils/_types/standardTypes").ExtendsClass<typeof import("..").Module, import("..").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, import("../storage/settings/_types/settingsConfig").SettingsConfig<import("../utils/_types/standardTypes").Empty>, import("../module/_types/moduleContract").ModuleContract>>>;
/**
 * A module of this type is used as the root of the window to provide contexts
 */
export declare class ContextProviderModule extends ContextProviderModule_base implements ContextProvider {
    /** @override */
    protected onInit(fromReload: boolean): Promise<void>;
}
export default ContextProviderModule;
declare const ContextProviderView_base: import("../module/_types/extendedModuleView").ExtendedModuleViewClass<typeof ContextProviderModule, {}, import("../utils/_types/standardTypes").ExtendsClass<typeof import("..").ModuleView, import("..").ModuleView<{}, {}, import("..").Module<import("../module/_types/moduleState").ModuleState, import("../storage/settings/_types/settingsConfig").SettingsConfig<any>, import("../module/_types/moduleContract").ModuleContract>, {}>>>;
export declare class ContextProviderView extends ContextProviderView_base {
    /**
     * Renders the data provider in the component tree
     * @param children The children to put in the provider
     */
    protected renderProvider(children: any): JSX.Element;
    /** @override */
    protected renderView(): JSX.Element;
}
