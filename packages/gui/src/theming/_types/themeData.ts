export type ThemeColors = {
    themePrimary: string;
    themeLighterAlt: string;
    themeLighter: string;
    themeLight: string;
    themeTertiary: string;
    themeSecondary: string;
    themeDarkAlt: string;
    themeDark: string;
    themeDarker: string;

    neutralLighterAlt: string;
    neutralLighter: string;
    neutralLight: string;
    neutralQuaternaryAlt: string;
    neutralQuaternary: string;
    neutralTertiaryAlt: string;
    neutralTertiary: string;
    neutralSecondary: string;
    neutralPrimaryAlt: string;
    neutralPrimary: string;
    neutralDark: string;
    black: string;
    white: string;
};
export type ThemeSpacing = {
    xxs: number | string;
    xs: number | string;
    s: number | string;
    m: number | string;
    l: number | string;
    xl: number | string;
    xxl: number | string;
};
export type ThemeFontSize = {
    extraSmall: number | string;
    small: number | string;
    medium: number | string;
    large: number | string;
    heading: number | string;
    headingLarge: number | string;
};
export type ThemeShadows = {
    tiny: string;
    small: string;
    medium: string;
    large: string;
};

export type ThemeData = {
    colors: ThemeColors;
    colorAliases: {
        [name: string]: string;
    };
    icons: {
        [name: string]: string | JSX.Element | (() => JSX.Element);
    };
    spacing: ThemeSpacing;
    fontSize: ThemeFontSize;
    shadows: ThemeShadows;
};
