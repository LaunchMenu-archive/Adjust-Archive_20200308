import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";

/**
 * A type used to allow the user to change settings
 */
export type SettingsManager = ChildModule<{
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
export type SettingsManagerParent = ParentModule<{}>;
export type SettingsManagerContract = {
    parent: SettingsManagerParent;
    child: SettingsManager;
};

// Export the settingsManagerID type
export const SettingsManagerType = Registry.createContractID<SettingsManagerContract>(
    __filename
);
