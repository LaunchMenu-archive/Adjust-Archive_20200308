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
declare const SettingsIndexTypeView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsIndexTypeModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class SettingsIndexTypeView extends SettingsIndexTypeView_base {
    /** @override */
    renderView(): JSX.Element;
}
