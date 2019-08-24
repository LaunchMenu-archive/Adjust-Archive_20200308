import { ModuleReference, SettingsConditions } from "@adjust/core";
import { LocationPath } from "../_types/LocationPath";
import { LocationAncestor, LocationAncestorParent } from "./locationAncestor.type";
import { LocationsMoveData } from "../_types/LocationsMoveData";
import { ModuleLocation } from "../../../module/_types/ModuleLocation";
export declare const config: {
    state: {
        inEditMode: boolean;
        inDropMode: boolean;
    };
    settings: {
        styleOverride: {
            theme: {
                palette: {
                    accent: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blackTranslucent40: {
                        type: string;
                    } & {
                        default: string;
                    };
                    whiteTranslucent40: {
                        type: string;
                    } & {
                        default: string;
                    };
                    yellowDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    yellow: {
                        type: string;
                    } & {
                        default: string;
                    };
                    yellowLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    orange: {
                        type: string;
                    } & {
                        default: string;
                    };
                    orangeLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    orangeLighter: {
                        type: string;
                    } & {
                        default: string;
                    };
                    redDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    red: {
                        type: string;
                    } & {
                        default: string;
                    };
                    magentaDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    magenta: {
                        type: string;
                    } & {
                        default: string;
                    };
                    magentaLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    purpleDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    purple: {
                        type: string;
                    } & {
                        default: string;
                    };
                    purpleLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blueDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blueMid: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blue: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blueLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    tealDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    teal: {
                        type: string;
                    } & {
                        default: string;
                    };
                    tealLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    greenDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    green: {
                        type: string;
                    } & {
                        default: string;
                    };
                    greenLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themePrimary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeLighterAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeLighter: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeTertiary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeSecondary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeDarkAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeDarker: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralLighterAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralLighter: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralQuaternaryAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralQuaternary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralTertiaryAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralTertiary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralSecondary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralPrimaryAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralPrimary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    black: {
                        type: string;
                    } & {
                        default: string;
                    };
                    white: {
                        type: string;
                    } & {
                        default: string;
                    };
                };
                customPalette: {
                    /**
                     * Extracts the relevant hints for this ancestor from a module locatio;n
                     * @param location The location and its creation hints
                     * @returns Any hints that might have been provided
                     */
                    default: {
                        primary: string;
                        primaryDark: string;
                        primaryLight: string;
                    };
                    type: string;
                };
                icons: {
                    close: {
                        type: string;
                    } & {
                        default: string;
                    };
                    maximize: {
                        type: string;
                    } & {
                        default: string;
                    };
                    minimize: {
                        type: string;
                    } & {
                        default: string;
                    };
                    emoji: {
                        type: string;
                    } & {
                        default: string;
                    };
                    left: {
                        type: string;
                    } & {
                        default: string;
                    };
                    right: {
                        type: string;
                    } & {
                        default: string;
                    };
                };
                spacing: {
                    xxs: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    xs: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    s: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    m: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    l: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    xl: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    xxl: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                };
                fontStyles: {
                    tiny: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xSmall: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    small: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    smallPlus: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    medium: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    mediumPlus: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    large: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xLarge: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xLargePlus: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xxLarge: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xxLargePlus: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    superLarge: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    mega: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                };
                shadows: {
                    tiny: {
                        type: string;
                    } & {
                        default: string;
                    };
                    small: {
                        type: string;
                    } & {
                        default: string;
                    };
                    medium: {
                        type: string;
                    } & {
                        default: string;
                    };
                    large: {
                        type: string;
                    } & {
                        default: string;
                    };
                };
            };
            resetTheme: {
                default: boolean;
                type: string;
            };
            css: {
                default: import("@adjust/core/types").Json;
                type: string;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./locationAncestor.type").LocationAncestorContract>;
    abstract: boolean;
};
declare const LocationAncestorModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        inEditMode: boolean;
        inDropMode: boolean;
    };
    settings: {
        styleOverride: {
            theme: {
                palette: {
                    accent: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blackTranslucent40: {
                        type: string;
                    } & {
                        default: string;
                    };
                    whiteTranslucent40: {
                        type: string;
                    } & {
                        default: string;
                    };
                    yellowDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    yellow: {
                        type: string;
                    } & {
                        default: string;
                    };
                    yellowLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    orange: {
                        type: string;
                    } & {
                        default: string;
                    };
                    orangeLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    orangeLighter: {
                        type: string;
                    } & {
                        default: string;
                    };
                    redDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    red: {
                        type: string;
                    } & {
                        default: string;
                    };
                    magentaDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    magenta: {
                        type: string;
                    } & {
                        default: string;
                    };
                    magentaLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    purpleDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    purple: {
                        type: string;
                    } & {
                        default: string;
                    };
                    purpleLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blueDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blueMid: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blue: {
                        type: string;
                    } & {
                        default: string;
                    };
                    blueLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    tealDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    teal: {
                        type: string;
                    } & {
                        default: string;
                    };
                    tealLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    greenDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    green: {
                        type: string;
                    } & {
                        default: string;
                    };
                    greenLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themePrimary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeLighterAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeLighter: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeTertiary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeSecondary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeDarkAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    themeDarker: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralLighterAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralLighter: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralLight: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralQuaternaryAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralQuaternary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralTertiaryAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralTertiary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralSecondary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralPrimaryAlt: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralPrimary: {
                        type: string;
                    } & {
                        default: string;
                    };
                    neutralDark: {
                        type: string;
                    } & {
                        default: string;
                    };
                    black: {
                        type: string;
                    } & {
                        default: string;
                    };
                    white: {
                        type: string;
                    } & {
                        default: string;
                    };
                };
                customPalette: {
                    /**
                     * Extracts the relevant hints for this ancestor from a module locatio;n
                     * @param location The location and its creation hints
                     * @returns Any hints that might have been provided
                     */
                    default: {
                        primary: string;
                        primaryDark: string;
                        primaryLight: string;
                    };
                    type: string;
                };
                icons: {
                    close: {
                        type: string;
                    } & {
                        default: string;
                    };
                    maximize: {
                        type: string;
                    } & {
                        default: string;
                    };
                    minimize: {
                        type: string;
                    } & {
                        default: string;
                    };
                    emoji: {
                        type: string;
                    } & {
                        default: string;
                    };
                    left: {
                        type: string;
                    } & {
                        default: string;
                    };
                    right: {
                        type: string;
                    } & {
                        default: string;
                    };
                };
                spacing: {
                    xxs: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    xs: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    s: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    m: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    l: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    xl: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                    xxl: {
                        type: string;
                    } & {
                        default: string | number;
                    };
                };
                fontStyles: {
                    tiny: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xSmall: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    small: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    smallPlus: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    medium: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    mediumPlus: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    large: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xLarge: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xLargePlus: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xxLarge: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    xxLargePlus: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    superLarge: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                    mega: {
                        default: {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontFamily: string;
                            fontWeight: number;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            /**
                             * Gets the child location ancestor given a specified location path
                             * @param ID The ID of the child, may be left out if the child has the same ID
                             * Leaving it out would result in this instance and child sharing the same ID and path
                             * @returns The child ancestor
                             */
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        } | {
                            fontSize: string;
                            fontWeight: number;
                            fontFamily: string;
                            MozOsxFontSmoothing: string;
                            WebkitFontSmoothing: string;
                        };
                        type: string;
                    };
                };
                shadows: {
                    tiny: {
                        type: string;
                    } & {
                        default: string;
                    };
                    small: {
                        type: string;
                    } & {
                        default: string;
                    };
                    medium: {
                        type: string;
                    } & {
                        default: string;
                    };
                    large: {
                        type: string;
                    } & {
                        default: string;
                    };
                };
            };
            resetTheme: {
                default: boolean;
                type: string;
            };
            css: {
                default: import("@adjust/core/types").Json;
                type: string;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./locationAncestor.type").LocationAncestorContract>;
    abstract: boolean;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").Module, import("@adjust/core").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, import("@adjust/core/types").SettingsConfig<import("@adjust/core/types").Empty>, import("@adjust/core/types").ModuleContract>>>;
/**
 * A base class for location ancestors to extend,
 * provides some common methods that location ancestors might use
 * Note that we use adjust core's createModule, since location ancestors shouldn't have any location data themselves
 */
export default class LocationAncestorModule extends LocationAncestorModule_base implements LocationAncestorParent {
    protected readonly ancestorName: string;
    protected settingsConditions: SettingsConditions;
    /** @override */
    protected onInit(fromReload: boolean): Promise<void>;
    /**
     * Either gets the next ID from the path, or generates it and stores it in the path
     * @param path The location path to get the ID from
     * @returns the obtained or generated ID as well as the passed or updated path
     */
    protected getExtractID(path: LocationPath): {
        path: LocationPath;
        ID: string;
    };
    /**
     * Extracts the relevant hints for this ancestor from a module locatio;n
     * @param location The location and its creation hints
     * @returns Any hints that might have been provided
     */
    protected getLocationHints(location: ModuleLocation): object;
    /**
     * Gets the child location ancestor given a specified location path
     * @param inpPath The path to obtain the child by
     * @returns The ID of the child, as well as the child itself
     */
    protected getChildLocationAncestorFromPath(inpPath: LocationPath): Promise<{
        ID: string;
        path: LocationPath;
        locationAncestor: LocationAncestor;
    }>;
    /**
     * Gets the child location ancestor given a specified location path
     * @param ID The ID of the child, may be left out if the child has the same ID
     * Leaving it out would result in this instance and child sharing the same ID and path
     * @returns The child ancestor
     */
    protected getChildLocationAncestor(ID?: string): Promise<LocationAncestor>;
    /** @override */
    setEditMode(edit: boolean): Promise<any>;
    /** @override */
    setDropMode(drop: boolean): Promise<void>;
    /** @override */
    setLocationsMoveData(data: LocationsMoveData): Promise<boolean>;
    /** @override */
    updateLocationsMoveData(data: LocationsMoveData): Promise<boolean>;
    /** @override */
    getLocationsMoveData(): Promise<LocationsMoveData>;
    /** @override */
    getLocationsAtPath(partialPath: string[]): Promise<ModuleLocation[]>;
    /** @override */
    getModulesAtPath(partialPath: string[]): Promise<ModuleReference[]>;
    /** @override */
    getLocationPath(location: string): Promise<LocationPath>;
    /** @override */
    updateMovedLocations(delay?: number): Promise<void>;
}
export {};
