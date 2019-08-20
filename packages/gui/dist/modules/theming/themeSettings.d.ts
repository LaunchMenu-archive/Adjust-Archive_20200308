import { SettingsConfigSetData } from "@adjust/core/types";
/**
 * The theming data that can be altered
 */
export declare const themeSettings: {
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
/**
 * A type of the data obtained from the theme settings
 */
export declare type IThemeData = SettingsConfigSetData<typeof themeSettings>;
/**
 * The theming data that can be altered, with all defaults initialised to undefined
 */
export declare const themeSettingsEmpty: typeof themeSettings;
