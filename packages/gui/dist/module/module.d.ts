import { SettingsConditions, SettingsFile } from "@adjust/core";
import { LocationManager } from "../modules/location/locationManager.type";
import { Json } from "@adjust/core/types";
/**
 * A method that syncrhonizes the locations with the location manager when a module's location changes
 * @param newValue The new locations of the module
 * @param condition The condition for which the location changed
 * @param oldValue The old locations of the modulei
 * @param settingsFile An instance of the settings file in which these locations are stored
 */
export declare const synchronizedLocations: (newValue: string | string[], condition: SettingsConditions, oldValue: string | string[], settingsFile: SettingsFile<any>) => Promise<void>;
/**
 * The settings that apply to styling
 */
export declare const stylingSettings: {
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
            default: Json;
            type: string;
        };
    };
};
/**
 * The default config for modules, adds location management to the Adjust core modules
 */
export declare const baseConfig: {
    state: {};
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
                default: Json;
                type: string;
            };
        };
        location: {
            default: string | string[];
            type: string;
            onChange: (newValue: string | string[], condition: SettingsConditions, oldValue: string | string[], settingsFile: SettingsFile<any>) => Promise<void>;
        };
    };
    type: any;
};
declare const Module_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
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
                default: Json;
                type: string;
            };
        };
        location: {
            default: string | string[];
            type: string;
            onChange: (newValue: string | string[], condition: SettingsConditions, oldValue: string | string[], settingsFile: SettingsFile<any>) => Promise<void>;
        };
    };
    type: any;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").Module, import("@adjust/core").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, import("@adjust/core/types").SettingsConfig<import("@adjust/core/types").Empty>, import("@adjust/core/types").ModuleContract>>>;
/**
 * The base class to build your app using adjust gui
 *
 * Takes care of the following tasks:
 * -    Tracking modue file location for importing it
 * -    Storing a serializable state
 * -    Storing settings that can be altered by the user
 * -    Allow for theming by the user
 * -    Integrating the location system to show the module's view
 *
 */
export declare abstract class Module extends Module_base {
    protected locationManager: LocationManager;
    /** @override */
    init(fromReload: boolean): Promise<void>;
    /** @override */
    stop(): Promise<void>;
    /**
     * Opens the module view(s) using the location manager, according to the module's settings
     */
    protected openViews(): Promise<void>;
    /**
     * Closes the module view(s) using the location manager, according tot he module's settings
     */
    protected closeViews(): Promise<void>;
    /**
     * Shows the GUI of this module at its locations
     * @param locations The locations to show this module at (provided it's already opened there)
     */
    protected show(locations?: string[] | string): Promise<void>;
}
export {};
