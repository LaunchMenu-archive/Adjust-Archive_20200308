/// <reference types="react" />
import { SettingString } from "@adjust/core";
declare const SettingsStringInputModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        value: string;
    };
    settings: {};
    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsStringInputModule extends SettingsStringInputModule_base implements SettingString {
    /** @override */
    setValue(value: string): Promise<void>;
    /**
     * Sends the new value to this module's parent
     */
    updateValue(): void;
    /** @override */
    setConstraint(constraint: undefined): Promise<void>;
}
export default SettingsStringInputModule;
declare const SettingsModuleSettingsView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsStringInputModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class SettingsModuleSettingsView extends SettingsModuleSettingsView_base {
    /** @override */
    renderView(): JSX.Element;
}
