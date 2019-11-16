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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                blackTranslucent40: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                whiteTranslucent40: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                yellowDark: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                yellow: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                yellowLight: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                orange: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                orangeLight: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                orangeLighter: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                redDark: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                red: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                magentaDark: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                magenta: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                magentaLight: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                purpleDark: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                purple: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                purpleLight: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                blueDark: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                blueMid: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                blue: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                blueLight: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                tealDark: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                teal: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                tealLight: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                greenDark: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                green: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                greenLight: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                themePrimary: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                themeLighterAlt: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                themeLighter: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                themeLight: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                themeTertiary: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                themeSecondary: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                themeDarkAlt: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                themeDark: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                themeDarker: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralLighterAlt: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralLighter: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralLight: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralQuaternaryAlt: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralQuaternary: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralTertiaryAlt: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralTertiary: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralSecondary: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralPrimaryAlt: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralPrimary: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                neutralDark: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                black: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                white: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
            };
            icons: {
                close: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                maximize: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                minimize: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                emoji: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                left: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                right: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
            };
            spacing: {
                xxs: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                        min?: number;
                        max?: number;
                        rounding?: number;
                    }>>;
                } & {
                    default: string | number;
                };
                xs: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                        min?: number;
                        max?: number;
                        rounding?: number;
                    }>>;
                } & {
                    default: string | number;
                };
                s: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                        min?: number;
                        max?: number;
                        rounding?: number;
                    }>>;
                } & {
                    default: string | number;
                };
                m: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                        min?: number;
                        max?: number;
                        rounding?: number;
                    }>>;
                } & {
                    default: string | number;
                };
                l: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                        min?: number;
                        max?: number;
                        rounding?: number;
                    }>>;
                } & {
                    default: string | number;
                };
                xl: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                        min?: number;
                        max?: number;
                        rounding?: number;
                    }>>;
                } & {
                    default: string | number;
                };
                xxl: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                        min?: number;
                        max?: number;
                        rounding?: number;
                    }>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
                };
            };
            shadows: {
                tiny: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                small: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                medium: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
                large: {
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                } & {
                    default: string;
                };
            };
        };
        resetTheme: {
            default: boolean;
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<boolean, undefined>>;
        };
        css: {
            default: Json;
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blackTranslucent40: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    whiteTranslucent40: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    yellowDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    yellow: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    yellowLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    orange: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    orangeLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    orangeLighter: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    redDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    red: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    magentaDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    magenta: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    magentaLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    purpleDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    purple: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    purpleLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blueDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blueMid: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blue: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blueLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    tealDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    teal: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    tealLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    greenDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    green: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    greenLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themePrimary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeLighterAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeLighter: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeTertiary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeSecondary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeDarkAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeDarker: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralLighterAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralLighter: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralQuaternaryAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralQuaternary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralTertiaryAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralTertiary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralSecondary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralPrimaryAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralPrimary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    black: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    white: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
                };
                icons: {
                    close: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    maximize: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    minimize: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    emoji: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    left: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    right: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                };
                spacing: {
                    xxs: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    xs: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    s: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    m: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    l: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    xl: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    xxl: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
                    };
                };
                shadows: {
                    tiny: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    small: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    medium: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    large: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                };
            };
            resetTheme: {
                default: boolean;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<boolean, undefined>>;
            };
            css: {
                default: Json;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
            };
        };
        location: {
            default: string | string[];
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blackTranslucent40: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    whiteTranslucent40: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    yellowDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    yellow: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    yellowLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    orange: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    orangeLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    orangeLighter: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    redDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    red: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    magentaDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    magenta: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    magentaLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    purpleDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    purple: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    purpleLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blueDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blueMid: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blue: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    blueLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    tealDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    teal: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    tealLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    greenDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    green: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    greenLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themePrimary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeLighterAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeLighter: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeTertiary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeSecondary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeDarkAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    themeDarker: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralLighterAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralLighter: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralLight: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralQuaternaryAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralQuaternary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralTertiaryAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralTertiary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralSecondary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralPrimaryAlt: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralPrimary: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    neutralDark: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    black: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    white: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
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
                    type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
                };
                icons: {
                    close: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    maximize: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    minimize: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    emoji: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    left: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    right: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                };
                spacing: {
                    xxs: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    xs: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    s: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    m: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    l: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    xl: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
                    } & {
                        default: string | number;
                    };
                    xxl: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                            min?: number;
                            max?: number;
                            rounding?: number;
                        }>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
                    };
                };
                shadows: {
                    tiny: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    small: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    medium: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                    large: {
                        type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>;
                    } & {
                        default: string;
                    };
                };
            };
            resetTheme: {
                default: boolean;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<boolean, undefined>>;
            };
            css: {
                default: Json;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
            };
        };
        location: {
            default: string | string[];
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<Json, undefined>>;
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
 * -    Tracking module file location for importing it
 * -    Storing a serializable state
 * -    Storing settings that can be altered by the user
 * -    Allow for theming by the user
 * -    Integrating the location system to show the module's view
 *
 */
export declare abstract class Module extends Module_base {
    protected locationManager: LocationManager;
    /** @override */
    init(): Promise<void>;
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
