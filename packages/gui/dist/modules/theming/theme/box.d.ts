/// <reference path="../../../React.d.ts" />
/// <reference types="react" />
import { ITheme } from "../_types/ITheme";
/**
 * A standard box element, which takes attributes/properties and translates them to css
 * @param props
 */
export declare const Box: (props: {
    children?: any;
    as?: string | import("react").ComponentClass<{}, any> | import("react").FunctionComponent<{}>;
    shadow?: "tiny" | "small" | "medium" | "large";
    shadowCustom?: string;
    font?: import("react").CSSProperties | "tiny" | "xSmall" | "small" | "smallPlus" | "medium" | "mediumPlus" | "large" | "xLarge" | "xLargePlus" | "xxLarge" | "xxLargePlus" | "superLarge" | "mega";
    fontCustom?: import("react").CSSProperties;
    className?: string;
    style?: import("react").CSSProperties;
} & {
    marginCustom?: import("react").ReactText;
    marginTopCustom?: import("react").ReactText;
    marginRightCustom?: import("react").ReactText;
    marginBottomCustom?: import("react").ReactText;
    marginLeftCustom?: import("react").ReactText;
    marginXCustom?: import("react").ReactText;
    marginYCustom?: import("react").ReactText;
    paddingCustom?: import("react").ReactText;
    paddingTopCustom?: import("react").ReactText;
    paddingRightCustom?: import("react").ReactText;
    paddingBottomCustom?: import("react").ReactText;
    paddingLeftCustom?: import("react").ReactText;
    paddingXCustom?: import("react").ReactText;
    paddingYCustom?: import("react").ReactText;
    borderCustom?: import("react").ReactText;
    borderTopCustom?: import("react").ReactText;
    borderRightCustom?: import("react").ReactText;
    borderBottomCustom?: import("react").ReactText;
    borderLeftCusom?: import("react").ReactText;
    borderXCustom?: import("react").ReactText;
    borderYCustom?: import("react").ReactText;
    borderRadiusCustom?: import("react").ReactText;
    outlineOffsetCustom?: import("react").ReactText;
    topCustom?: import("react").ReactText;
    rightCustom?: import("react").ReactText;
    bottomCustom?: import("react").ReactText;
    leftCustom?: import("react").ReactText;
    columnWidthCustom?: import("react").ReactText;
    lineHeightCustom?: import("react").ReactText;
} & {
    margin?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    marginTop?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    marginRight?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    marginBottom?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    marginLeft?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    marginX?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    marginY?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    padding?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    paddingTop?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    paddingRight?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    paddingBottom?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    paddingLeft?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    paddingX?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    paddingY?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    border?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    borderTop?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    borderRight?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    borderBottom?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    borderLeft?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    borderX?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    borderY?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    borderRadius?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    outlineOffset?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    top?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    right?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    bottom?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    left?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    columnWidth?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    lineHeight?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
} & {
    backgrounddCustom?: string;
    borderColorCustom?: string;
    borderTopColorCustom?: string;
    borderRightColorCustom?: string;
    borderBottomColorCUstom?: string;
    borderLeftColorCustom?: string;
    caretColorCustom?: string;
    colorCustom?: string;
    columnRuleColorCustom?: string;
    outlineColorCustom?: string;
    textDecorationColorCustom?: string;
} & {
    background?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    borderColor?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    borderTopColor?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    borderRightColor?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    borderBottomColor?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    borderLeftColor?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    caretColor?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    color?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    columnRuleColor?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    outlineColor?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
    textDecorationColor?: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight";
} & import("../box/getMappedAttributes").MappedAttributes & {
    children?: import("react").ReactNode;
    className?: string;
    class?: string;
    style?: import("react").CSSProperties;
    draggable?: boolean;
    elRef?: (element: HTMLElement) => void;
} & import("react").DOMAttributes<Element> & {
    theme: ITheme;
}) => JSX.Element;
