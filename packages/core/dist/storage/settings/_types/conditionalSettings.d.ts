import { SerializedSettingsConditions } from "../settingsConditions/_types/serializedSettingsConditions";
/**
 * Settings that apply only when the given condition is met
 */
export declare type ConditionalSettings<D extends object> = {
    condition: SerializedSettingsConditions;
    ID: number;
    data: D;
};
