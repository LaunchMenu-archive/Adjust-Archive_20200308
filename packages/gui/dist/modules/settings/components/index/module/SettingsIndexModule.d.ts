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
declare const SettingsIndexModuleView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsIndexModuleModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class SettingsIndexModuleView extends SettingsIndexModuleView_base {
    /** @override */
    renderView(): JSX.Element;
}
