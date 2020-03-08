import { ConditionalSettings } from "./conditionalSettings";
/**
 * The format in which the settings are stored on disk
 */
export declare type StoredSettings<D extends object> = {
    version: string;
    data: ConditionalSettings<D>[];
};
