Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
/**
 * The theming data that can be altered
 */
exports.themeSettings = {
    palette: Object.assign({}, core_1.createSettings({
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
    }, { type: core_1.SettingColorType }), core_1.createSettings({
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
    }, { type: core_1.SettingColorType })),
    customPalette: {
        default: {
            primary: "themePrimary",
            primaryDark: "themeDarkAlt",
            primaryLight: "themeLight",
        },
        type: core_1.SettingJsonType,
    },
    icons: core_1.createSettings({
        close: "react-icons/md/MdClose",
        maximize: "react-icons/md/MdWebAsset",
        minimize: "react-icons/md/MdRemove",
        emoji: "react-icons/md/MdMood",
        left: "react-icons/md/MdKeyboardArrowLeft",
        right: "react-icons/md/MdKeyboardArrowRight",
    }, { type: core_1.SettingStringType } // TODO: make an appropriate input
    ),
    spacing: core_1.createSettings({
        xxs: 2,
        xs: 5,
        s: 10,
        m: 15,
        l: 20,
        xl: 25,
        xxl: 30,
    }, { type: core_1.SettingNumberType } // TODO: make an appropriate input
    ),
    fontStyles: core_1.createSettings({
        tiny: { fontSize: "10px" },
        xSmall: { fontSize: "10px" },
        small: { fontSize: "12px" },
        smallPlus: { fontSize: "12px" },
        medium: { fontSize: "14px" },
        mediumPlus: { fontSize: "16px" },
        large: { fontSize: "18px" },
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
    }, v => ({
        default: Object.assign({ fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif", fontWeight: 400, MozOsxFontSmoothing: "grayscale", WebkitFontSmoothing: "antialiased" }, v),
        type: core_1.SettingJsonType,
    })),
    shadows: core_1.createSettings({
        tiny: "0 1.6px 3.6px 0 rgba(0,0,0,.132), 0 0.3px 0.9px 0 rgba(0,0,0,.108)",
        small: "0 3.2px 7.2px 0 rgba(0,0,0,.132), 0 0.6px 1.8px 0 rgba(0,0,0,.108)",
        medium: "0 6.4px 14.4px 0 rgba(0,0,0,.182), 0 1.2px 3.6px 0 rgba(0,0,0,.142)",
        large: "0 25.6px 57.6px 0 rgba(0,0,0,.22), 0 4.8px 14.4px 0 rgba(0,0,0,.18)",
    }, { type: core_1.SettingStringType } // TODO: make an appropriate input
    ),
};
/**
 * Maps all properties with key default to undefined, recursively
 * @param data The data tp map
 * @returns The mapping
 */
const mapUndefined = (data) => core_1.ExtendedObject.map(data, (value, key) => key == "default"
    ? undefined
    : core_1.ExtendedObject.isPlainObject(value)
        ? mapUndefined(value)
        : value);
/**
 * The theming data that can be altered, with all defaults initialised to undefined
 */
exports.themeSettingsEmpty = mapUndefined(exports.themeSettings);
//# sourceMappingURL=themeSettings.js.map