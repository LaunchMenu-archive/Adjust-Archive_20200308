import { Theme } from "../theme";
import { AnyProps } from "./_types/anyProps";
import { ThemeColors } from "../_types/themeData";
/**
 * All the color attributes, mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
export declare const colorsAttributes: {
    bg: string;
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
 * The color attributes that can be assigned
 */
export declare type ColorAttributes = {
    [P in keyof typeof colorsAttributes]?: keyof ThemeColors | string;
};
/**
 * Retrieves all color attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the colors from
 * @param theme The theme to get the colors from
 * @returns The css props
 */
export declare function getColorAttributes(props: AnyProps, theme: Theme): AnyProps;
