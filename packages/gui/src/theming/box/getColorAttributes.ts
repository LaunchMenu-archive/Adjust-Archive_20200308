import {Theme} from "../theme";
import {AnyProps} from "./_types/anyProps";
import {getAttribute} from "./getAttributes";
import {ThemeColors} from "../_types/themeData";

/**
 * All the color attributes, mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
export const colorsAttributes = {
    bg: "backgroundColor",
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
 * The color attributes that can be assigned
 */
export type ColorAttributes = {
    [P in keyof typeof colorsAttributes]?: keyof ThemeColors | string
};

/**
 * Retrieves all color attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the colors from
 * @param theme The theme to get the colors from
 * @returns The css props
 */
export function getColorAttributes(props: AnyProps, theme: Theme): AnyProps {
    return getAttribute(props, colorsAttributes, (value: any) => theme.getColor(value));
}
