/// <reference types="react" />
/**
 * A component to extend the theme from the context, and provide it in the new context
 * @param props The properties of the component
 * @returns A JSX element
 */
export declare const ThemeExtender: ({ children, themeChanges, resetTheme, }: {
    /** The children function that receives the theme */
    children: (ITheme: any) => JSX.Element;
    /** The changes to apply to the theme */
    themeChanges: {
        palette?: {
            themePrimary?: string;
            themeLighterAlt?: string;
            themeLighter?: string;
            themeLight?: string;
            themeTertiary?: string;
            themeSecondary?: string;
            themeDarkAlt?: string;
            themeDark?: string;
            themeDarker?: string;
            neutralLighterAlt?: string;
            neutralLighter?: string;
            neutralLight?: string;
            neutralQuaternaryAlt?: string;
            neutralQuaternary?: string;
            neutralTertiaryAlt?: string;
            neutralTertiary?: string;
            neutralSecondary?: string;
            neutralPrimaryAlt?: string;
            neutralPrimary?: string;
            neutralDark?: string;
            black?: string;
            white?: string;
            accent?: string;
            blackTranslucent40?: string;
            whiteTranslucent40?: string;
            yellowDark?: string;
            yellow?: string;
            yellowLight?: string;
            orange?: string;
            orangeLight?: string;
            orangeLighter?: string;
            redDark?: string;
            red?: string;
            magentaDark?: string;
            magenta?: string;
            magentaLight?: string;
            purpleDark?: string;
            purple?: string;
            purpleLight?: string;
            blueDark?: string;
            blueMid?: string;
            blue?: string;
            blueLight?: string;
            tealDark?: string;
            teal?: string;
            tealLight?: string;
            greenDark?: string;
            green?: string;
            greenLight?: string;
        };
        customPalette?: {
            primary?: string;
            primaryDark?: string;
            primaryLight?: string;
        };
        icons?: {
            close?: string;
            maximize?: string;
            minimize?: string;
            emoji?: string;
            left?: string;
            right?: string;
            search?: string;
        };
        spacing?: {
            xxs?: string | number;
            xs?: string | number;
            s?: string | number;
            m?: string | number;
            l?: string | number;
            xl?: string | number;
            xxl?: string | number;
        };
        fontStyles?: {
            tiny?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            xSmall?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            small?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            smallPlus?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            medium?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            mediumPlus?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            large?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            xLarge?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            xLargePlus?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            xxLarge?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            xxLargePlus?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            superLarge?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
            mega?: {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: number;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            } | {
                fontSize?: string;
                fontWeight?: number;
                fontFamily?: string;
                MozOsxFontSmoothing?: string;
                WebkitFontSmoothing?: string;
            };
        };
        shadows?: {
            tiny?: string;
            small?: string;
            medium?: string;
            large?: string;
        };
    };
    /** Whether or not the theme should be extended from the base theme, rather than an inherited theme */
    resetTheme: boolean;
}) => JSX.Element;
