import { ModuleState } from "./moduleState";
import { SettingsConfigSet } from "../../storage/settings/_types/settingsConfigSet";
import { SettingsConfigSetData } from "../../storage/settings/_types/settingsConfigSetData";
/**
 * The data that the view receives for its representation
 */
export declare type ModuleViewData = {
    settings: SettingsConfigSetData<SettingsConfigSet>;
    state: ModuleState;
};
