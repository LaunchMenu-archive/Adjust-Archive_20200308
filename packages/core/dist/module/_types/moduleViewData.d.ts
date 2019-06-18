import { ModuleState } from "./moduleState";
import { SettingsData } from "../../storage/settings/_types/settingsData";
import { SettingsConfig } from "../../storage/settings/_types/settingsConfig";
/**
 * The data that the view receives for its representation
 */
export declare type ModuleViewData = {
    settings: SettingsData<SettingsConfig>;
    state: ModuleState;
};
