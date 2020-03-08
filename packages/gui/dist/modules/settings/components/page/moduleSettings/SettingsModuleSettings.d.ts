/// <reference types="react" />
import { SettingsModuleSettings } from "./SettingsModuleSettings.type";
import { ParameterizedSettingsFile } from "@adjust/core";
import { SettingsConfigSet, PropertySettingsSectionConfig, ParameterizedPropertySettingDefinition } from "@adjust/core/types";
import { SettingsSetProperties } from "@adjust/core/dist/storage/settings/settingsMetaData/settingsSetProperties";
import { SettingProperty } from "@adjust/core/dist/storage/settings/settingsMetaData/settingProperty";
import { IModuleSettingsState, ISettingState, ISectionState } from "./_types/IModuleSettingsState";
declare const SettingsModuleSettingsModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        conditions: {
            name: string;
            id: number;
        }[];
        settings: IModuleSettingsState<SettingsConfigSet>;
        loadingSettings: boolean;
    };
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./SettingsModuleSettings.type").SettingsModuleSettingsContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").Module, import("../../../../..").Module>>;
export declare class SettingsModuleSettingsModule extends SettingsModuleSettingsModule_base implements SettingsModuleSettings {
    protected settingFile: ParameterizedSettingsFile;
    protected selectedSettingsProperties: SettingsSetProperties<SettingsConfigSet>;
    /** @override */
    onInit(): Promise<void>;
    /**
     * Selects the settings set to be displayed on the screen
     * @param conditions The name or index of the conditions for the set to select
     */
    selectSettingsSet(conditions: number | string): void;
    /**
     * Adds the properties to the state and registers its listeners
     * @param properties The properties to store
     */
    protected setupPropertiesSetListers(properties: SettingsSetProperties<SettingsConfigSet>): Promise<void>;
    /**
     * Setup properties of a section
     * @param config The section config
     * @param path The path to the section config
     */
    protected setupSectionProperties(config: PropertySettingsSectionConfig, path: string): ISectionState;
    /**
     * Setup properties of a setting
     * @param setting The setting object
     * @param path The path to the setting
     */
    protected setupSettingProperties(setting: ParameterizedPropertySettingDefinition, path: string): Promise<ISettingState>;
    /**
     * Sets up a property listener
     * @param property The property
     * @param path The path of the property
     */
    protected setupProperty<V>(property: SettingProperty<V>, path: string): V;
}
export default SettingsModuleSettingsModule;
declare const SettingsModuleSettingsView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof SettingsModuleSettingsModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../..").ModuleView, import("../../../../..").ModuleView<{}, {}, import("../../../../..").Module, {}>>>;
export declare class SettingsModuleSettingsView extends SettingsModuleSettingsView_base {
    /**
     * Renders a given setting
     * @param setting The setting to render
     */
    protected renderSetting(setting: ISettingState): JSX.Element;
    /**
     * Renders a sefic section
     * @param section The section to render
     */
    protected renderSection(section: IModuleSettingsState<any>): JSX.Element;
    /** @override */
    renderView(): JSX.Element;
}
