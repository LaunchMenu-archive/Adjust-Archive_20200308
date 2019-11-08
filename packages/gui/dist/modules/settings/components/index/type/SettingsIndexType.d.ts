/// <reference types="react" />
import { SettingsIndexType } from "./SettingsIndexType.type";
declare const SettingsIndexTypeModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsIndexType.type").SettingsIndexTypeContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsIndexTypeModule extends SettingsIndexTypeModule_base implements SettingsIndexType {
}
export default SettingsIndexTypeModule;
declare const SettingsIndexTypeView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsIndexTypeModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig<any>, import("@adjust/core/types").ModuleContract>, {}>>>;
export declare class SettingsIndexTypeView extends SettingsIndexTypeView_base {
    /** @override */
    renderView(): JSX.Element;
}
