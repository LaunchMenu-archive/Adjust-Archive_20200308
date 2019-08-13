import { Theme } from "../theme";
import { AnyProps } from "./_types/anyProps";
import { ThemeSpacing } from "../_types/themeData";
/**
 * All the spacing attributes, mapped to either true if the css camelcase name is the same,
 * or a string or function if it's different
 */
export declare const spacingAttributes: {
    m: string;
    mt: string;
    mr: string;
    mb: string;
    ml: string;
    mx: (props: AnyProps, value: any) => void;
    my: (props: AnyProps, value: any) => void;
    p: string;
    pt: string;
    pr: string;
    pb: string;
    pl: string;
    px: (props: AnyProps, value: any) => void;
    py: (props: AnyProps, value: any) => void;
    border: string;
    borderTop: string;
    borderRight: string;
    borderBottom: string;
    borderLeft: string;
    borderx: (props: AnyProps, value: any) => void;
    bordery: (props: AnyProps, value: any) => void;
    borderRadius: boolean;
    outlineOffset: boolean;
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
    columnWidth: boolean;
    lineHeight: boolean;
};
/**
 * The spacing attributes that can be assigned
 */
export declare type SpacingAttributes = {
    [P in keyof typeof spacingAttributes]?: keyof ThemeSpacing | string | number;
};
/**
 * Retrieves all spacing attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the spacing from
 * @param theme The theme to get the spacing values from
 * @returns The css props
 */
export declare function getSpacingAttributes(props: AnyProps, theme: Theme): AnyProps;
