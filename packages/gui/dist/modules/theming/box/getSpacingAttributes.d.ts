import { AnyProps } from "./_types/anyProps";
import { ITheme } from "../_types/ITheme";
import { IThemeData } from "../themeSettings";
/**
 * All the spacing attributes that accept any spacing,
 * mapped to either true if the css camelcase name is the same,
 * or a string or function if it's different
 */
export declare const spacingAttributesCustom: {
    marginCustom: string;
    marginTopCustom: string;
    marginRightCustom: string;
    marginBottomCustom: string;
    marginLeftCustom: string;
    marginXCustom: (props: AnyProps, value: any) => void;
    marginYCustom: (props: AnyProps, value: any) => void;
    paddingCustom: string;
    paddingTopCustom: string;
    paddingRightCustom: string;
    paddingBottomCustom: string;
    paddingLeftCustom: string;
    paddingXCustom: (props: AnyProps, value: any) => void;
    paddingYCustom: (props: AnyProps, value: any) => void;
    borderCustom: string;
    borderTopCustom: string;
    borderRightCustom: string;
    borderBottomCustom: string;
    borderLeftCusom: string;
    borderXCustom: (props: AnyProps, value: any) => void;
    borderYCustom: (props: AnyProps, value: any) => void;
    borderRadiusCustom: string;
    outlineOffsetCustom: string;
    topCustom: string;
    rightCustom: string;
    bottomCustom: string;
    leftCustom: string;
    columnWidthCustom: string;
    lineHeightCustom: string;
};
/**
 * All the spacing attributes that accept only theme spacing,
 * mapped to either true if the css camelcase name is the same,
 * or a string or function if it's different
 */
export declare const spacingAttributesTheme: {
    margin: boolean;
    marginTop: boolean;
    marginRight: boolean;
    marginBottom: boolean;
    marginLeft: boolean;
    marginX: (props: AnyProps, value: any) => void;
    marginY: (props: AnyProps, value: any) => void;
    padding: boolean;
    paddingTop: boolean;
    paddingRight: boolean;
    paddingBottom: boolean;
    paddingLeft: boolean;
    paddingX: (props: AnyProps, value: any) => void;
    paddingY: (props: AnyProps, value: any) => void;
    border: string;
    borderTop: string;
    borderRight: string;
    borderBottom: string;
    borderLeft: string;
    borderX: (props: AnyProps, value: any) => void;
    borderY: (props: AnyProps, value: any) => void;
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
 * All the spacing attributes,
 * mapped to either true if the css camelcase name is the same,
 * or a string or function if it's different
 */
export declare const spacingAttributes: {
    margin: boolean;
    marginTop: boolean;
    marginRight: boolean;
    marginBottom: boolean;
    marginLeft: boolean;
    marginX: (props: AnyProps, value: any) => void;
    marginY: (props: AnyProps, value: any) => void;
    padding: boolean;
    paddingTop: boolean;
    paddingRight: boolean;
    paddingBottom: boolean;
    paddingLeft: boolean;
    paddingX: (props: AnyProps, value: any) => void;
    paddingY: (props: AnyProps, value: any) => void;
    border: string;
    borderTop: string;
    borderRight: string;
    borderBottom: string;
    borderLeft: string;
    borderX: (props: AnyProps, value: any) => void;
    borderY: (props: AnyProps, value: any) => void;
    borderRadius: boolean;
    outlineOffset: boolean;
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
    columnWidth: boolean;
    lineHeight: boolean;
    marginCustom: string;
    marginTopCustom: string;
    marginRightCustom: string;
    marginBottomCustom: string;
    marginLeftCustom: string;
    marginXCustom: (props: AnyProps, value: any) => void;
    marginYCustom: (props: AnyProps, value: any) => void;
    paddingCustom: string;
    paddingTopCustom: string;
    paddingRightCustom: string;
    paddingBottomCustom: string;
    paddingLeftCustom: string;
    paddingXCustom: (props: AnyProps, value: any) => void;
    paddingYCustom: (props: AnyProps, value: any) => void;
    borderCustom: string;
    borderTopCustom: string;
    borderRightCustom: string;
    borderBottomCustom: string;
    borderLeftCusom: string;
    borderXCustom: (props: AnyProps, value: any) => void;
    borderYCustom: (props: AnyProps, value: any) => void;
    borderRadiusCustom: string;
    outlineOffsetCustom: string;
    topCustom: string;
    rightCustom: string;
    bottomCustom: string;
    leftCustom: string;
    columnWidthCustom: string;
    lineHeightCustom: string;
};
/**
 * The spacing attributes that can be assigned
 */
export declare type SpacingAttributes = {
    [P in keyof typeof spacingAttributesCustom]?: keyof IThemeData["spacing"] | string | number;
} & {
    [P in keyof typeof spacingAttributesTheme]?: keyof IThemeData["spacing"];
};
/**
 * Retrieves all spacing attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the spacing from
 * @param theme The theme to get the spacing values from
 * @returns The css props
 */
export declare function getSpacingAttributes(props: AnyProps, theme: ITheme): AnyProps;
