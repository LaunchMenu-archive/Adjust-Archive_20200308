import {
    createSettings,
    ExtendedObject,
    SettingColorType,
    SettingStringType,
    SettingNumberType,
    SettingJsonType,
} from "@adjust/core";
import {SettingsConfigSetData} from "@adjust/core/types";

/**
 * The theming data that can be altered
 */
export const themeSettings = {
    palette: {
        ...createSettings(
            {
                themePrimary: "#0078d4",
                themeLighterAlt: "#f3f9fd",
                themeLighter: "#d0e7f8",
                themeLight: "#a9d3f2",
                themeTertiary: "#5ca9e5",
                themeSecondary: "#1a86d9",
                themeDarkAlt: "#006cbe",
                themeDark: "#005ba1",
                themeDarker: "#004377",

                neutralLighterAlt: "#f8f8f8",
                neutralLighter: "#f4f4f4",
                neutralLight: "#eaeaea",
                neutralQuaternaryAlt: "#dadada",
                neutralQuaternary: "#d0d0d0",
                neutralTertiaryAlt: "#c8c8c8",
                neutralTertiary: "#bab8b7",
                neutralSecondary: "#a3a2a0",
                neutralPrimaryAlt: "#8d8b8a",
                neutralPrimary: "#323130",
                neutralDark: "#605e5d",
                black: "#494847",
                white: "#ffffff",
            },
            {type: SettingColorType}
        ),
        ...createSettings(
            {
                accent: "#0078d4",
                blackTranslucent40: "rgba(0,0,0,.4)",
                whiteTranslucent40: "rgba(255,255,255,.4)",
                yellowDark: "#d29200",
                yellow: "#ffb900",
                yellowLight: "#fff100",
                orange: "#d83b01",
                orangeLight: "#ea4300",
                orangeLighter: "#ff8c00",
                redDark: "#a4262c",
                red: "#e81123",
                magentaDark: "#5c005c",
                magenta: "#b4009e",
                magentaLight: "#e3008c",
                purpleDark: "#32145a",
                purple: "#5c2d91",
                purpleLight: "#b4a0ff",
                blueDark: "#002050",
                blueMid: "#00188f",
                blue: "#0078d4",
                blueLight: "#00bcf2",
                tealDark: "#004b50",
                teal: "#008272",
                tealLight: "#00b294",
                greenDark: "#004b1c",
                green: "#107c10",
                greenLight: "#bad80a",
            },
            {type: SettingColorType}
        ),
    },
    customPalette: {
        default: {
            primary: "themePrimary",
            primaryDark: "themeDarkAlt",
            primaryLight: "themeLight",
        },
        type: SettingJsonType, // TODO: make an appropriate input
    },
    icons: createSettings(
        {
            close: "react-icons/md/MdClose",
            maximize: "react-icons/md/MdWebAsset",
            minimize: "react-icons/md/MdRemove",
            emoji: "react-icons/md/MdMood",
            left: "react-icons/md/MdKeyboardArrowLeft",
            right: "react-icons/md/MdKeyboardArrowRight",
        },
        {type: SettingStringType} // TODO: make an appropriate input
    ),
    spacing: createSettings(
        {
            xxs: 2 as number | string,
            xs: 5 as number | string,
            s: 10 as number | string,
            m: 15 as number | string,
            l: 20 as number | string,
            xl: 25 as number | string,
            xxl: 30 as number | string,
        },
        {type: SettingNumberType} // TODO: make an appropriate input
    ),
    fontStyles: createSettings(
        {
            tiny: {fontSize: "10px"},
            xSmall: {fontSize: "10px"},
            small: {fontSize: "12px"},
            smallPlus: {fontSize: "12px"},
            medium: {fontSize: "14px"},
            mediumPlus: {fontSize: "16px"},
            large: {fontSize: "18px"},
            xLarge: {
                fontSize: "20px",
                fontWeight: 600,
            },
            xLargePlus: {
                fontSize: "24px",
                fontWeight: 600,
            },
            xxLarge: {
                fontSize: "28px",
                fontWeight: 600,
            },
            xxLargePlus: {
                fontSize: "32px",
                fontWeight: 600,
            },
            superLarge: {
                fontSize: "42px",
                fontWeight: 600,
            },
            mega: {
                fontSize: "68px",
                fontWeight: 600,
            },
        },
        v => ({
            default: {
                fontFamily:
                    "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif",
                fontWeight: 400,
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                ...v,
            },
            type: SettingJsonType, // TODO: make an appropriate input
        })
    ),
    shadows: createSettings(
        {
            tiny: "0 1.6px 3.6px 0 rgba(0,0,0,.132), 0 0.3px 0.9px 0 rgba(0,0,0,.108)",
            small: "0 3.2px 7.2px 0 rgba(0,0,0,.132), 0 0.6px 1.8px 0 rgba(0,0,0,.108)",
            medium: "0 6.4px 14.4px 0 rgba(0,0,0,.182), 0 1.2px 3.6px 0 rgba(0,0,0,.142)",
            large: "0 25.6px 57.6px 0 rgba(0,0,0,.22), 0 4.8px 14.4px 0 rgba(0,0,0,.18)",
        },
        {type: SettingStringType} // TODO: make an appropriate input
    ),
};

/**
 * A type of the data obtained from the theme settings
 */
export type IThemeData = SettingsConfigSetData<typeof themeSettings>;

/**
 * Maps all properties with key default to undefined, recursively
 * @param data The data tp map
 * @returns The mapping
 */
const mapUndefined = (data: object) =>
    ExtendedObject.map(data, (value, key) =>
        key == "default"
            ? undefined
            : ExtendedObject.isPlainObject(value)
            ? mapUndefined(value)
            : value
    );

/**
 * The theming data that can be altered, with all defaults initialised to undefined
 */
export const themeSettingsEmpty: typeof themeSettings = mapUndefined(themeSettings);
