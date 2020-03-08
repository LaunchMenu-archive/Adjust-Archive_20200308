import { AnyProps } from "./_types/anyProps";
import { ITheme } from "../_types/ITheme";
import { IThemeData } from "../themeSettings";
/**
 * All the color attributes that accept any color,
 * mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
export declare const colorsAttributesCustom: {
    backgroundCustom: string;
    borderColorCustom: string;
    borderTopColorCustom: string;
    borderRightColorCustom: string;
    borderBottomColorCUstom: string;
    borderLeftColorCustom: string;
    caretColorCustom: string;
    colorCustom: string;
    columnRuleColorCustom: string;
    outlineColorCustom: string;
    textDecorationColorCustom: string;
};
/**
 * All the color attributes that accept only theme colors,
 * mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
export declare const colorsAttributesTheme: {
    background: boolean;
    borderColor: boolean;
    borderTopColor: boolean;
    borderRightColor: boolean;
    borderBottomColor: boolean;
    borderLeftColor: boolean;
    caretColor: boolean;
    color: boolean;
    columnRuleColor: boolean;
    outlineColor: boolean;
    textDecorationColor: boolean;
};
/**
 * All the color attributes,
 * mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
export declare const colorsAttributes: {
    background: boolean;
    borderColor: boolean;
    borderTopColor: boolean;
    borderRightColor: boolean;
    borderBottomColor: boolean;
    borderLeftColor: boolean;
    caretColor: boolean;
    color: boolean;
    columnRuleColor: boolean;
    outlineColor: boolean;
    textDecorationColor: boolean;
    backgroundCustom: string;
    borderColorCustom: string;
    borderTopColorCustom: string;
    borderRightColorCustom: string;
    borderBottomColorCUstom: string;
    borderLeftColorCustom: string;
    caretColorCustom: string;
    colorCustom: string;
    columnRuleColorCustom: string;
    outlineColorCustom: string;
    textDecorationColorCustom: string;
};
/**
 * The color attributes that can be assigned
 */
export declare type ColorAttributes = {
    [P in keyof typeof colorsAttributesCustom]?: keyof IThemeData["palette"] | keyof IThemeData["customPalette"] | string;
} & {
    [P in keyof typeof colorsAttributesTheme]?: keyof IThemeData["palette"] | keyof IThemeData["customPalette"];
};
/**
 * Retrieves all color attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the colors from
 * @param theme The theme to get the colors from
 * @returns The css props
 */
export declare function getColorAttributes(props: AnyProps, theme: ITheme): AnyProps;
