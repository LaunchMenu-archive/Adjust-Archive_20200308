/// <reference path="../../../React.d.ts" />
import { CSSProperties } from "react";
import { Themer } from "../themer.type";
import { IThemeData } from "../themeSettings";
import { ITheme } from "../_types/ITheme";
export declare const themerConfig: {
    state: {};
    getPriority: () => number;
    settings: {
        palette: {
            accent: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blackTranslucent40: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            whiteTranslucent40: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            yellowDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            yellow: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            yellowLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            orange: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            orangeLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            orangeLighter: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            redDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            red: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            magentaDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            magenta: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            magentaLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            purpleDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            purple: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            purpleLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blueDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blueMid: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blue: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blueLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            tealDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            teal: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            tealLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            greenDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            green: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            greenLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
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
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                default: import("react").ReactText;
            };
            xs: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            s: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            m: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            l: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            xl: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            xxl: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
    type: import("@adjust/core/types").ContractID<import("../themer.type").ThemerContract>;
};
declare const ThemerModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {};
    getPriority: () => number;
    settings: {
        palette: {
            accent: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blackTranslucent40: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            whiteTranslucent40: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            yellowDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            yellow: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            yellowLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            orange: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            orangeLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            orangeLighter: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            redDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            red: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            magentaDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            magenta: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            magentaLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            purpleDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            purple: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            purpleLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blueDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blueMid: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blue: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            blueLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            tealDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            teal: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            tealLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            greenDark: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            green: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
            } & {
                default: string;
            };
            greenLight: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<string, undefined>>; /** @override  */
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
            type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                default: import("react").ReactText;
            };
            xs: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            s: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            m: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            l: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            xl: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
            };
            xxl: {
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<number, {
                    min?: number;
                    max?: number;
                    rounding?: number;
                }>>;
            } & {
                default: import("react").ReactText;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
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
    type: import("@adjust/core/types").ContractID<import("../themer.type").ThemerContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../..").Module, import("../../..").Module>>;
/**
 * A module of this type is used as the root of the module
 */
export declare class ThemerModule extends ThemerModule_base implements Themer {
    protected theme: ITheme;
    /** @override */
    protected onPreInit(): Promise<void>;
    /** @override */
    protected onInit(fromReload: boolean): Promise<void>;
    /**
     * Updates the theme object and notifies all the parents
     * @param field The field that has been altered
     */
    protected updateTheme(field: string): void;
    /** @override */
    getColor(colorName: keyof IThemeData["palette"] | keyof IThemeData["customPalette"]): Promise<string>;
    /** @override */
    getSpacing(spacingName: keyof IThemeData["spacing"]): Promise<string | number>;
    /** @override */
    getFontStyle(styleName: keyof IThemeData["fontStyles"]): Promise<CSSProperties>;
    /** @override */
    getShadow(shadowName: keyof IThemeData["shadows"]): Promise<string>;
}
export default ThemerModule;
declare const ThemerView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof ThemerModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig<any>, import("@adjust/core/types").ModuleContract>, {}>>>;
export declare class ThemerView extends ThemerView_base {
    /** @override  */
    renderView(): JSX.Element;
}
