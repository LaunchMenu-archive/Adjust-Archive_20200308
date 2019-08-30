import {string} from "prop-types";

/**
 * A type representing package data in the index
 */
export type ISettingsIndexPackage<T> = {
    name: string;
    repository: {
        type: string;
        url: string;
    };
    description: string;
    children: {[name: string]: T};
};
