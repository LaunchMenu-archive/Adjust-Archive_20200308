/// <reference types="react" />
import { SettingsIndexModule } from "./SettingsIndexModule.type";
declare const SettingsIndexModuleModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsIndexModule.type").SettingsIndexModuleContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsIndexModuleModule extends SettingsIndexModuleModule_base implements SettingsIndexModule {
}
export default SettingsIndexModuleModule;
declare const SettingsIndexModuleView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsIndexModuleModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig<any>, import("@adjust/core/types").ModuleContract>, {}>>>;
export declare class SettingsIndexModuleView extends SettingsIndexModuleView_base {
    /** @override */
    renderView(): JSX.Element;
}
