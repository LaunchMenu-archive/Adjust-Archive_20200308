/// <reference types="react" />
import { SettingsIndex } from "./SettingsIndex.type";
import { ISettingsIndex } from "../../_types/ISettingsIndex";
declare const SettingsIndexModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        types: Promise<{
            close(): Promise<void>;
        }>[];
        modules: Promise<{
            close(): Promise<void>;
        }>[];
    };
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsIndex.type").SettingsIndexContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../..").Module, import("../../../..").Module>>;
export declare class SettingsIndexModule extends SettingsIndexModule_base implements SettingsIndex {
    /** @override */
    setData(index: ISettingsIndex): Promise<void>;
    /** @override */
    setSearch(search: RegExp | string): Promise<void>;
}
export default SettingsIndexModule;
declare const SettingsIndexView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsIndexModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../..").ModuleView, import("../../../..").ModuleView<{}, {}, import("../../../..").Module, {}>>>;
export declare class SettingsIndexView extends SettingsIndexView_base {
    /** @override */
    renderView(): JSX.Element;
}
