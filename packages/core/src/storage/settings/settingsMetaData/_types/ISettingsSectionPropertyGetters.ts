import {SettingsConfigSet, SettingsSectionConfig} from "../../_types/settingsConfigSet";
import {SettingProperty} from "../settingProperty";
import {ISettingAttributeEvaluator} from "../../_types/ISettingAttributeEvaluator";
import {ParameterizedSettingDefinition} from "../../_types/settingDefinition";
import {SettingProperties} from "../SettingProperties";
import {SettingsSedctionProperties} from "../SettingsSectionProperties";

/**
 * The config data for a section expressed in property getters
 */
export type ISettingsSectionConfigProperties = {
    [M in keyof SettingsSectionConfig]: SettingsSectionConfig[M] extends ISettingAttributeEvaluator<
        infer V
    >
        ? (createNew?: boolean) => SettingProperty<V>
        : SettingsSectionConfig[M];
};

/**
 * The property getters for a settings section, with all settings properties being present in the form of `SettingProperty` instance getters
 */
export type ISettingsSectionPropertyGetters<
    S extends SettingsConfigSet = SettingsConfigSet
> = {
    [P in keyof S]: P extends "sectionConfig"
        ? ISettingsSectionConfigProperties
        : S[P] extends ParameterizedSettingDefinition<infer V, infer T>
        ? (createNew?: boolean) => SettingProperties<V, T>
        : S[P] extends SettingsConfigSet
        ? (createNew?: boolean) => SettingsSedctionProperties<S[P]>
        : S[P];
};
