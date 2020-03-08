import { ReactNode } from "react";
/**
 * Returns whether this setting should show up given the current search term
 * @param dependencies The values of the properties the decision is dependent on
 * @param searchValue The current search term
 * @returns Whether to exclude (if true) the given setting
 */
export declare function filterSettingFromSearch({ 
/** The tags of the setting */
tags, 
/** The name of the setting */
name, 
/** The description of the setting */
description, }: {
    tags: string[];
    name: ReactNode;
    description: ReactNode;
}, searchValue: string): boolean;
