/// <reference types="react" />
import { SettingsIndexPackage } from "./SettingsIndexPackage.type";
declare const SettingsIndexPackageModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        categories: {
            close(): Promise<void>;
        }[];
    };
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsIndexPackage.type").SettingsIndexPackageContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsIndexPackageModule extends SettingsIndexPackageModule_base implements SettingsIndexPackage {
    onInit(): Promise<void>;
}
export default SettingsIndexPackageModule;
declare const SettingsIndexPackageView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsIndexPackageModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class SettingsIndexPackageView extends SettingsIndexPackageView_base {
    /**
     * Renders the package header itself
     */
    protected renderPackageHeader: () => JSX.Element;
    /** @override */
    renderView(): JSX.Element;
}
