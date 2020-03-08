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
                    search: {
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
            resetTheme: {
                default: boolean;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<boolean, undefined>>;
            };
            css: {
                default: import("@adjust/core/types").Json;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./locationAncestor.type").LocationAncestorContract>;
    abstract: true;
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
                    search: {
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
            resetTheme: {
                default: boolean;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<boolean, undefined>>;
            };
            css: {
                default: import("@adjust/core/types").Json;
                type: import("@adjust/core/types").ContractID<import("@adjust/core/types").SettingInputContract<import("@adjust/core/types").Json, undefined>>;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./locationAncestor.type").LocationAncestorContract>;
    abstract: true;
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
    protected onInit(): Promise<void>;
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
