import {AnyProps} from "./_types/anyProps";
import {getAttribute} from "./getAttributes";
import {ITheme} from "../_types/ITheme";
import {IThemeData} from "../themeSettings";

/**
 * All the color attributes that accept any color,
 * mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
export const colorsAttributesCustom = {
    backgroundCustom: "background",
    borderColorCustom: "borderColor",
    borderTopColorCustom: "borderTopColor",
    borderRightColorCustom: "borderRightColor",
    borderBottomColorCUstom: "borderBottomColor",
    borderLeftColorCustom: "borderLeftColor",
    caretColorCustom: "caretColor",
    colorCustom: "color",
    columnRuleColorCustom: "columnRuleColor",
    outlineColorCustom: "outlineColor",
    textDecorationColorCustom: "textDecorationColor",
};

/**
 * All the color attributes that accept only theme colors,
 * mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
export const colorsAttributesTheme = {
    background: true,
    borderColor: true,
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
    caretColor: true,
    color: true,
    columnRuleColor: true,
    outlineColor: true,
    textDecorationColor: true,
};

/**
 * All the color attributes,
 * mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
export const colorsAttributes = {
    ...colorsAttributesCustom,
    ...colorsAttributesTheme,
};

/**
 * The color attributes that can be assigned
 */
export type ColorAttributes = {
    [P in keyof typeof colorsAttributesCustom]?:
        | keyof IThemeData["palette"]
        | keyof IThemeData["customPalette"]
        | string;
} &
    {
        [P in keyof typeof colorsAttributesTheme]?:
            | keyof IThemeData["palette"]
            | keyof IThemeData["customPalette"];
    };

/**
 * Retrieves all color attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the colors from
 * @param theme The theme to get the colors from
 * @returns The css props
 */
export function getColorAttributes(props: AnyProps, theme: ITheme): AnyProps {
    return getAttribute(
        props,
        colorsAttributes,
        (value: any) => theme.getColor(value) || value
    );
}
