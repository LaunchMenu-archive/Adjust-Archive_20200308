import { ChildModule, ParentModule } from "@adjust/core/types";
/**
 * A type used to allow the user to change settings
 */
export declare type SettingsManager = ChildModule<{
    /**
     * Opens the settings GUI
     */
    openView(): Promise<void>;
    /**
     * Selects a certain module/setting in the manager
     * @param modulePath The path of the module whose setting to show
     * @param settingPath The path to the specific setting to show
     */
    selectSetting(modulePath: string, settingPath?: string): Promise<void>;
}>;
export declare type SettingsManagerParent = ParentModule<{}>;
export declare type SettingsManagerContract = {
    parent: SettingsManagerParent;
    child: SettingsManager;
};
export declare const SettingsManagerType: import("@adjust/core/types").ContractID<SettingsManagerContract>;
